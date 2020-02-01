const formElement = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

//Casing the first letter and spacing
function caseAndSpace(inputTypeValue) {
  const formattedWord = inputTypeValue.replace(/([A-Z])/g, " $1");
  return `${formattedWord.charAt(0).toUpperCase()}${formattedWord.slice(1)}`;
}

// check Password match
function isPasswordMatch(inputTypePassword, inputTypeConfirmPassword) {
  if (inputTypePassword.value !== inputTypeConfirmPassword.value) {
    showError(inputTypePassword, " does not match");
    showError(inputTypeConfirmPassword, " does not match");
  }
}
// check username and password valid

function checkLength(inputType, minLen, maxLen) {
  if (inputType.value.trim().length < minLen) {
    showError(inputType, `must be at least ${minLen} characters`);
  } else if (inputType.value.trim().length > maxLen) {
    showError(inputType, `must not be more ${maxLen} characters`);
  }
}
//Check email validity
function isValidEmail(inputEmail) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(inputEmail.value.trim())) {
    showSuccess(inputEmail);
  }
}

//Input is empty
function showError(inputType, msg) {
  const formGroup = inputType.parentNode;
  if (formGroup.classList.contains("success")) {
    formGroup.classList.remove("success");
  }
  formGroup.classList.add("error");
  const errorMsg = formGroup.querySelector("small");
  errorMsg.innerText = `${caseAndSpace(inputType.id)} ${msg}`;
}
// Input is valid Success
function showSuccess(inputType) {
  const formGroup = inputType.parentNode;
  if (formGroup.classList.contains("error")) {
    formGroup.classList.remove("error");
  }
  formGroup.classList.add("success");
}

//Form validation
function checkFormValid(array1) {
  array1.forEach(currVal => {
    if (currVal.value.trim() === "") {
      showError(currVal, "is not valid");
    } else {
      showSuccess(currVal);
    }
  });
}

//Event listner
document.addEventListener("submit", function(e) {
  e.preventDefault();
  const formInput = [username, email, password, confirmPassword];
  checkFormValid(formInput);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  isValidEmail(email);
  isPasswordMatch(password, confirmPassword);
});
