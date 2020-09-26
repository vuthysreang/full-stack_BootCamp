const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Tasklist
router.get('/', async (req, res) => {
  const mytasks = await loadTasksCollection();
  return res.send(await mytasks.find({}).toArray());
});

// Add Tasklist
router.post('/', async (req, res) => {
  const mytasks = await loadTasksCollection();
  await mytasks.insertOne({
    task: req.body.task,
    dateCreated: new Date()
  });
  res.status(201).send();
});

// Delete Tasklist
router.delete('/:id', async (req, res) => {
  const mytasks = await loadTasksCollection();
  await mytasks.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
  res.status(200).send();
});


// loadTasksCollection
async function loadTasksCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://Vuthy_Sreang:1234@vuthyclouddb-cluster.uee7r.mongodb.net/my_tasklist>?retryWrites=true&w=majority',
    {useNewUrlParser: true},
  );
  return client.db('my_tasklist').collection('mytasks');
}


module.exports = router;