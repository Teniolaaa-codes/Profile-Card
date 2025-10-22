// -------------------For Current time in milliseconds-------------------
window.addEventListener("DOMContentLoaded", () => {
  const timeSpan = document.querySelector(
    '[data-testid="test-user-time"] span'
  );
  timeSpan.textContent = Date.now();
});

// -------------------For contact form Validation-------------------
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('[data-testid="test-contact-form"]');
  if (!form) return;

  const nameInput = document.querySelector('[data-testid="test-contact-name"]');
  const emailInput = document.querySelector(
    '[data-testid="test-contact-email"]'
  );
  const subjectInput = document.querySelector(
    '[data-testid="test-contact-subject"]'
  );
  const messageInput = document.querySelector(
    '[data-testid="test-contact-message"]'
  );
  const successMsg = document.querySelector(
    '[data-testid="test-contact-success"]'
  );

  // Show error msg
  function showError(input, message, testid) {
    const errorElem = document.querySelector(
      `[data-testid="test-contact-error-${testid}"]`
    );
    errorElem.textContent = message;
    errorElem.classList.remove("hidden");
    input.setAttribute("aria-invalid", "true");
  }

  // Clear error msg
  function clearError(input, testid) {
    const errorElem = document.querySelector(
      `[data-testid="test-contact-error-${testid}"]`
    );
    if (errorElem) {
      errorElem.textContent = "";
      errorElem.classList.add("hidden");
      input.removeAttribute("aria-invalid");
    }
  }

  // Validate email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  //Validate Name
  function isValidFullName(name) {
    const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;
    return nameRegex.test(name.trim());
  }

  // Form submit handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    successMsg.textContent = "";
    successMsg.classList.add("hidden");

    // Full Name Field
    const nameValue = nameInput.value.trim();
    if (!nameValue) {
      showError(nameInput, "Full name is required.", "name");
      isValid = false;
    } else if (!isValidFullName(nameValue)) {
      showError(
        nameInput,
        "Please enter your full name (e.g., Jane Doe).",
        "name"
      );
      isValid = false;
    } else {
      clearError(nameInput, "name");
    }

    // Email Field
    const emailValue = emailInput.value.trim();
    if (!emailValue) {
      showError(emailInput, "Email is required.", "email");
      isValid = false;
    } else if (emailValue.length < 10) {
      showError(
        emailInput,
        "Email must be at least 10 characters long.",
        "email"
      );
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      showError(
        emailInput,
        "Please enter a valid email (name@example.com).",
        "email"
      );
      isValid = false;
    } else {
      clearError(emailInput, "email");
    }

    // Subject Field
    const subjectValue = subjectInput.value.trim();
    if (!subjectValue) {
      showError(subjectInput, "Subject is required.", "subject");
      isValid = false;
    } else if (subjectValue.length < 3) {
      showError(
        subjectInput,
        "Subject must be at least 3 characters long.",
        "subject"
      );
      isValid = false;
    } else {
      clearError(subjectInput, "subject");
    }

    // msg Field
    const messageValue = messageInput.value.trim();
    if (!messageValue) {
      showError(messageInput, "Message is required.", "message");
      isValid = false;
    } else if (messageValue.length < 10) {
      showError(
        messageInput,
        "Message must be at least 10 characters long.",
        "message"
      );
      isValid = false;
    } else {
      clearError(messageInput, "message");
    }

    // If successful
    if (isValid) {
      successMsg.textContent =
        "Thank you! Your message has been successfully sent.";
      successMsg.classList.remove("hidden");
      form.reset();
      successMsg.setAttribute("tabindex", "-1");
      successMsg.focus();
    }
  });
});
