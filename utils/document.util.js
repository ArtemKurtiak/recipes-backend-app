module.exports = {
    normalizeDocument: (document) => {
        document = document.toJSON();

        const fieldsToRemove = [
            '__v',
            'password'
        ];

        fieldsToRemove.map((field) => {
            delete document[field];
        });

        return document;
    }
};
