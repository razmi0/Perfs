//---------//
// Title  : main.js
// Author : Razmi0
// Date : 03/28/2021
// Description : Measure performance of diferent selectors
//               methods that grab an element from the DOM
//               and measure the time it takes to do so.
//               1000 elements in the DOM are created, grabed, removed.
//
// Methods that return an array being tested: getElementsByClassName, getElementsByTagName,
//                                            getElementsByName, querySelectorAll
//                                            => Time stored in grabAsArrayTime
//
// Methods that return a variable being tested: getElementById, querySelector
//                                             => Time stored in grabAsVarTime
//
// All measurement stored in perfsInf object
// User informations stored in userInf object
//
//---------//

//---------//
//- Parent HTML element
const anchor = document.querySelector("#anchor");
//---------//
//- Array of elements being created (Not used)
const elements = [];
//---------//
// Number of elements being created and grabed
// DON'T CHANGE THIS VALUE FOR STATISTICAL REASONS
let cap = 1000;
//---------//
//- Object containing informations about the procedures
const proceduralInf = {
    cap : cap,
};
//- Object containing measurements in ms
const perfsInf = {
  totalTime: 0,
  nbrOfLoopsTime: 0,
  loadTime: 0,
  grabAsArrayTime: 0,
  grabAsVarTime: 0,
  unloadTime: 0,
};
//---------//
//- Object containing user informations
const userInf = {
  browser: navigator.userAgent,
  language: navigator.language,
  RAM: navigator.deviceMemory,
  theads: navigator.hardwareConcurrency,
  date: new Date().toLocaleString(),
};
//---------//

//---------//
//- Instructions
//---------//
const scriptBegin = performance.now();
const capLoopBegin = performance.now();
capLoop();
const capLoopEnd = performance.now();
const loadBegin = performance.now();
loadDom();
const loadEnd = performance.now();
const grabArrBegin = performance.now();
grabDomAsArray();
const grabArrEnd = performance.now();
const grabVarBegin = performance.now();
grabDomAsVar();
const grabVarEnd = performance.now();
const unloadBegin = performance.now();
unloadDom();
const unloadEnd = performance.now();
const scriptEnd = performance.now();
//---------//

//---------//
// Performance measurements
//---------//
measurePerformance(scriptBegin, scriptEnd, "totalTime");
measurePerformance(capLoopBegin, capLoopEnd, "nbrOfLoopsTime");
measurePerformance(loadBegin, loadEnd, "loadTime");
measurePerformance(grabArrBegin, grabArrEnd, "grabAsArrayTime");
measurePerformance(grabVarBegin, grabVarEnd, "grabAsVarTime");
measurePerformance(unloadBegin, unloadEnd, "unloadTime");
//---------//

//---------//
// Print results
console.table(proceduralInf);
console.table(perfsInf);
console.table(userInf);

const canvas = document.querySelector("#results");
new Chart(canvas, {
  type: "bar",
  data: {
    labels: Object.keys(perfsInf),
    options: {
      
      
    },
    datasets: [
      {
        label: "ms",
        data: Object.values(perfsInf),
      },
    ],
  },
});

//---------//

//---------//
// Functions
//---------//
function loadDom() {
  for (let i = 0; i < cap; i++) {
    const element = document.createElement("div");
    element.setAttribute("id", `element${i}`);
    element.setAttribute("class", `element element${i}`);
    element.setAttribute("name", `element`);
    elements.push(element);
    anchor.appendChild(element);
  }
}

function unloadDom() {
  for (let i = 0; i < cap; i++) {
    anchor.removeChild(elements[i]);
  }
}

function capLoop() {
  for (let i = 0; i < cap; i++) {}
}

function grabDomAsArray() {
  const arrByClass = document.getElementsByClassName("element");
  const arrByTag = document.getElementsByTagName("div");
  const arrByName = document.getElementsByName("element");
  const arrByAttr = document.querySelectorAll("div");
}

function grabDomAsVar() {
  for (let i = 0; i < cap; i++) {
    const varById = document.getElementById(`element${i}`);
    // Query selector targets id
    const varByQuery = document.querySelector(`#element${i}`);
  }
}

function measurePerformance(time1, time2, name) {
  const duration = time2 - time1;
  perfsInf[name] = truncateDuration(duration);
}

function truncateDuration(duration) {
  return duration.toFixed(3);
}
