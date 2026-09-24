import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("form fields have matching label associations", () => {
  for (const id of ["name", "email", "phone", "message"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
    assert.match(html, new RegExp(`for=["']${id}["']`));
  }
});

test("markup includes accessible status and error targets", () => {
  assert.match(html, /id="form-status"[^>]*role="status"/);
  for (const field of ["name", "email", "phone", "message"]) {
    assert.match(html, new RegExp(`id=["']${field}-error["']`));
  }
});

test("page avoids third-party runtime resources", () => {
  assert.doesNotMatch(html, /unpkg\.com|fonts\.googleapis\.com|cdnjs|jsdelivr/i);
});

test("application JavaScript is loaded as a module", () => {
  assert.match(html, /<script[^>]+type="module"[^>]+src="\.\/assets\/js\/apps\.js"/);
});
