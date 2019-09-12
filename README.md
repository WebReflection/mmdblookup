# mmdblookup

[![Build Status](https://travis-ci.com/WebReflection/mmdblookup.svg?branch=master)](https://travis-ci.com/WebReflection/mmdblookup) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/mmdblookup/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/mmdblookup?branch=master)

Originally a promise based spawn version of the [mmdblookup](https://maxmind.github.io/libmaxminddb/mmdblookup.html) utility, with an updated [ip-to-country-lite](https://db-ip.com/db/download/ip-to-country-lite) default database from [IP Geolocation by DB-IP](https://db-ip.com), this is now a simple layer on top of [node-maxmind](https://github.com/runk/node-maxmind).

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

The `.mmdb(mmdbFilePath[, options = {}])` accepts [same options object accepted by maxmind](https://github.com/runk/node-maxmind#options).
