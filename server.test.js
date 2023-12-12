const request = require('supertest');
const { app, server } = require('./server');

const agent = request.agent(app);

describe('User API Endpoints', () => {
    it('should get all users', async () => {
      const res = await request(app).get('/api/user/allUsers');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('length');
    });
  
    it('should get user by name', async () => {
      const res = await request(app)
        .post('/api/user/byName')
        .send({ name: 'TestUser' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('Name', 'TestUser');
    });
  
    it('should add a new user', async () => {
      const res = await request(app)
        .post('/api/user/add')
        .send({ Name: 'NewUser', Address: 'NewAddress', Mail: 'newuser@example.com', Password: 'NewPassword' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('Name', 'NewUser');
    });
  
    it('should get user by email', async () => {
      const res = await request(app)
        .post('/api/user/getUser')
        .send({ Mail: 'newuser@example.com' });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('Name', 'NewUser');
    });
  });
  
  describe('Category API Endpoints', () => {
    it('should get all categories', async () => {
      const res = await request(app).get('/api/category/allCategory');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('length');
    });
  
    it('should get a category by code', async () => {
      const res = await request(app)
        .post('/api/category/categoryByCode')
        .send({ Code: 101 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('Code', 101);
    });
  });
  
  describe('Recipe API Endpoints', () => {
    it('should get all recipes', async () => {
      const res = await request(app).get('/api/recipes/allRecipes');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('length');
    });
  
    it('should get all images', async () => {
      const res = await request(app).get('/api/recipes/images');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('length');
    });
  
    it('should add a new recipe', async () => {
      const res = await request(app)
        .post('/api/recipes/add')
        .send({
          Code: 101,
          Name: 'NewRecipe',
          CategoryCode: 1,
          PreparationTime: 30,
          DifficultyLevel: 2,
          DateAdded: new Date(),
          ComponentsList: 'Ingredient 1, Ingredient 2',
          PreparationMethod: 'Mix and cook',
          OwnerCode: 1,
          ImgSrc: 'newrecipe.jpg',
          IsSeen: false,
          Description: 'Test description',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('Name', 'NewRecipe');
    });
  
    it('should change an existing recipe', async () => {
      const res = await request(app)
        .post('/api/recipes/change')
        .send({
          Code: 101,
          Name: 'UpdatedRecipe',
          CategoryCode: 2,
          PreparationTime: 45,
          DifficultyLevel: 3,
          ComponentsList: 'Updated Ingredient 1, Updated Ingredient 2',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('Name', 'UpdatedRecipe');
      expect(res.body).toHaveProperty('CategoryCode', 2);
      expect(res.body).toHaveProperty('PreparationTime', 45);
      expect(res.body).toHaveProperty('DifficultyLevel', 3);
      expect(res.body).toHaveProperty('ComponentsList', 'Updated Ingredient 1, Updated Ingredient 2');
    });
  });

afterAll((done) => {
    server.close((err) => {
      if (err) {
        console.error('Error closing server:', err);
      } else {
        console.log('Server closed');
      }
      done();
    });
  });
  