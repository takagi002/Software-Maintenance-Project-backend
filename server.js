const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Connect to MongoDB (replace 'your-database' and 'your-password' with your MongoDB URL)
mongoose.connect('mongodb+srv://RecipeBack:RecBackPass@cluster0.nvilido.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: 'RecipeBack',
  pass: 'RecBackPass'
});

// Define mongoose models for User, Category, and Recipe
const User = mongoose.model('User', { 
  Name: String, 
  Address: String, 
  Mail: String, 
  Password: String 
});
const Category = mongoose.model('Category', { 
  Code: Number, 
  Name: String, 
  IconNavigation: String 
});
const Recipe = mongoose.model('Recipe', { 
  Code: Number, 
  Name: String, 
  CategoryCode: Number, 
  PreparationTime: Number, 
  DifficultyLevel: Number, 
  DateAdded: Date, 
  ComponentsList: String, 
  PreparationMethod: String, 
  OwnerCode: Number, 
  ImgSrc: String, 
  IsSeen: Boolean, 
  Description: String 
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes for User Service
app.get('/api/user/allUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/user/login', async (req, res) => {
  try {
    const loginUser = new User(req.body);
    const user = await User.findOne({ Name: loginUser.Name, Password: loginUser.Password });

    if (user) {
      res.json({ success: 1 });
    } else {
      res.json({ success: 0 });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/user/add', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/user/getUser', async (req, res) => {
  try {
    const { Mail } = req.body;
    const user = await User.findOne({ Mail });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Routes for Category Service
app.get('/api/category/allCategory', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/category/categoryByCode', async (req, res) => {
  try {
    const { code } = req.body;
    const category = await Category.findOne({ Code: code });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Routes for Recipe Service
app.get('/api/recipes/allRecipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/recipes/images', async (req, res) => {
  try {
    const imgSrcList = await Recipe.find().distinct('ImgSrc');
    res.json(imgSrcList);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/recipes/add', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/recipes/change', async (req, res) => {
  try {
    const { Code } = req.body;
    const updatedRecipe = await Recipe.findOneAndUpdate({ Code }, req.body, { new: true });
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

