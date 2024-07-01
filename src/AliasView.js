const PROP_PATH_SEP = '.';

function getPropValue(target, propPath) {
    if (propPath === undefined) {
        return target;
    }
    if (propPath === null) {
        return null;
    }

    let attrs = typeof propPath == 'string' ? propPath.split(PROP_PATH_SEP) : propPath;
    if (!Array.isArray(attrs)) {
        attrs = [attrs];
    }
    let attr = target;
    for (const attrName of attrs) {
        attr = attr[attrName];
        if (attr === undefined) {
            return undefined;
        }
    }
    return attr;
}
function getPropName(prop, aliases) {
    if (prop in aliases) {
        prop = aliases[prop];
    }
    return prop;
}

function createAliasObj(obj, aliases) {
    const aliasObj = {};
    for (const alias in aliases) {
        const originProp = aliases[alias];
        aliasObj[alias] = getPropValue(obj, originProp);
    }
    return aliasObj;
}

function AliasView(obj) {
    const _aliases = {};
    this.alias = function (originProp, ...aliasNames) {
        aliasNames
            .flat()
            .filter((aliasName) => aliasName !== originProp)
            .forEach((aliasName) => {
                _aliases[aliasName] = originProp;
            });
    };

    this.toJSON = function ({ target, alias } = { target: true, alias: true }) {
        const retJSON = {};
        if (target) {
            Object.assign(retJSON, obj);
        }
        if (alias) {
            Object.assign(retJSON, createAliasObj(obj, _aliases));
        }
        return retJSON;
    };

    Object.setPrototypeOf(
        this,
        new Proxy(obj, {
            get(target, prop, receiver) {
                prop = getPropName(prop, _aliases);
                return getPropValue(target, prop);
            },
            set(target, prop, value, receiver) {
                prop = getPropName(prop, _aliases);
                target[prop] = value;
            }
        })
    );
}

module.exports = AliasView;
