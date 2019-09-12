const mmdblookup = require('../cjs').mmdb();

console.time(`mmdblookup('8.8.8.8')`);
mmdblookup('8.8.8.8').then(
  () => {
    console.timeEnd(`mmdblookup('8.8.8.8')`);
    console.time(`mmdblookup('8.8.8.8', ['continent'])`);
    mmdblookup('8.8.8.8', ['continent']).then(
      result => {
        console.timeEnd(`mmdblookup('8.8.8.8', ['continent'])`);
        console.time(`mmdblookup('2607:f0d0:3:8::4')`);
        mmdblookup('2607:f0d0:3:8::4', ['country']).then(() => {
          console.timeEnd(`mmdblookup('2607:f0d0:3:8::4')`);
          const {error} = console;
          const {exit} = process;
          let invoked = 0;
          process.exit = console.error = () => {
            invoked++;
          };
          mmdblookup.mmdb('./shenanigans.mddb');
          console.error = error;
          process.exit = exit;
          console.assert(invoked === 2, 'unknown db fails');
          mmdblookup('2607:f0d0:3:8::4', ['whatever'])
            .then(failed)
            .catch(err => {
              console.assert(!!err, 'catching errors like a boss');
            });
        });
      },
      failed
    );
  },
  failed
);

const {parse} = require('../cjs/utils.js');
compare(`{"test": true <u>}`, {test: true});
compare(`{"test":false}`, {test: false});
compare(`{"test": "" <u>}`, {test: ""});
compare(`{"a": 123, "b": [1 <i>, 2.5 <f>, 3]}`, {"a": 123, "b": [1, 2.5, 3]});
compare(`{"test":["a" , "b","c"]}`, {"test":["a","b","c"]});

function compare(str, out) {
  const current = JSON.stringify(parse(str));
  console.assert(current === JSON.stringify(out), str);
}

function failed(error) {
  console.error(error);
  process.exit(1);
}
