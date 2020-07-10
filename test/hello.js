// @ts-nocheck
import Index from "../src/index.ts";
import chai from "chai";
const expect = chai.expect;

describe("A spec suite", function () {
  it("contains a passing spec", function (done) {
    expect(Index()).equals("123");
  });
});
