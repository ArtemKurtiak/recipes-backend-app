module.exports = {
    normalizeDocument: (document) => {
        document = document.toJSON();

        const fieldsToRemove = ['__v'];

        fieldsToRemove.map((field) => {
            delete document[field];
        });

        return document;
    }
};
