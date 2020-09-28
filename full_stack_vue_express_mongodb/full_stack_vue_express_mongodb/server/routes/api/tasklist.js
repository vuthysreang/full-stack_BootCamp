const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Get Task
router.get('/', async (req, res) => {
    const posts = await loadTasksCollection();
    res.send(await posts.find({}).toArray());
  });

// Add Task
router.post('/', async (req, res) => {
    const posts = await loadTasksCollection();
    await posts.insertOne({
      task: req.body.task,
      dateCreated: new Date()
    });
    res.status(201).send();
  });

// Delete Task
router.delete('/:id', async (req, res) => {
    const posts = await loadTasksCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send({});
  });
  

async function loadTasksCollection() {
    const client = await mongodb.MongoClient.connect(
      'mongodb+srv://Vuthy_Sreang:1234@vuthyclouddb-cluster.uee7r.mongodb.net/my_tasklist>?retryWrites=true&w=majority',
      {
        useNewUrlParser: true
      }
    );
  
    return client.db('my_tasklist').collection('mytasks');
  }

module.exports = router;