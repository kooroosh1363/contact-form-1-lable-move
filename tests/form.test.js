import test from "node:test";
import assert from "node:assert/strict";

import {
  LIMITS,
  normalizeContactForm,
  remainingMessageCharacters,
  validateContactForm,
} from "../assets/js/form.js";

test("normalizes user-controlled string fields", () => {
  assert.deepEqual(
    normalizeContactForm({
      name: "  Ada Lovelace  ",
      email: " ada@example.com ",
      phone: " +1 555 123 4567 ",
      message: "  Hello there.  ",
    }),
    {
      name: "Ada Lovelace",
      email: "ada@example.com",
      phone: "+1 555 123 4567",
      message: "Hello there.",
      company: "",
    },
  );
});

test("accepts a valid contact payload", () => {
  const result = validateContactForm({
    name: "Grace Hopper",
    email: "grace@example.com",
    phone: "+1 (555) 123-4567",
    message: "I would like to discuss a small web project.",
    company: "",
  });
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
});

test("phone is optional", () => {
  const result = validateContactForm({
    name: "Alan Turing",
    email: "alan@example.com",
    phone: "",
    message: "This message is long enough.",
  });
  assert.equal(result.valid, true);
});

test("rejects missing and malformed values", () => {
  const result = validateContactForm({
    name: "A",
    email: "not-an-email",
    phone: "call-me",
    message: "short",
  });
  assert.equal(result.valid, false);
  for (const field of ["name", "email", "phone", "message"]) {
    assert.ok(result.errors[field], `expected an error for ${field}`);
  }
});

test("rejects honeypot content", () => {
  const result = validateContactForm({
    name: "Valid Person",
    email: "person@example.com",
    message: "This is a valid message body.",
    company: "spam bot",
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.form);
});

test("enforces message maximum and exposes remaining count", () => {
  const oversized = "x".repeat(LIMITS.messageMax + 1);
  const result = validateContactForm({
    name: "Valid Person",
    email: "person@example.com",
    message: oversized,
  });
  assert.ok(result.errors.message);
  assert.equal(remainingMessageCharacters("hello"), LIMITS.messageMax - 5);
  assert.equal(remainingMessageCharacters(oversized), 0);
});
