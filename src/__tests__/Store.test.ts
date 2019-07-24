import { Store } from "../store/Store";

const allowedChars: { input: string; result: string[] }[] = [
  { input: "abc", result: ["a", "b", "c"] },
  { input: "aabbcc", result: ["a", "b", "c"] },
  { input: "", result: [] },
  { input: "AaDdd", result: ["A", "D", "a", "d"] }
];

const tests: {
  input: string;
  allowedChars: string;
  result: { char: string; count: number }[];
}[] = [
  {
    input: "addabe45fccc",
    allowedChars: "abc",
    result: [
      { char: "a", count: 2 },
      { char: "b", count: 1 },
      { char: "c", count: 3 }
    ]
  },
  {
    input: "cc3dlkcjbrcd",
    allowedChars: "abcd",
    result: [
      { char: "b", count: 1 },
      { char: "c", count: 4 },
      { char: "d", count: 2 }
    ]
  }
];

describe("", () => {
  it("allowedChars", () => {
    const store: Store = new Store();

    for (const item of allowedChars) {
      store.setAllowedChars(item.input);
      expect(store.allowedChars).toEqual(item.result);
    }
  });

  it("setValue", () => {
    const store: Store = new Store();

    for (const item of tests) {
      store.setAllowedChars(item.allowedChars);
      store.setValue(item.input);
      expect(store.chars).toEqual(item.result);
    }
  });
});
