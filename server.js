///////////////////////////////
// Dependencies
////////////////////////////////
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const Post = require('./models/post');
const repliesRouter = require('./controllers/replies');
const usersRouter = require('./controllers/users');
const postsRouter = require('./controllers/posts');
const Board = require('./models/board');
const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');

/*  Initalalize Express */
const app = express();

/* dotenv Config */
require('dotenv').config();
const { PORT = 4000, DATABASE_URL, PRIVATE_KEY_ID, PRIVATE_KEY } = process.env;

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'redundant-447d0',
    private_key_id: PRIVATE_KEY_ID,
    private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email:
      'firebase-adminsdk-nv0xs@redundant-447d0.iam.gserviceaccount.com',
    client_id: '111709835900757846298',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nv0xs%40redundant-447d0.iam.gserviceaccount.com',
  }),
});

///////////////////////////////
/* MongoDB Connection */
////////////////////////////////
mongoose.connect(DATABASE_URL);

mongoose.connection
  .on('connected', () => console.log('Connected to MongoDB'))
  .on('disconnected', () => console.log('Disonnected to MongoDB'))
  .on('error', () => console.log('Problem with MongoDB:' + error.message));

///////////////////////////////
// Mount Middleware
////////////////////////////////
app.use(express.json());
app.use(cors());
app.use(postsRouter);
app.use(usersRouter);
app.use(repliesRouter);

// Custom Authorization Middleware
app.use(async function (req, res, next) {
  // Capture token from request
  const token = req.get('Authorization');
  // Token exists?
  // validate it using google firebase
  try {
    if (token) {
      const user = await getAuth().verifyIdToken(token.replace('Bearer ', ''));
      req.user = user;
    } else {
      req.user = null;
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'bad request' });
  }
  next();
});

///////////////////////////////
// ROUTES
////////////////////////////////
app.get('/', (req, res) => {
  res.send('Welcome');
});

///////////////////////////////
// Index
////////////////////////////////
// Index User
app.get('/api/user', async (req, res) => {
  try {
    res.status(200).json(await User.find({}));
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'bad request',
    });
  }
});

// Index Post
app.get('/api/post', async (req, res) => {
  try {
    res.status(200).json(await Post.find({}));
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'bad request',
    });
  }
});

///////////////////////////////
// Create
////////////////////////////////
// User API
app.post('/api/user', async (req, res) => {
  try {
    res.status(201).json(await User.create(req.body));
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'bad request' });
  }
});

// Post API
app.post('/api/post', async (req, res) => {
  try {
    res.status(201).json(await Post.create(req.body));
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'bad request' });
  }
});

///////////////////////////////
// Update
////////////////////////////////
// User
app.put('/api/post/:id', async (req, res) => {
  try {
    res.status(200).json(
      await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'bad request',
    });
  }
});

app.put('/api/post/:id/comment', async (req, res) => {
  try {
    res.status(200).json(
      await Post.findByIdAndUpdate(
        req.params.id,
        { $push: { replies: req.body } },
        {
          new: true,
        }
      )
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 'bad request',
    });
  }
});

///////////////////////////////
// Delete
////////////////////////////////
// Post
app.delete('/api/post/delete/:id', async (req, res) => {
  try {
    res.status(200).json(await Post.findByIdAndDelete(req.params.id));
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'bad request' });
  }
});

/* Listner */
app.listen(PORT, () => {
  console.log('Express is running on Port:' + PORT);
});
