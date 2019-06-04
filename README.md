# Orden [![npm install orden](https://img.shields.io/badge/npm%20install-orden-blue.svg)](https://www.npmjs.com/package/orden)

Parse a markdown table into an array of objects (with optional types). Perfect for mocking data:

```js
import table from 'orden';

const data = table(`
  |name       |age:number  |active:boolean  |
  |-----------|------------|----------------|
  |Francisco  |25          |true            |
  |Maria      |20          |false           |
`);

console.log(data);
// [
//   { name: "Francisco", age: 25, active: true },
//   { name: "Maria", age: 20, active: false },
// ]
```

## Types

- `:s`, `:string`: the default String type.
- `:n`, `:number`: parse as a Javascript number
- `:b`, `:boolean`: parse as true/false. MUST be `true` to parse as true.
- `:o`, `:object`: parse a JSON string to an object. Make sure the data is **a valid JSON Object**. Does not work with arrays or other JSON types.


```js
import table from 'orden';

const data = table(`
  |id:n |name      |location:object                  |
  |-----|----------|---------------------------------|
  |123  |Francisco |{"city":"London","country":"UK"} |
`);

console.log(data);
// [{ id: 123, name: "Francisco", location: { city: 'London', country: 'UK' } }]
```


## Define types

To define types use the second parameter:

```js
import table from 'orden';

const date = str => new Date(str);

const all = table(`
  |a:date     |b:d        |
  |-----------|-----------|
  |2019-01-01 |2019-01-01 |
`, { date, d: date });
```

If you want to define global types, you can do so with the key `types` (these are global, use with caution and only in user-code):

```js
import { types } from 'orden';
types.date = str => new Date(str);
types.d = types.d;
```
