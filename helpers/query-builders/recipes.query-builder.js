
const recipesQueryBuilder = (query) => {
    const {
        page = 1,
        perPage = 20,
        sortBy = 'createdAt',
        order = 'asc',
        ...props
    } = query;

    const skipCount = (page - 1) * perPage;
    const orderBy = order === 'asc' ? -1 : 1;
    const sort = { [sortBy]: orderBy };

    const filterObject = {};

    const propsKeys = Object.keys(props);

    propsKeys.forEach((propKey) => {
        switch (propKey) {
            case 'recipe_category':
                filterObject.recipe_category = { $eq: props[propKey] };
                break;
            case 'user':
                filterObject.user = { $eq: props[propKey] };
        }
    });

    return [
        filterObject,
        skipCount,
        sort
    ];
};

module.exports = recipesQueryBuilder;
