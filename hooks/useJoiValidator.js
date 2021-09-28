
const useJoiValidator = (object, schema) => {
    const validationResult = schema.validate(object);

    try {
        const errorMessage = validationResult.error.details[0].message;

        return [
            errorMessage,
            null
        ];
    } catch (e) {
        return [
            null,
            validationResult.value
        ];
    }
};

module.exports = useJoiValidator;
