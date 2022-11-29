import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const tasks = [];

const PORT = 3010;

const tasksRouter = express.Router();

const app = express();

app.use(express.json());

app.use('/static', express.static('public'))

app.get('/tasks', (req, res, next) => {
  res.send({
    count: tasks.length,
    tasks: tasks
  })
})

app.post('/tasks', (req, res) => {
  
  if (req.body.title && tasks.findIndex(task => task.title === req.body.title) === -1) {
    res.status(200).send("Status Working");
    tasks.push({
      title: req.body.title,
      date: new Date(),
      id: uuidv4(),
      isDone: false
    })
  } else {
    res.status(422).send("Bad request");
  }
})

app.delete('/tasks/:id', (req, res) => {
  if (tasks.findIndex(task => task.id === req.params.id) !== -1) {
    tasks[tasks.findIndex(task => task.id === req.params.id)] = 'deleted';
    res.status(200).send('Success!')
  } else {
    res.status(404).send("Task not found");
  }
})

app.use('/tasks', tasksRouter);
app.listen(PORT, () => console.log(`Its started ${new Date()}`))