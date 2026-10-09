// contact.js - validates the contact form before "sending" it.
// The HTML attributes (required, type, pattern, minlength) define the rules;
// this script reads the browser's validity state and shows friendly messages.

var form = document.getElementById("contact-form");
var formStatus = document.getElementById("form-status"); // not named "status": that clashes with window.status

// Friendly error text for each field when it is invalid
var messages = {
  name: "Please enter your name (letters, spaces, hyphens and apostrophes only).",
  email: "Please enter a valid email address, such as name@example.com.",
  phone: "Please enter a 10 digit phone number, such as 905-555-1234.",
  comments: "Please enter a comment of at least 10 characters."
};

// Check one field and show or clear its message
function checkField(field) {
  var errorBox = document.getElementById(field.id + "-error");
  // The browser only checks minlength on typed input, so we check the length here too
  var longEnough = !(field.minLength > 0 && field.value.length < field.minLength);
  if (field.validity.valid && longEnough) {
    errorBox.textContent = "";
    field.classList.remove("invalid");
    field.removeAttribute("aria-invalid");
    return true;
  }
  errorBox.textContent = messages[field.id];
  field.classList.add("invalid");
  field.setAttribute("aria-invalid", "true");
  return false;
}

var fields = form.querySelectorAll("input, textarea");

// Re-check a field as soon as the visitor leaves it
for (var i = 0; i < fields.length; i++) {
  fields[i].addEventListener("blur", function () {
    checkField(this);
  });
}

// On submit, check every field; only continue if all are valid
form.addEventListener("submit", function (event) {
  event.preventDefault(); // no server exists on GitHub Pages, so we stop the real submit
  formStatus.textContent = "";

  var allValid = true;
  var firstBad = null;
  for (var j = 0; j < fields.length; j++) {
    if (!checkField(fields[j])) {
      allValid = false;
      if (firstBad === null) {
        firstBad = fields[j];
      }
    }
  }

  if (allValid) {
    formStatus.textContent = "Thank you! Your message has been received.";
    form.reset();
  } else {
    firstBad.focus(); // move keyboard focus to the first problem
  }
});
