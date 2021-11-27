
const notificationQueryBuilder = (query) => {
    const {
        page = 1,
        perPage = 10,
        ...props
    } = query;

    const skipCount = (page - 1) * perPage;

    const filterObject = {};

    const propsKeys = Object.keys(props);

    propsKeys.forEach((propKey) => {
        switch (propKey) {
            case 'type':
                filterObject.type = props[propKey];
        }
    });

    return [
        skipCount,
        filterObject
    ];
};

module.exports = notificationQueryBuilder;
