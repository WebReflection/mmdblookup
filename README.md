# mmdblookup

A promise based spawn version of the [mmdblookup](https://maxmind.github.io/libmaxminddb/mmdblookup.html) utility, with an updated [ip-to-country-lite](https://db-ip.com/db/download/ip-to-country-lite) default database from [IP Geolocation by DB-IP](https://db-ip.com).

Please note that `mmdblookup` should be installed a part.

Please also consider using the native [node-geoip2](https://github.com/davidtsai/node-geoip2) module, if extreme perf matters (and if it builds on your machine).

```js
const mmdblookup = require('mmdblookup');

mmdblookup('8.8.8.8').then(console.log);

// passing along the path
mmdblookup('8.8.8.8', ['continent']).then(console.log);

// initializing with another db
// i.e. https://db-ip.com/db/ip-to-country
const payedDB = require('mmdblookup').mddb('./full-ip-to-country-lite.mddb');
// or
const payedDB = mmdblookup.mddb('./full-ip-to-country-lite.mddb');
payedDB('8.8.8.8').then(console.log);
```
