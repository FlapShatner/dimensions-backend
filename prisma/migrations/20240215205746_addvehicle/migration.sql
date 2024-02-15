-- CreateTable
CREATE TABLE "AddVehicle" (
    "id" SERIAL NOT NULL,
    "makeId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "doors" INTEGER NOT NULL,
    "addWindowSizeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "AddVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddWindowSize" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "a" INTEGER NOT NULL,
    "b" INTEGER NOT NULL,
    "c" INTEGER NOT NULL,

    CONSTRAINT "AddWindowSize_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddVehicle" ADD CONSTRAINT "AddVehicle_addWindowSizeId_fkey" FOREIGN KEY ("addWindowSizeId") REFERENCES "AddWindowSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
