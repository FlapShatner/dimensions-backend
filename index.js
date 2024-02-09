import express from 'express'
import prisma from './lib/prisma.mjs'
import { getMakes, getVehicle, getVehicles } from './services.js'
import { addVehicleWithWindowSize } from './utils.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
 res.send('Hello from dimensions-app backend!')
})

app.get('/makes', async (req, res) => {
  try {
    const makes = await getMakes()
    res.json(makes)
  } catch (error) {
    console.log(error)
  }
})

app.get('/vehicle/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const vehicle = await getVehicle(id);
    res.json(vehicle);
  } catch (error) {
    console.log(error);
  }
})



app.post('/vehicles', async (req, res) => {
  const {id, year} = req.body;
  console.log(req.body)
  if (!id || !year) {
    return
  }
  try {
    const vehicles =await getVehicles(id, year);
    res.json(vehicles);
  } catch (error) {
    console.log(error);
  }
})



app.post('/makes', async (req, res) => {
  console.log(req.body)
  try {
    const make = await prisma.make.create({
      data: {
        make: req.body.label,
      },
    })
    res.json(make)
  } catch (error) {
    res.json({ error: 'Server Error' })
  }
})

app.post('/save', async (req, res) => {
 const data = req.body
 const vehicleData = {
  year: data.year,
  make: data.make,
  model: data.model,
  doors: data.doors,
  class: data.class,
 }
 const windowData = {
  a: data.a,
  b: data.b,
  c: data.c,
 }
 //  console.log(data)
 try {
  const response = await addVehicleWithWindowSize(vehicleData, windowData)
  res.json(response)
 } catch (error) {
  console.log(error)
 }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`)
})
