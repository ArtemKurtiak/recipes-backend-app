const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT } = require('./constants');
const { authRouter } = require('./routers');
const { MONGODB_URI } = require('./constants');

mongoose.connect(MONGODB_URI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);

app.use(errorHandler);

function errorHandler(error, req, res, _) {
    const { message = 'Something wrong.', status = 500 } = error;

    res
        .status(status)
        .json({ message });
}

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
