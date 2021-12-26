const http = require('http');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const fileUpload = require('express-fileupload');

require('dotenv').config();

const {
    authRouter,
    recipesRouter,
    recipesCommentsRouter,
    recipeRatingRouter,
    cartRouter,
    userRouter,
    subscriptionRouter,
    notificationRouter
} = require('./routers');
const cronJobRun = require('./cron-jobs');
const { joinSocketHandler, messageSocketHandler } = require('./sockets');
const { PORT, socketEventsEnum, MONGODB_URI } = require('./constants');

const app = express();

app.use(cors({ origin: '*' }));

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/ping', (req, res) => {
    res.send('Pong!');
});

app.use(fileUpload());

app.use('/api/auth', authRouter);

app.use('/api/recipes', recipesRouter);

app.use('/api/recipes_comments', recipesCommentsRouter);

app.use('/api/recipe/rate', recipeRatingRouter);

app.use('/api/cart', cartRouter);

app.use('/api/user', userRouter);

app.use('/api/subscribe', subscriptionRouter);

app.use('/api/notifications', notificationRouter);

app.use(errorHandler);

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, _) {
    const { message = 'Something wrong.', status = 500 } = error;

    res
        .status(status)
        .json({ message });
}

const server = http.createServer(app).listen(PORT, () => {
    cronJobRun();
    console.log(`Server started on port ${PORT}`);
});

const io = socketIo(server);

io.on(socketEventsEnum.CONNECTION, connectionHandler);

function connectionHandler(client) {
    client.on(socketEventsEnum.JOIN, joinSocketHandler(client, io));
    client.on(socketEventsEnum.MESSAGE, messageSocketHandler(client, io));
}
