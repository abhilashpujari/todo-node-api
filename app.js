const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiConfig = require('./config/api');
const app = express();

// Database
const models = require('./models');

// App Port
const PORT = process.env.PORT || 3000;

// Routes
const taskRouter = require('./routes/todo');
const userRouter = require('./routes/user');
const auth = require("./middlewares/passport")();

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(auth.initialize());
app.use(auth.session());

app.use(apiConfig.apiPrefix + '/todo', taskRouter);
app.use(apiConfig.apiPrefix, userRouter);

// Creates the tables if not exist 
models.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Connected to port ${PORT}`));
    }).catch(err => console.log(err));