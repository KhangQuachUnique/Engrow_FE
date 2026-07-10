import { parseOAuthTokens } from "./oauth";
import assert from "assert";

// Test Case 1: Valid params
{
  const params = new URLSearchParams("accessToken=token123&refreshToken=ref456");
  const result = parseOAuthTokens(params);
  assert.deepStrictEqual(result, { accessToken: "token123", refreshToken: "ref456" });
}

// Test Case 2: Missing params
{
  const params = new URLSearchParams("accessToken=token123");
  assert.throws(() => parseOAuthTokens(params), /Missing accessToken or refreshToken/);
}

console.log("All oauth helper tests passed!");
