import {existsSync} from 'fs';
import {resolve} from 'path';
import {spawn} from 'child_process';

import {parse} from './utils.js';

const mmdb = db => {
  if (!db)
    return defaultDB;
  const file = resolve(db);
  if (!existsSync(file)) {
    console.error(`Unable to read ${file}`);
    process.exit(1);
  }
  mmdblookup.mmdb = mmdb;
  return mmdblookup;
  function mmdblookup(ip, path = []) {
    return new Promise((resolve, reject) => {
      const data = [];
      const push = data.push.bind(data);
      const ls = spawn(
        'mmdblookup',
        ['--file', file, '--ip', ip].concat(path)
      );
      ls.stdout.on('data', push);
      ls.stderr.on('data', push);
      ls.on('close', code => {
        const result = data.join('');
        if (code)
          reject(result);
        else
          resolve(parse(result));
      });
    });
  }
};

const defaultDB = mmdb('./dbip-country-lite.mmdb');

export default defaultDB;
