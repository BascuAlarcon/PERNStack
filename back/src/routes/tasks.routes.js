const {Router} = require('express');

const { getTasks, getTasksById, postTasks, updateTasks, deleteTasks } = require('../controllers/tasks.controller');
 
const router = Router();

router.get('/tasks', getTasks);

router.get('/tasks/:id', getTasksById);

router.post('/tasks', postTasks);

router.put('/tasks/:id', updateTasks);

router.delete('/tasks/:id', deleteTasks);

module.exports = router;