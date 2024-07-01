const MissingView = require('./MissingView');

function StrictView(obj) {
    Object.setPrototypeOf(
        this,
        new MissingView(obj, (method, obj, prop, ...kargs) => {
            throw new Error(`Property "${prop}" is not defined in origin object`);
        })
    );
}

module.exports = StrictView;
