// this is awkward: the `mmdblookup` outputs invalid JSON
export const parse = result => {
  const json = [];
  for (let i = 0, next = 0; i < result.length; i++) {
    const chr = result[i];
    switch (chr) {
      case ' ':
      case ',':
      case '\n':
      case '\r':
      case '\t':
        break;
      case '{':
      case '[':
        json.push(chr);
        break;
      case '}':
      case ']':
        json.push(chr, ',');
        break;
      case '"':
        next = result.indexOf('"', i + 1) + 1;
        json.push(result.slice(i, next));
        if (result.charAt(next) === ':') {
          json.push(':');
          i = next;
        }
        else {
          json.push(',');
          i = next - 1;
        }
        break;
      case '<':
        i = result.indexOf('>', i + 1);
        break;
      default:
        if (/^(true|false|\d+(?:\.\d+)?)/.test(result.slice(i))) {
          const chunk = RegExp.$1;
          json.push(chunk, ',');
          i += chunk.length - 1;
        }
        break;
    }
  }
  return Function(`return ${json.join('').replace(/,+$/, '')}`)();
};
