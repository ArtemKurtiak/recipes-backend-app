module.exports = (client, io) => (room) => {
    client.join(room);
};
