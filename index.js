const db = require('./db');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

const { authenticate, passport } = require('./auth');

app.use(passport.initialize());


// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request to ${req.originalUrl}`);
    next();
});


// WELCOME MESSAGE
app.get('/',authenticate,(req,res)=>
{
    res.send(`Welcome ${req.user.username} to Task Manager`);
})


app.use('/api/tasks',authenticate,taskRoutes);
app.use('/api/users',userRoutes);

app.listen(7000,()=>{console.log('Server running on port 7000')});