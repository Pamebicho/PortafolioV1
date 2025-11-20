document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  const fields = {
    nombre: {
      input: document.getElementById("nombre"),
      message: "Por favor ingresa tu nombre.",
    },
    email: {
      input: document.getElementById("email"),
      message: "Ingresa un correo válido.",
    },
    mensaje: {
      input: document.getElementById("mensaje"),
      message: "Escribe un mensaje.",
    },
    consentimiento: {
      input: document.getElementById("consentimiento"),
      message: "Debes aceptar el consentimiento.",
    },
  };

  const formMessage = document.getElementById("formMessage");

  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
    });
    document.querySelectorAll(".input-error").forEach((el) => {
      el.classList.remove("input-error");
    });
    formMessage.textContent = "";
    formMessage.className = "";
  }

  function validateField(fieldConfig) {
    const input = fieldConfig.input;
    const errorDiv = input.parentElement.querySelector(".error-message");

    // checkbox
    if (input.type === "checkbox") {
      if (!input.checked) {
        errorDiv.textContent = fieldConfig.message;
        input.classList.add("input-error");
        return false;
      }
      return true;
    }

    // text, email, textarea
    if (!input.value.trim()) {
      errorDiv.textContent = fieldConfig.message;
      input.classList.add("input-error");
      return false;
    }

    // validación de email
    if (input.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        errorDiv.textContent = "El correo no tiene un formato válido.";
        input.classList.add("input-error");
        return false;
      }
    }

    return true;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    let valid = true;

    for (const key in fields) {
      const isValid = validateField(fields[key]);
      if (!isValid) valid = false;
    }

    if (!valid) {
      formMessage.textContent = "❌ Revisa los campos marcados en rojo.";
      formMessage.classList.add("error");
      return;
    }

    // éxito
    formMessage.textContent = "✅ Tu mensaje ha sido enviado correctamente.";
    formMessage.classList.add("success");

    form.reset();
  });

  // limpiar error al escribir
  Object.values(fields).forEach(({ input }) => {
    input.addEventListener("input", () => {
      input.classList.remove("input-error");
      const errorDiv = input.parentElement.querySelector(".error-message");
      errorDiv.textContent = "";
    });
  });
});
