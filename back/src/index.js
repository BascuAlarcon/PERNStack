const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const taskRoutes = require('./routes/tasks.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(taskRoutes);

// handle error middleware
app.use((err, req, res, next) => {
    // ToDo: Add a conditional, if the environment is dev, will send a console log
    // ToDo: Add a conditional to use different http status depending of error
    return res.status(400).json({
        msg: err.message
    })
});

app.listen(4000); 
console.log('Server on port 4000');