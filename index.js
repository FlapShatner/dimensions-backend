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
