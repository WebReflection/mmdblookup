const mmdblookup = require('../cjs').mddb();

console.time(`mmdblookup('8.8.8.8')`);
mmdblookup('8.8.8.8').then(
  () => {
    console.timeEnd(`mmdblookup('8.8.8.8')`);
    console.time(`mmdblookup('8.8.8.8', ['continent'])`);
    mmdblookup('8.8.8.8', ['continent']).then(
      () => {
        console.timeEnd(`mmdblookup('8.8.8.8', ['continent'])`);
        console.time(`mmdblookup('2607:f0d0:3:8::4')`);
        mmdblookup('2607:f0d0:3:8::4').then(() => {
          console.timeEnd(`mmdblookup('2607:f0d0:3:8::4')`);
          console.log('');
        });
      },
      failed
    );
  },
  failed
);

function failed(error) {
  console.error(error);
  process.exit(1);
}
