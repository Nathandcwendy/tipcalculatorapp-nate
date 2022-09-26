// Calculation variables
let percentageValue = 0;
let totalBill = 0;
let persons = 0;
let customValue = 0;
let sum = 0;
let average = 0;
let tip = 0;

// get custom div
let custom = document.querySelector(".custom-container");
// ////////////////////////

// create and attach input variables
let billValue = document.querySelector("#bill");
let peopleValue = document.querySelector("#people");
let customInput = document.querySelector("#custom-input");
// /////////////////////////////////

// create variables for each percentage input
let percentages = document.querySelectorAll(".percentage-container");
// //////////////////////////////////

// Eventlistener and function to collect value from clicked percentage
percentages.forEach((percentage) => {
  let clickNumber = 0;
  percentage.addEventListener("click", (e) => {
    e.preventDefault();
    clickNumber++;
    const testRegex = /^([0-9]{1,3})(%)?$/;
    const editedPercentage = percentage.innerText.replace(testRegex, "$1");
    customInput.value = Number(editedPercentage);
    if (clickNumber > 0) {
      percentages.forEach((percentage) => {
        percentage.classList.remove("clicked");
      });
    }
    percentage.classList.add("clicked");
    calculate();
  });
});
// /////////////////////////////

// Eventlistener to custom div to toggle it off and toggle percentage off
custom.addEventListener("click", () => {
  custom.style.display = "none";
  customInput.style.display = "block";
  customInput.focus();
  customInput.value = null;
  percentages.forEach((percentage) => {
    percentage.classList.remove("clicked");
  });
});
// //////////////////////////////////

// Eventlistener to display custom when customInput is empty
customInput.addEventListener("blur", () => {
  if (customInput.value == 0 || customInput.value == undefined) {
    customInput.style.display = "none";
    custom.style.display = "block";
  }
});
// ////////////////////////////////////////

// create variables for output values
let tipPerPerson = document.querySelector("#tip-per-person");
let totalPerPerson = document.querySelector("#total-per-person");
// //////////////////////////////////

// #######-Calculations- and -Outputs-#######
function calculate() {
  // Collecting Variables
  totalBill = parseFloat(billValue.value);
  persons = Number(peopleValue.value);
  customValue = parseFloat(customInput.value);
  sum = 0;
  average = 0;
  tip = 0;
  let averageTip = 0;
  // /////////////////////////////

  // checking for null/undefined inputs
  if (Number(totalBill) == null || Number(totalBill) == 0 || isNaN(totalBill)) {
    totalBill = 0;
  } else {
    totalBill = billValue.value;
  }
  if (Number(persons) == null || Number(persons) == 0 || isNaN(persons)) {
    persons = 1;
  } else {
    persons = peopleValue.value;
  }
  // //////////////////////////////

  // Get sum based on percentage or customInput percentage
  // checking for tip
  if (
    Number(customValue) != 0 &&
    Number(customValue) != null &&
    !isNaN(customValue)
  ) {
    tip = (Number(customValue) / 100) * Number(totalBill);
  }
  // /////////////////////////////

  // Get sum
  sum = Number(totalBill) + tip;
  // //////////////////////////////

  // Getting Averages
  average = sum / Number(persons);
  averageTip = tip / Number(persons);
  // ////////////////////////////////

  // Output Averages
  tipPerPerson.textContent = `$${averageTip.toFixed(2)}`;
  totalPerPerson.textContent = `$${average.toFixed(2)}`;
  // /////////////////////////////

  // Toggle Reset Button Active If There's a !0 value
  if (totalPerPerson.textContent !== "$0.00") {
    resetButton.classList.add("active");
  } else {
    resetButton.classList.remove("active");
  }
  ///////////////////////////////////
}
// /////////////////////////////////

// Eventlistener to make sure its only numbers or a fullstop
billValue.addEventListener("keypress", (e) => {
  let a = [];
  let k = e.which;

  for (let i = 48; i < 58; i++) {
    a.push(i);
  }

  if (!(a.indexOf(k) >= 0) && k != 46) {
    e.preventDefault();
  } else {
    if (k === 46 && e.target.value.includes(".")) {
      e.preventDefault();
    } else {
      if (
        billValue.value.toString().length === 10 &&
        k != 46 &&
        !e.target.value.includes(".")
      ) {
        e.preventDefault();
      } else {
        if (peopleValue.value == null || peopleValue.value == 0) {
          peopleValue.dataset.autofill = 1;
          peopleValue.value = 1;
          peopleValue.parentElement.classList.remove("error");
        } else {
          peopleValue.parentElement.classList.remove("error");
        }
      }
    }
  }
});
// //////////////////////////////////

// Eventlistener to make sure its only numbers or a fullstop
customInput.addEventListener("keypress", (e) => {
  let a = [];
  let k = e.which;

  for (let i = 48; i < 58; i++) {
    a.push(i);
  }

  if (!(a.indexOf(k) >= 0) && k != 46) {
    e.preventDefault();
  } else {
    if (k === 46 && e.target.value.includes(".")) {
      e.preventDefault();
    } else {
      if (
        customInput.value.toString().length === 10 &&
        k != 46 &&
        !e.target.value.includes(".")
      ) {
        e.preventDefault();
      }
    }
  }
});
// //////////////////////////////////

// Eventlistener to make sure its only numbers
peopleValue.addEventListener("keypress", (e) => {
  let a = [];
  let k = e.which;

  for (let i = 48; i < 58; i++) {
    a.push(i);
  }

  if (!(a.indexOf(k) >= 0)) {
    e.preventDefault();
  } else {
    peopleValue.parentElement.classList.remove("error");
  }
});
// //////////////////////////////////

// EventListener to change input type on focus
peopleValue.addEventListener("focus", (e) => {
  e.target.type = "number";
  if (peopleValue.value == null || peopleValue.value == 0) {
    peopleValue.value = null;
  } else if (peopleValue.dataset.autofill == 1) {
    peopleValue.value = null;
    peopleValue.dataset.autofill = null;
  }
});

// EventListener to change input type on blur
peopleValue.addEventListener("blur", (e) => {
  e.target.type = "text";
});
// //////////////////////////////////

// Eventlisteners to Auto Calculate
billValue.addEventListener("keyup", () => {
  calculate();
});

peopleValue.addEventListener("keyup", () => {
  calculate();
});

peopleValue.addEventListener("change", () => {
  calculate();
});

// Auto Calculate and Remove Percentage Class
customInput.addEventListener("keyup", () => {
  // Remove "clicked" class from percentages
  percentages.forEach((percentage) => [percentage.classList.remove("clicked")]);
  // /////////////////////////
  calculate();
});
// ///////////////////////////////////

// Click and Blur Eventlistener to clear out any zero value or warn for zero value
function callFunc() {
  ["click", "blur"].forEach((evt) => {
    peopleValue.addEventListener(evt, () => {
      if (peopleValue.value == null || peopleValue.value == 0) {
        peopleValue.parentElement.parentElement.classList.add("error");
        peopleValue.value = null;
      }
    });
  });
}
callFunc();

billValue.addEventListener("click", () => {
  if (billValue.value == null || billValue.value == 0) {
    billValue.value = null;
  }
});

peopleValue.addEventListener("click", () => {
  if (peopleValue.value == null || peopleValue.value == 0) {
    peopleValue.value = null;
  } else if (peopleValue.dataset.autofill == 1) {
    peopleValue.value = null;
    peopleValue.dataset.autofill = null;
  }
});
// ///////////////////////////////////////////

// Double click Event to quick select
billValue.addEventListener("dblclick", () => {
  if (billValue.value != null || billValue.value != 0) {
    billValue.select();
  }
});

peopleValue.addEventListener("dblclick", () => {
  if (peopleValue.value != null || peopleValue.value != 0) {
    peopleValue.select();
  }
});

customInput.addEventListener("dblclick", () => {
  if (customInput.value != null || customInput.value != 0) {
    customInput.select();
  }
});
// /////////////////////////////////////////

// Reset Button and Function
let resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  percentageValue = 0;
  totalBill = 0;
  persons = 0;
  customValue = 0;
  sum = 0;
  average = 0;
  tip = 0;
  billValue.value = null;
  customInput.value = null;
  peopleValue.value = null;
  tipPerPerson.textContent = `$0.00`;
  totalPerPerson.textContent = `$0.00`;
  percentages.forEach((percentage) => {
    percentage.classList.remove("clicked");
  });
  custom.style.display = "block";
  customInput.style.display = "none";
  peopleValue.parentElement.classList.remove("error");
  resetButton.classList.remove("active");
});

// Added an initial active class to reset button

// //////////////////////////////////////
