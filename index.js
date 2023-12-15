import express from 'express';
import prisma from './lib/prisma.mjs';
import { addVehicleWithWindowSize } from './utils.js';

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
  const data = req.body;
  try{
  const response = await addVehicleWithWindowSize(data.vehicle, data.window);
  res.json(response);

  }
  catch (error) {
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
