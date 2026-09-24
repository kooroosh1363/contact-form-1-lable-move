# Floatline — Accessible Floating-Label Contact Form

[![Quality](https://github.com/kooroosh1363/contact-form-1-lable-move/actions/workflows/quality.yml/badge.svg)](https://github.com/kooroosh1363/contact-form-1-lable-move/actions/workflows/quality.yml)
[![Deploy](https://github.com/kooroosh1363/contact-form-1-lable-move/actions/workflows/pages.yml/badge.svg)](https://github.com/kooroosh1363/contact-form-1-lable-move/actions/workflows/pages.yml)

Floatline modernizes the repository's original 2023 contact-form exercise into a dependency-free, accessible frontend demo focused on floating labels, semantic form markup, validation, and progressive enhancement.

The original project used JavaScript to toggle a `.focus` class around inputs. The current version keeps the same visual idea but moves the label interaction into CSS using `:focus` and `:placeholder-shown`, while JavaScript is reserved for behavior that actually benefits from scripting: validation feedback, character counting, and demo submission state.

## Features

- CSS-first floating labels
- semantic `label for="..."` associations
- visible keyboard focus
- field-level validation errors
- accessible status messaging
- optional phone field
- message character counter
- honeypot field for basic bot filtering
- responsive mobile/desktop layout
- automatic light/dark color scheme
- reduced-motion support
- zero runtime dependencies
- no third-party fonts or icon scripts
- no network request or data persistence

## Important demo behavior

The form intentionally does **not** submit data anywhere.

A valid submission displays:

> Demo submission validated successfully. No data was transmitted or stored.

That makes the repository safe to host as a static GitHub Pages demo without pretending a backend exists.

## Architecture

```text
index.html
   │
   ├── semantic form markup
   ├── CSS floating-label states
   │
   ▼
assets/js/apps.js
   │
   ├── DOM interaction
   ├── error rendering
   ├── character counter
   └── demo success state
          │
          ▼
assets/js/form.js
   ├── normalization
   ├── validation
   └── pure testable helpers
```

## Why CSS-first floating labels?

The 2023 version required JavaScript to add and remove a class whenever a field received or lost focus.

The modern version lets CSS derive the visual state directly from the input:

```css
.field input:focus + label,
.field input:not(:placeholder-shown) + label {
  /* float the label */
}
```

Benefits:

- fewer moving parts
- label state cannot get out of sync with the field
- the interface still behaves correctly if JavaScript fails
- JavaScript stays focused on validation and feedback

## Run locally

Any static HTTP server works.

With Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Quality checks

Node.js 20+ is required for the test tooling.

Run:

```bash
npm run check
```

That performs JavaScript syntax checks and the full Node test suite.

## Tests cover

- normalization
- valid submissions
- optional phone behavior
- invalid name/email/phone/message input
- honeypot rejection
- message-length limits
- remaining-character calculation
- label/input associations in HTML
- accessible error/status targets
- absence of third-party runtime resources
- module-based application script loading

## Project structure

```text
.
├── index.html
├── assets/
│   ├── style.css
│   └── js/
│       ├── apps.js
│       └── form.js
├── tests/
│   ├── form.test.js
│   └── markup.test.js
├── package.json
└── .github/workflows/
    ├── quality.yml
    └── pages.yml
```

## Accessibility choices

- labels remain real labels rather than placeholders pretending to be labels
- errors are associated with inputs through `aria-describedby`
- invalid fields receive `aria-invalid`
- status and field errors use live-region semantics
- keyboard focus is visible
- a skip link goes directly to the form
- motion respects `prefers-reduced-motion`
- layout remains usable on narrow screens

## Validation contract

| Field | Rule |
| --- | --- |
| Name | required, 2–80 characters |
| Email | required, valid email, max 254 characters |
| Phone | optional, common phone punctuation, at least 7 digits |
| Message | required, 10–1000 characters |
| Honeypot | must remain empty |

Client-side validation improves the demo experience. A real backend must always repeat validation server-side and add CSRF protection, abuse controls, storage/mail handling, and appropriate privacy controls.

## Trade-offs

Floatline is deliberately a frontend component demo, not a fake full-stack contact system. It does not send email, persist messages, or call a third-party form service.

That keeps the project honest, free to host, and focused on the actual engineering lesson: accessible form interaction.

## Deployment

The repository includes a GitHub Pages workflow that runs the quality gate before publishing the static site.

## License

No license is currently included. Add one before redistributing the code as reusable software.
