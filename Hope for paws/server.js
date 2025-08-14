const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://hemacreation9:hemalatha@cluster0.z3hq9fj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const PetSchema = new mongoose.Schema({
  name: String,
  age: Number,
  description: String,
});

const Pet = mongoose.model('Pet', PetSchema);

// API endpoint to receive data
app.post('/api/pets', async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).send({ message: 'Pet added successfully!' });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
