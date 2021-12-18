

const likesQueryBuilder = (query) => {
    const {
        page = 1,
        perPage = 20,
    } = query;

    const skipCount = (page - 1) * perPage;

    const filterObject = {};

    return [
        filterObject,
        skipCount,
        +perPage
    ];
};

module.exports = likesQueryBuilder;
