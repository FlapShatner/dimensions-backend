/*
  Warnings:

  - You are about to drop the column `makeId` on the `AddVehicle` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `AddVehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AddVehicle" DROP COLUMN "makeId",
DROP COLUMN "modelId";
