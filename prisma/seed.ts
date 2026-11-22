 import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "csv-parse/sync";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const DATA_DIR = join(__dirname, "data");
const BATCH_SIZE = 2000;

// -----------------------------------------
// TYPES
// -----------------------------------------

interface StateData {
  portal_id: string;
  code: string;
  name: string;
  raw: string;
}

interface LGAData {
  portal_id: string;
  code: string;
  name: string;
  raw: string;
  state_portal_id: string;
  state_code: string;
  state_name: string;
}

interface WardData {
  portal_id: string;
  code: string;
  name: string;
  raw: string;
  lga_portal_id: string;
  lga_code: string;
  lga_name: string;
  state_portal_id: string;
  state_code: string;
  state_name: string;
}

interface PollingUnitData {
  state_code: string;
  state_name: string;
  lga_code: string;
  lga_name: string;
  ward_code: string;
  ward_name: string;
  pu_code: string;
  pu_name: string;
  pu_location: string;
  full_code: string;
  portal_id: string;
}

// -----------------------------------------
// HELPERS
// -----------------------------------------

function readJson<T>(filename: string): T {
  const filePath = join(DATA_DIR, filename);

  return JSON.parse(readFileSync(filePath, "utf-8")) as T;
}

function readCsv<T>(filename: string): T[] {
  const filePath = join(DATA_DIR, filename);

  const content = readFileSync(filePath, "utf-8");

  return parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  }) as T[];
}

function chunks<T>(items: T[], size = BATCH_SIZE): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }

  return result;
}

async function insertInBatches<T>(
  items: T[],
  insert: (batch: T[]) => Promise<unknown>,
  label: string,
) {
  const batches = chunks(items);

  for (let i = 0; i < batches.length; i++) {
    await insert(batches[i]);

    console.log(`${label}: batch ${i + 1}/${batches.length} completed`);
  }

  console.log(`${label}: ${items.length} records processed`);
}

// -----------------------------------------
// 1. SEED STATES
// -----------------------------------------

async function seedStates() {
  console.log("\nSeeding states...");

  const states = readJson<StateData[]>("states.json");

  const data = states.map((state) => ({
    sourcePortalId: state.portal_id,
    code: state.code,
    name: state.name,
    raw: state.raw,
  }));

  await insertInBatches(
    data,
    (batch) =>
      prisma.state.createMany({
        data: batch,
        skipDuplicates: true,
      }),
    "States",
  );

  console.log("States seeded successfully.");
}

// -----------------------------------------
// 2. SEED LGAS
// -----------------------------------------

async function seedLGAs() {
  console.log("\nSeeding LGAs...");

  const lgas = readJson<LGAData[]>("lgas.json");

  const states = await prisma.state.findMany({
    select: {
      id: true,
      code: true,
      sourcePortalId: true,
    },
  });

  const stateByPortalId = new Map(
    states.map((state) => [state.sourcePortalId, state]),
  );

  const data = lgas.map((lga) => {
    const state = stateByPortalId.get(lga.state_portal_id);

    if (!state || state.code !== lga.state_code) {
      throw new Error(`Invalid state reference for LGA: ${lga.name}`);
    }

    return {
      sourcePortalId: lga.portal_id,
      code: lga.code,
      name: lga.name,
      raw: lga.raw,
      stateId: state.id,
    };
  });

  await insertInBatches(
    data,
    (batch) =>
      prisma.lGA.createMany({
        data: batch,
        skipDuplicates: true,
      }),
    "LGAs",
  );

  console.log("LGAs seeded successfully.");
}

// -----------------------------------------
// 3. SEED WARDS
// -----------------------------------------

async function seedWards() {
  console.log("\nSeeding wards...");

  const wards = readJson<WardData[]>("wards.json");

  const lgas = await prisma.lGA.findMany({
    select: {
      id: true,
      sourcePortalId: true,
      code: true,
      stateId: true,
    },
  });

  const lgaByPortalId = new Map(lgas.map((lga) => [lga.sourcePortalId, lga]));

  const states = await prisma.state.findMany({
    select: {
      id: true,
      sourcePortalId: true,
      code: true,
    },
  });

  const stateByPortalId = new Map(
    states.map((state) => [state.sourcePortalId, state]),
  );

  const data = wards.map((ward) => {
    const lga = lgaByPortalId.get(ward.lga_portal_id);

    const state = stateByPortalId.get(ward.state_portal_id);

    if (
      !lga ||
      !state ||
      lga.stateId !== state.id ||
      lga.code !== ward.lga_code ||
      state.code !== ward.state_code
    ) {
      throw new Error(`Invalid hierarchy for ward: ${ward.name}`);
    }

    return {
      sourcePortalId: ward.portal_id,
      code: ward.code,
      name: ward.name,
      raw: ward.raw,
      lgaId: lga.id,
    };
  });

  await insertInBatches(
    data,
    (batch) =>
      prisma.ward.createMany({
        data: batch,
        skipDuplicates: true,
      }),
    "Wards",
  );

  console.log("Wards seeded successfully.");
}

// -----------------------------------------
// 4. SEED POLLING UNITS
// -----------------------------------------

async function seedPollingUnits() {
  console.log("\nSeeding polling units...");

  const pollingUnits = readCsv<PollingUnitData>("polling-units.csv");

  const states = await prisma.state.findMany({
    select: {
      id: true,
      code: true,
    },
  });

  const stateByCode = new Map(states.map((state) => [state.code, state]));

  const lgas = await prisma.lGA.findMany({
    select: {
      id: true,
      code: true,
      stateId: true,
      name: true,
    },
  });

  const lgaByKey = new Map(
    lgas.map((lga) => [`${lga.stateId}:${lga.code}`, lga]),
  );

  const wards = await prisma.ward.findMany({
    select: {
      id: true,
      code: true,
      lgaId: true,
      name: true,
    },
  });

  const wardByKey = new Map(
    wards.map((ward) => [`${ward.lgaId}:${ward.code}`, ward]),
  );

  const data = pollingUnits.map((unit) => {
    const state = stateByCode.get(unit.state_code);

    if (!state || state.code !== unit.state_code) {
      throw new Error(`State not found: ${unit.state_name}`);
    }

    const lga = lgaByKey.get(`${state.id}:${unit.lga_code}`);

    if (!lga || lga.name !== unit.lga_name) {
      throw new Error(`LGA not found: ${unit.lga_name} (${unit.full_code})`);
    }

    const ward = wardByKey.get(`${lga.id}:${unit.ward_code}`);

    if (!ward || ward.name !== unit.ward_name) {
      throw new Error(`Ward not found: ${unit.ward_name} (${unit.full_code})`);
    }

    return {
      sourcePortalId: unit.portal_id,
      code: unit.pu_code,
      name: unit.pu_name,
      location: unit.pu_location || null,
      fullCode: unit.full_code,
      wardId: ward.id,
    };
  });

  await insertInBatches(
    data,
    (batch) =>
      prisma.pollingUnit.createMany({
        data: batch,
        skipDuplicates: true,
      }),
    "Polling units",
  );

  console.log("Polling units seeded successfully.");
}

// -----------------------------------------
// MAIN SEED FUNCTION
// -----------------------------------------

async function main() {
  console.log("Starting Voltslot geographical seed...");

  await seedStates();
  await seedLGAs();
  await seedWards();
  await seedPollingUnits();

  console.log("\nAll geographical data seeded successfully.");

  // Verify record counts
  const [states, lgas, wards, pollingUnits] = await Promise.all([
    prisma.state.count(),
    prisma.lGA.count(),
    prisma.ward.count(),
    prisma.pollingUnit.count(),
  ]);

  console.log("\nDATABASE SUMMARY");
  console.table({
    states,
    lgas,
    wards,
    pollingUnits,
  });
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
