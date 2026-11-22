import { Suspense } from "react";
import ResutUpload from "@/components/resut-upload";
import prisma from "@/lib/db";

async function PollData() {
  const [states, lgas, wards, pollingUnits] = await Promise.all([
    prisma.state.findMany(),
    prisma.lGA.findMany(),
    prisma.ward.findMany(),
    prisma.pollingUnit.findMany(),
  ]);

  return (
    <ResutUpload
      locations={{
        states,
        lgas,
        wards,
        pollingUnits,
      }}
    />
  );
}

export default function Page() {
  return (
    <div className="w-full min-h-svh">
      <Suspense fallback={<UploadSkeleton />}>
        <PollData />
      </Suspense>
    </div>
  );
}

function UploadSkeleton() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse space-y-5 p-6">
      <div className="h-7 w-48 rounded bg-muted" />
      <div className="h-4 w-64 rounded bg-muted" />

      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="h-11 rounded-md bg-muted" />
      ))}

      <div className="h-11 rounded-md bg-muted" />
    </div>
  );
}
