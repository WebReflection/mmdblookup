const maxmind = require('maxmind');
const {mmdb} = require('../cjs');

console.time(`maxmind.lookup.get('8.8.8.8')`);
maxmind.open(require.resolve('../dbip-country-lite.mmdb')).then(lookup => {
  const result = lookup.get('8.8.8.8');
  console.timeEnd(`maxmind.lookup.get('8.8.8.8')`);
  const mmdblookup = mmdb();
  console.time(`mmdblookup('8.8.8.8')`);
  mmdblookup('8.8.8.8').then(
    result => {
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
              if (invoked === 2) {
                console.error = error;
                process.exit = exit;
                console.assert(2 <= invoked, 'unknown db fails');
                mmdblookup('2607:f0d0:3:8::4', ['whatever'])
                  .then(failed)
                  .catch(err => {
                    console.assert(!!err, 'catching errors like a boss');
                    console.log('OK');
                  });
              }
            };
            mmdblookup.mmdb('./shenanigans.mddb');
          });
        },
        failed
      );
    },
    failed
  );
});

function failed(error) {
  console.error(error);
  process.exit(1);
}
