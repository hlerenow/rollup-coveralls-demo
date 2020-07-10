// @ts-nocheck
import chai from "chai";
const expect = chai.expect;

describe("A spec suite", function () {
  it("contains a passing spec", function () {
    localStorage.setItem("test", "1");
    console.log(localStorage.getItem("test"));
    expect(localStorage.getItem("test")).eq("1");
  });
});
