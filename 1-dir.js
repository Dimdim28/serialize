'use strict';

const obj1 = {
  field: 'string',
  subObject: {
    arr: [2,8, 5],
    fn: (x) => x + 4
  }
};

console.dir(obj1);
console.log(obj1.subObject.fn.toString());

const s = JSON.stringify(obj1);
console.log(s);
const obj2 = JSON.parse(s);
console.log(obj2);


let serializers = null;

const serialize = (obj) => {
  const type = typeof obj;
  const serializer = serializers[type];
  return serializer(obj);
};

serializers = {
  string: (s) => `${s}`,
  number: (n) => n.toString(),
  boolean: (b) => b.toString(),
  function: (f) => f.toString(),
  object: (o) => {
    if (Array.isArray(o)) return `[${o}]`;
    if (o === null) return 'null';
    let s = '{';
    for (const key in o) {
      const value = o[key];
      if (s.length > 1) s += ',';
      s += key + ':' + serialize(value);
    }
    return s + '}';
  }
};


console.log(serialize(obj1));


const vm = require('vm');

const jstp = `{
  name: 'Dima',
  address: { city: 'Kiev' },
  professions: ['Node js'],
  fn: x => x * 2
}`;

const script = vm.createScript(`(${jstp})`);
const data = script.runInThisContext();
console.dir(data);
