import express from 'express';
import prisma from './lib/prisma.mjs';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from dimensions-app backend!');
});

app.get('/users', async (req, res) => {
  try{
  const users = await prisma.user.findMany();
  res.json(users);
  } catch (error) {
    console.log(error);
  }
});


app.post('/save', async (req, res) => {
  try{
    const {year, make, model, doors, class:truckClass , a, b, c } = req.body;
   
    console.log(req.body);
    const newVehicle = await prisma.vehicle.create({
      data: {
        year: year,
        make: make,
        model: model,
        doors: doors,
        class: truckClass,
        window: {
          create: {
            a: a,
            b: b,
            c: c,
          }
        }
      },
      include: {
        window: true
      }
    });
    res.json(newVehicle);

  } catch (error) {
    console.log(error);
  }
})

app.post('/user', async (req, res) => {
    const { name, email } = req.body;
    try{
    const newUser = await prisma.user.create({
        data: {
        email: email,
        name: name,
    }});
    
    res.json(newUser);
    } catch (error) {
        res.json({error: error})               
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
