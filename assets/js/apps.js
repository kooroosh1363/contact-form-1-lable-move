import {
  LIMITS,
  remainingMessageCharacters,
  validateContactForm,
} from "./form.js";

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
const submitButton = document.querySelector("#submit-button");
const message = document.querySelector("#message");
const counter = document.querySelector("#message-counter");

const fields = ["name", "email", "phone", "message"];

function setFieldError(field, error) {
  const input = document.querySelector(`#${field}`);
  const errorElement = document.querySelector(`#${field}-error`);
  if (!input || !errorElement) return;

  if (error) {
    input.setAttribute("aria-invalid", "true");
    errorElement.textContent = error;
  } else {
    input.removeAttribute("aria-invalid");
    errorElement.textContent = "";
  }
}

function clearErrors() {
  fields.forEach((field) => setFieldError(field, ""));
}

function updateCounter() {
  const remaining = remainingMessageCharacters(message.value);
  counter.textContent = `${remaining} characters remaining`;
  counter.dataset.nearLimit = String(remaining <= 100);
}

function formValues() {
  return Object.fromEntries(new FormData(form).entries());
}

fields.forEach((field) => {
  const input = document.querySelector(`#${field}`);
  input?.addEventListener("input", () => {
    if (input.hasAttribute("aria-invalid")) {
      const { errors } = validateContactForm(formValues());
      setFieldError(field, errors[field] ?? "");
    }
  });
});

message.addEventListener("input", updateCounter);

form.addEventListener("reset", () => {
  window.requestAnimationFrame(() => {
    clearErrors();
    status.textContent = "";
    status.className = "form-status";
    updateCounter();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearErrors();

  const { errors, valid } = validateContactForm(formValues());

  if (!valid) {
    fields.forEach((field) => setFieldError(field, errors[field] ?? ""));
    status.textContent = errors.form ?? "Please review the highlighted fields and try again.";
    status.className = "form-status form-status--error";

    const firstInvalid = fields
      .map((field) => document.querySelector(`#${field}`))
      .find((input) => input?.hasAttribute("aria-invalid"));

    firstInvalid?.focus();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Validated";
  status.textContent =
    "Demo submission validated successfully. No data was transmitted or stored.";
  status.className = "form-status form-status--success";

  window.setTimeout(() => {
    form.reset();
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send message <span aria-hidden="true">→</span>';
  }, 1200);
});

message.maxLength = LIMITS.messageMax;
updateCounter();
