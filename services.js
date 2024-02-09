import prisma from "./lib/prisma.mjs"

export const getMakes = async () => {
  const makes = await prisma.make.findMany()
  return makes
}


export const getVehicle = async (id) => {
  const vehicle = await prisma.vehicle.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      WindowSize: true,
    },
  })
  return vehicle
}

export const getVehicles = async (id, year) => {
  console.log(id, year)
 const vehicles = await prisma.vehicle.findMany({
    where: {
      makeId: Number(id),
      year: Number(year),
    },
    include: {
      Model: true,
    },
  })
  return vehicles
}