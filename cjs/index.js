'use strict';
const {existsSync} = require('fs');
const {resolve} = require('path');

const {open} = require('maxmind');

const {hasOwnProperty} = {};

const through = (result, key) => {
  if (!hasOwnProperty.call(result, key))
    throw new Error;
  return result[key];
};

const mmdb = (db, options = {watchForUpdates: false}) => {
  if (!db)
    return defaultDB;
  const file = resolve(db);
  if (!existsSync(file))
    return fail(`unknown mmdb file: ${file}`);
  const geoDB = open(file, options).catch(fail);
  const mmdblookup = (ip, path = []) => {
    const data = geoDB.then(lookup => lookup.get(ip));
    return path.length ? data.then(
      r => {
        try {
          return [].concat(path).reduce(through, r);
        }
        catch (o_O) {
          return Promise.reject('invalid path');
        }
      }
    ) : data;
  };
  mmdblookup.mmdb = mmdb;
  return mmdblookup;
};

const defaultDB = mmdb('./dbip-country-lite.mmdb');

module.exports = defaultDB;

function fail(error) {
  console.error(error);
  process.exit(1);
}
