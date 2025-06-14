# proxy-views.js

Some wrapper views for `Plain Data Object` with [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to make `Data Object` more semantic and easier to use.

views:

1. **MissingView** : a naive wrapper for missing property;
1. **StrictView** : you can only access property that exists in the origin object;
1. **AliasView** : you can define alias for property.

## Install

```bash
npm install proxy-views
```

## Usage

### StrictView

features:

1. you can only get/set the property that exists in origin;
2. if you get/set a property that not exists in origin, it will throw error.

```javascript
const { StrictView } = require('proxy-views');

const origin = {
    name: 'origin name'
};

const view = new StrictView(origin);

console.log(view.name); // 'origin name'
console.log(view.title); // throw error: `title` is not defined in origin
view.title = 'new name'; // throw error: `title` is not defined in origin
```

### AliasView

features:

1. if you access a prop with alias then it will return the value of origin prop;
2. if you modify a prop with alias then the origin prop's value will be modified by setter;

```js
const { AliasView } = require('proxy-views');

const origin = {
    a: {
        b: {
            c: {
                name: 'origin name'
            }
        }
    }
};

const view = new AliasView(origin);
view.alias('a.b.c.name', 'alias1');
view.alias('a.b.c.name', ['alias2']);
view.alias('a.b.c.name', ['alias3'], 'alias4');

console.log(origin.a.b.c.name); // 'origin name'
console.log(view.a.b.c.name); // 'origin name'
console.log(view.alias1); // 'origin name'
console.log(view.alias2); // 'origin name'
console.log(view.alias3); // 'origin name'
console.log(view.alias4); // 'origin name'

view.alias1 = 'new name';
console.log(origin.a.b.c.name); // `new name`
console.log(origin.alias1); // undefined
```

## Change Log

### 0.0.1

1. naive implementation for MissingView, StrictView and AliasView.
