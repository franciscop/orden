import md from "mdtable2json";

const string = str => String(str);
const number = n => Number(n);
const boolean = b => /^True$/i.test(b);
const object = str => {
  try {
    return JSON.parse(str);
  } catch (error) {
    throw new Error(`Cannot parse "${str}" as JSON`);
  }
};

export const types = {
  s: string,
  n: number,
  b: boolean,
  o: object,
  string,
  number,
  boolean,
  bool: boolean,
  object
};

export default (str, userTypes = {}) => {
  if (!str || typeof str !== "string") return [];
  str = str
    .split("\n")
    .filter(s => s.replace(/\s+/, ""))
    .map(str => str.trim())
    .join("\n");
  const tables = md.getTables(str);
  if (!tables.length) return [];
  return tables[0].json.map(data => {
    const row = {};
    for (let name in data) {
      const [key, type = "string"] = name.split(":");
      const parse = userTypes[type] || types[type];
      row[key] = parse(data[name]);
    }
    return row;
  });
};
