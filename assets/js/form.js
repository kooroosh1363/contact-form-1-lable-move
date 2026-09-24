const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_ALLOWED_PATTERN = /^[+()\d\s.-]+$/;

export const LIMITS = Object.freeze({
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  phoneMax: 24,
  messageMin: 10,
  messageMax: 1000,
});

export function normalizeContactForm(input = {}) {
  return {
    name: String(input.name ?? "").trim(),
    email: String(input.email ?? "").trim(),
    phone: String(input.phone ?? "").trim(),
    message: String(input.message ?? "").trim(),
    company: String(input.company ?? "").trim(),
  };
}

export function validateContactForm(input = {}) {
  const data = normalizeContactForm(input);
  const errors = {};

  if (!data.name) {
    errors.name = "Please enter your name.";
  } else if (data.name.length < LIMITS.nameMin || data.name.length > LIMITS.nameMax) {
    errors.name = `Name must be between ${LIMITS.nameMin} and ${LIMITS.nameMax} characters.`;
  }

  if (!data.email) {
    errors.email = "Please enter your email address.";
  } else if (data.email.length > LIMITS.emailMax || !EMAIL_PATTERN.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (data.phone) {
    const digits = data.phone.replace(/\D/g, "");
    const validPhone =
      data.phone.length <= LIMITS.phoneMax &&
      PHONE_ALLOWED_PATTERN.test(data.phone) &&
      digits.length >= 7;

    if (!validPhone) {
      errors.phone = "Use a valid phone number or leave this field empty.";
    }
  }

  if (!data.message) {
    errors.message = "Please enter a message.";
  } else if (
    data.message.length < LIMITS.messageMin ||
    data.message.length > LIMITS.messageMax
  ) {
    errors.message = `Message must be between ${LIMITS.messageMin} and ${LIMITS.messageMax} characters.`;
  }

  if (data.company) {
    errors.form = "Unable to process this request.";
  }

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export function remainingMessageCharacters(value = "") {
  const length = String(value).length;
  return Math.max(0, LIMITS.messageMax - length);
}
