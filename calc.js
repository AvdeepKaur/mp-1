// Clear function
function clearCalc() {
  // Clear input boxes
  document.getElementById("first-number").value = "";
  document.getElementById("second-number").value = "";

  // Clear output and reset styling
  const outputElement = document.getElementById("output");
  outputElement.innerHTML = "";
  outputElement.classList.remove("negative-result");
}

function getInputValues() {
  const firstNumber = parseFloat(document.getElementById("first-number").value);
  const secondNumber = parseFloat(
    document.getElementById("second-number").value
  );
  return { firstNumber, secondNumber };
}

// Helper function to display result
function displayResult(result) {
  const outputElement = document.getElementById("output");

  // Check if result is a number
  if (isNaN(result)) {
    outputElement.innerHTML = "Error: Invalid input";
    outputElement.classList.remove("negative-result");
    return;
  }

  // Check if result is infinite
  if (!isFinite(result)) {
    outputElement.innerHTML = "Error: Division by zero";
    outputElement.classList.remove("negative-result");
    return;
  }

  // Display the result
  outputElement.innerHTML = String(result);

  // Apply negative styling if result is negative
  if (result < 0) {
    outputElement.classList.add("negative-result");
  } else {
    outputElement.classList.remove("negative-result");
  }
}

// Addition function
function addition() {
  const { firstNumber, secondNumber } = getInputValues();

  // Check if inputs are valid
  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    displayResult(NaN);
    return;
  }

  const result = firstNumber + secondNumber;
  displayResult(result);
}

// Subtraction function
function subtraction() {
  const { firstNumber, secondNumber } = getInputValues();

  // Check if inputs are valid
  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    displayResult(NaN);
    return;
  }

  const result = firstNumber - secondNumber;
  displayResult(result);
}

// Multiplication function
function multiplication() {
  const { firstNumber, secondNumber } = getInputValues();

  // Check if inputs are valid
  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    displayResult(NaN);
    return;
  }

  const result = firstNumber * secondNumber;
  displayResult(result);
}

// Division function
function division() {
  const { firstNumber, secondNumber } = getInputValues();

  // Check if inputs are valid
  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    displayResult(NaN);
    return;
  }

  // Check for division by zero
  if (secondNumber === 0) {
    displayResult(Infinity);
    return;
  }

  const result = firstNumber / secondNumber;
  displayResult(result);
}

// Power function with da for loop
function power() {
  const { firstNumber, secondNumber } = getInputValues();

  // Check if inputs are valid
  if (isNaN(firstNumber) || isNaN(secondNumber)) {
    displayResult(NaN);
    return;
  }

  // Handle special cases
  if (secondNumber === 0) {
    displayResult(1);
    return;
  }

  if (firstNumber === 0) {
    displayResult(0);
    return;
  }

  // Handle negative exponents
  if (secondNumber < 0) {
    const positiveExponent = -secondNumber;
    let result = 1;

    // Use for loop to calculate power
    for (let i = 0; i < positiveExponent; i++) {
      result *= firstNumber;
    }

    // Return reciprocal for negative exponent
    displayResult(1 / result);
    return;
  }

  // Handle fractional exponents (round to nearest integer)
  const exponent = Math.round(secondNumber);
  let result = 1;

  // Use for loop to calculate power as required
  for (let i = 0; i < exponent; i++) {
    result *= firstNumber;
  }

  displayResult(result);
}

// Add keyboard support for better user experience
document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll('input[type="number"]');

  inputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        addition(); // Default to addition on Enter key
      }
    });
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "=":
        case "+":
          e.preventDefault();
          addition();
          break;
        case "-":
          e.preventDefault();
          subtraction();
          break;
        case "*":
          e.preventDefault();
          multiplication();
          break;
        case "/":
          e.preventDefault();
          division();
          break;
        case "Backspace":
          e.preventDefault();
          clear();
          break;
      }
    }
  });
});

// Add visual feedback for button clicks
function addButtonFeedback() {
  const buttons = document.querySelectorAll(".calculator-buttons button");

  buttons.forEach((button) => {
    button.addEventListener("mousedown", function () {
      this.style.transform = "translateY(-1px) scale(0.95)";
    });

    button.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-3px) scale(1)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Initialize button feedback when page loads
document.addEventListener("DOMContentLoaded", addButtonFeedback);
