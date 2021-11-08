module.exports = (client, io) => ({ message, room }) => {
    io.to(room).emit('message', message);
};
