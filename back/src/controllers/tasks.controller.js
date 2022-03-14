const pool = require('../db');
 
const getTasks = async(req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM task');
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}

const getTasksById = async(req, res, next) => {
    const {id} = req.params;
    try {
        const result = await pool.query('SELECT * FROM task WHERE id = $1', [id]);
        if(result.rows.lenght === 0){
            return res.status(404).json({msg: 'Task not found'});
        }
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const postTasks = async(req, res, next) => {
    const {title, description} = req.body;

    try {
        // save on pg
        const result = await pool.query('INSERT INTO task (title, description) VALUES($1, $2) RETURNING *', [title, description]);
    
        if(result){
            res.status(200).json({msg: result.rows[0]}); 
        }
    } catch (error) {
        next(error);
    }

}

const updateTasks = async(req, res, next) => {
    const {id} = req.params;
    const {title, description} = req.body;
    try {
        const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id]);
        if(result.rowCount === 0){
            return res.status(404).json({msg: 'Task not found'});
        }
        return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}

const deleteTasks = async(req, res, next) => {
    const {id} = req.params;
    try {
        const result = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [id]);
        if(result.rowCount === 0){
            return res.status(404).json({msg: 'Task not found'});
        }
        return res.json({msg: 'Task was deleted'});
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTasks,
    getTasksById,
    postTasks,
    updateTasks,
    deleteTasks
}