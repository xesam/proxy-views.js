function MissingView(obj, __missing__) {
    Object.setPrototypeOf(
        this,
        new Proxy(obj, {
            get(target, prop, receiver) {
                if (obj.hasOwnProperty(prop)) {
                    return obj[prop];
                }
                return __missing__('get', obj, prop);
            },
            set(target, prop, value, receiver) {
                if (obj.hasOwnProperty(prop)) {
                    obj[prop] = value;
                    return;
                }
                return __missing__('set', obj, prop, value);
            }
        })
    );
}

module.exports = MissingView;
