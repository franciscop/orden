import table, { types } from "./index.js";

describe("table", () => {
  it("works empty", () => {
    expect(table()).toEqual([]);
    expect(table("")).toEqual([]);
    expect(table("  ")).toEqual([]);
  });

  it("renders the example properly", () => {
    const str = `
      |name      |age:number  |active:boolean  |
      |----------|------------|----------------|
      |Francisco |25          |true            |
    `;
    expect(table(str)).toEqual([{ name: "Francisco", age: 25, active: true }]);
  });

  it("works", () => {
    const str = `
| a    | b     | c     |
| ---- | ----- | ----- |
| 1    | 2     | 3     |
  `;
    expect(table(str)).toEqual([{ a: "1", b: "2", c: "3" }]);
  });

  it("works with other format", () => {
    const str = `
      |a |b |c |
      |--|--|--|
      |1 |2 |3 |
    `;
    expect(table(str)).toEqual([{ a: "1", b: "2", c: "3" }]);
  });

  it("can parse formats", () => {
    const str = `
      |a:string |b:number |c:boolean |
      |---------|---------|----------|
      |abcdefgh |12345678 |true      |
    `;
    expect(table(str)).toEqual([{ a: "abcdefgh", b: 12345678, c: true }]);
  });

  it("can parse shortname formats", () => {
    const str = `
      |a:s      |b:n      |c:b       |
      |---------|---------|----------|
      |abcdefgh |12345678 |true      |
    `;
    expect(table(str)).toEqual([{ a: "abcdefgh", b: 12345678, c: true }]);
  });

  it("can parse json", () => {
    const str = `
      |a:o       |
      |----------|
      |{"b":"c"} |
    `;
    expect(table(str)).toEqual([{ a: { b: "c" } }]);
  });

  it("throws on invalid json", () => {
    const str = `
      |a:o       |
      |----------|
      |{"b"}     |
    `;
    expect(() => table(str)).toThrow();
  });

  it("can define new formats", () => {
    const str = `
      |a:date     |b:d        |
      |-----------|-----------|
      |2019-01-01 |2019-01-01 |
    `;
    types.date = str => new Date(str);
    types.d = types.date;
    const [{ a, b }] = table(str);
    expect(a).toEqual(new Date("2019-01-01"));
    expect(b).toEqual(new Date("2019-01-01"));
    expect(a).toEqual(b);
  });
});
