const CustomError = require('../errors/CustomError');
const { useJoiValidator } = require('../hooks');

module.exports = {
    validateBySchema: (requestObject, schema) => (req, res, next) => {
        try {
            const objectToValidate = req[requestObject];

            const [
                error,
                value
            ] = useJoiValidator(objectToValidate, schema);

            if (error) {
                throw new CustomError(error, 400);
            }

            req[requestObject] = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
