import fs from 'fs';
import path from 'path';
import {spawn} from 'child_process';

const {keys} = Object;

// this is awkward: the `mmdblookup` outputs invalid JSON
const parse = result => {
  const json = [];
  for (let i = 0, next = 0; i < result.length; i++) {
    const chr = result[i];
    switch (chr) {
      case '{':
      case '[':
        json.push(chr);
        break;
      case '}':
      case ']':
        json.push(chr, ",");
        break;
      case '"':
        next = result.indexOf('"', i + 1) + 1;
        json.push(result.slice(i, next));
        if (result.charAt(next) === ':')
          json.push(':');
        else
          json.push(',');
        i = next;
        break;
      case '<':
        i = result.indexOf('>', i + 1) + 1;
        break;
      default:
        if (/\d/.test(chr)) {
          next = result.indexOf(' ', i + 1);
          json.push(result.slice(i, next), ',');
          i = next;
        }
        else if (/f|t/.test(chr)) {
          json.push(chr === 't' ? 'true' : 'false', ',');
          i += chr === 't' ? 4 : 5;
        }
        break;
    }
  }
  return Function(`return ${json.join('').replace(/,+$/, '')}`)();
};

const init = db => {
  if (!db)
    return defaultDB;
  const dbPath = path.resolve(db);
  if (!fs.existsSync(dbPath)) {
    console.error(`Unable to read ${dbPath}`);
    process.exit(1);
  }
  mmdblookup.mddb = init;
  return mmdblookup;
  function mmdblookup(ip, path = []) {
    return new Promise((resolve, reject) => {
      const data = [];
      const push = data.push.bind(data);
      const ls = spawn(
        'mmdblookup',
        ['--file', dbPath, '--ip', ip].concat(path)
      );
      ls.stdout.on('data', push);
      ls.stderr.on('data', push);
      ls.on('close', code => {
        const result = data.join('');
        if (code)
          reject(result);
        else {
          try {
            resolve(parse(result));
          }
          catch (o_O) {
            reject(error);
          }
        }
      });
    });
  }
};

const defaultDB = init('./dbip-country-lite.mmdb');

export default defaultDB;
