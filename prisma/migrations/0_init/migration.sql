-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "makeId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "doors" INTEGER NOT NULL,
    "windowSizeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WindowSize" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "a" INTEGER NOT NULL,
    "b" INTEGER NOT NULL,
    "c" INTEGER NOT NULL,

    CONSTRAINT "WindowSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Make" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Make_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "makeId" INTEGER NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_windowSizeId_fkey" FOREIGN KEY ("windowSizeId") REFERENCES "WindowSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

