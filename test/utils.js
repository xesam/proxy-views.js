exports.createOriginObj = function () {
    return {
        name: 'origin name',
        address: {
            city: {
                name: 'origin city',
                id: '001'
            },
            coordination: {
                lat: 1,
                lng: 1
            }
        }
    };
};

exports.createOriginArray = function () {
    return [
        {
            name: 'John',
            friends: ['Jane', 'Joe']
        },
        {
            name: 'Jane',
            friends: ['John', 'Joe']
        }
    ];
};
