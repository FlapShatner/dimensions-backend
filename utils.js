import prisma from './lib/prisma.mjs'

export async function addVehicleWithWindowSize(vehicleData, windowData) {
 const { year, make, model, doors, class: vehicleClass } = vehicleData
 //  console.log(vehicleData, windowData)
 let response = {
  vehicleAdded: false,
  windowSizeAdded: false,
  message: '',
 }

 let vehicle = await prisma.vehicle.findFirst({
  where: { year, make, model, doors, class: vehicleClass },
 })

 if (!vehicle) {
  vehicle = await prisma.vehicle.create({ data: vehicleData })
  response.vehicleAdded = true
  response.message += 'New vehicle added. '
 }

 const existingWindowSize = await prisma.windowSize.findFirst({
  where: {
   a: windowData.a,
   b: windowData.b,
   c: windowData.c,
   vehicle: { some: { id: vehicle.id } },
  },
 })

 if (!existingWindowSize) {
  await prisma.windowSize.create({
   data: {
    ...windowData,
    vehicle: { connect: { id: vehicle.id } },
   },
  })
  response.windowSizeAdded = true
  response.message += 'New window size added.'
 }

 if (!response.vehicleAdded && !response.windowSizeAdded) {
  response.message = 'No new data added. Vehicle and window size already exist.'
 }

 return response
}

// Example usage
// const vehicleData = { year: 2020, make: 'Toyota', model: 'Camry', doors: '4', class: 'MIDSIZE' };
// const windowData = { a: '100cm', b: '50cm', c: '30cm' };

// addVehicleWithWindowSize(vehicleData, windowData)
//   .then(response => console.log(response.message))
//   .catch(error => console.error(error))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
