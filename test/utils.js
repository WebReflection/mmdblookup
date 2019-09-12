const {parse} = require('../cjs/utils.js');
compare(`{"test": true !}`, {test: true});
compare(`{"test": true <u>}`, {test: true});
compare(`{"test":false}`, {test: false});
compare(`{"test": "" <u>}`, {test: ""});
compare(`{"a": 123, "b": [1 <i>, 2.5 <f>, 3]}`, {"a": 123, "b": [1, 2.5, 3]});
compare(`{"test":["a" , "b","c"]}`, {"test":["a","b","c"]});

function compare(str, out) {
  const current = JSON.stringify(parse(str));
  console.assert(current === JSON.stringify(out), str);
}
