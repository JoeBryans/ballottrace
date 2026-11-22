-- CreateTable
CREATE TABLE "states" (
    "id" TEXT NOT NULL,
    "sourcePortalId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "raw" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lgas" (
    "id" TEXT NOT NULL,
    "sourcePortalId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "raw" TEXT,
    "stateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lgas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wards" (
    "id" TEXT NOT NULL,
    "sourcePortalId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "raw" TEXT,
    "lgaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "polling_units" (
    "id" TEXT NOT NULL,
    "sourcePortalId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "fullCode" TEXT NOT NULL,
    "wardId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "polling_units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "states_sourcePortalId_key" ON "states"("sourcePortalId");

-- CreateIndex
CREATE UNIQUE INDEX "states_code_key" ON "states"("code");

-- CreateIndex
CREATE UNIQUE INDEX "lgas_sourcePortalId_key" ON "lgas"("sourcePortalId");

-- CreateIndex
CREATE INDEX "lgas_stateId_idx" ON "lgas"("stateId");

-- CreateIndex
CREATE UNIQUE INDEX "lgas_stateId_code_key" ON "lgas"("stateId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "wards_sourcePortalId_key" ON "wards"("sourcePortalId");

-- CreateIndex
CREATE INDEX "wards_lgaId_idx" ON "wards"("lgaId");

-- CreateIndex
CREATE UNIQUE INDEX "wards_lgaId_code_key" ON "wards"("lgaId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "polling_units_sourcePortalId_key" ON "polling_units"("sourcePortalId");

-- CreateIndex
CREATE UNIQUE INDEX "polling_units_fullCode_key" ON "polling_units"("fullCode");

-- CreateIndex
CREATE INDEX "polling_units_wardId_idx" ON "polling_units"("wardId");

-- AddForeignKey
ALTER TABLE "lgas" ADD CONSTRAINT "lgas_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wards" ADD CONSTRAINT "wards_lgaId_fkey" FOREIGN KEY ("lgaId") REFERENCES "lgas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "polling_units" ADD CONSTRAINT "polling_units_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "wards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
