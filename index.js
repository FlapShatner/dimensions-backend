import express from 'express'
import prisma from './lib/prisma.mjs'
import { addVehicleWithWindowSize } from './utils.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
 res.send('Hello from dimensions-app backend!')
})

app.get('/users', async (req, res) => {
 try {
  const users = await prisma.user.findMany()
  res.json(users)
 } catch (error) {
  console.log(error)
 }
})

app.get('/makes', async (req, res) => {
  try {
    const makes = await prisma.make.findMany()
    res.json(makes)
  } catch (error) {
    console.log(error)
  }
})

app.post('/vehicles', async (req, res) => {
  // console.log(req.body);
  const data = req.body;

  const whereClause = {};
  if (data.make) whereClause.make = data.make;
  if (data.model) whereClause.model = data.model;
  if (data.year) whereClause.year = Number(data.year);
  // if (data.class) whereClause.class = data.class;
  if (data.doors) whereClause.doors = data.doors;

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: whereClause,
      include: {
        window: true,
      },
    });
    res.json(vehicles);
  } catch (error) {
    console.log(error);
  }
});


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

app.post('/user', async (req, res) => {
 const { name, email } = req.body
 try {
  const newUser = await prisma.user.create({
   data: {
    email: email,
    name: name,
   },
  })

  res.json(newUser)
 } catch (error) {
  res.json({ error: error })
 }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`)
})
