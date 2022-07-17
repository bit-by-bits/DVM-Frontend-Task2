// JS FILE

// RECORDS MANIPULATION
document.addEventListener("DOMContentLoaded", function () {
  // VARIABLE DECLARATION
  const list = document.querySelector(".grid");
  const msg = document.querySelector("#msg");
  const forms = document.forms;
  let key = 0;

  // UPDATE RECORDS LIST
  for (let i = 0; i < 1000; i++) {
    // GETTING LOCAL STORAGE ITEMS
    let currItem = JSON.parse(localStorage.getItem(i));
    if (currItem != null) {
      // CREATE NEW FIELDS
      const li = document.createElement("li");
      const addName = document.createElement("div");
      const addOrg = document.createElement("div");
      const addDemd = document.createElement("div");
      const addRecd = document.createElement("div");
      const addRetd = document.createElement("div");
      const addExpt = document.createElement("div");
      const addActu = document.createElement("div");
      const addDelete = document.createElement("div");

      // UPDATE INNER TEXT
      addName.textContent = "Submitted By: " + currItem.nameL;
      addOrg.textContent = "From: " + currItem.orgL;
      addDemd.textContent = "Qty Demanded: " + currItem.demandL;
      addRecd.textContent = "Qty Received: " + currItem.receiveL;
      addRetd.textContent = "Qty Returned: " + currItem.returnL;
      addExpt.textContent = "Expected: " + currItem.expectedL;
      addActu.textContent = "Received: " + currItem.actualL;
      addDelete.textContent = "Delete";

      // UPDATE ATTRIBUTES
      li.classList.add("appear");
      addDelete.classList.add("delete");
      addDelete.setAttribute("id", `${i}`);

      // APPEND TO PARENT
      li.appendChild(addName);
      li.appendChild(addOrg);
      li.appendChild(addDemd);
      li.appendChild(addRecd);
      li.appendChild(addRetd);
      li.appendChild(addExpt);
      li.appendChild(addActu);
      li.appendChild(addDelete);
      list.appendChild(li);
    }
  }

  // DELETE RECORDS
  list.addEventListener("click", (element) => {
    if (element.target.className == "delete") {
      const deleteLi = element.target.parentElement;

      if (
        confirm("Are you sure about this action?\nThis item would be deleted.")
      ) {
        // DELETE FROM DOM AND STORAGE
        deleteLi.parentNode.removeChild(deleteLi);
        localStorage.removeItem(`${element.target.id}`);
      }
    }
  });

  // CREATE NEW RECORDS
  const addForm = forms["tyv"];
  addForm.addEventListener("submit", (element) => {
    // ON SUBMISSION
    element.preventDefault();
    msg.classList.remove("hidden");
    setTimeout(() => {
      msg.classList.add("hidden");
    }, 5000);

    // VARIABLE DECLARATION
    const nameValue = addForm["name"].value;
    const orgValue = addForm["org"].value;
    const demandValue = addForm["demand"].value;
    const receiveValue = addForm["receive"].value;
    const returnValue = addForm["return"].value;
    const expectedValue = addForm["expected"].value;
    const actualValue = addForm["actual"].value;

    // DATA FOR LOCAL STORAGE
    let addLocal = {
      nameL: nameValue,
      orgL: orgValue,
      demandL: demandValue,
      receiveL: receiveValue,
      returnL: returnValue,
      expectedL: expectedValue,
      actualL: actualValue,
    };

    // UPDATE LOCAL STORAGE
    localStorage.setItem(key++, JSON.stringify(addLocal));

    // CREATE NEW FIELDS
    const li = document.createElement("li");
    const addName = document.createElement("div");
    const addOrg = document.createElement("div");
    const addDemd = document.createElement("div");
    const addRecd = document.createElement("div");
    const addRetd = document.createElement("div");
    const addExpt = document.createElement("div");
    const addActu = document.createElement("div");
    const addDelete = document.createElement("div");

    // UPDATE INNER TEXT
    addName.textContent = "Submitted By: " + nameValue;
    addOrg.textContent = "From: " + orgValue;
    addDemd.textContent = "Qty Demanded: " + demandValue;
    addRecd.textContent = "Qty Received: " + receiveValue;
    addRetd.textContent = "Qty Returned: " + returnValue;
    addExpt.textContent = "Expected: " + expectedValue;
    addActu.textContent = "Received: " + actualValue;
    addDelete.textContent = "Delete";

    // UPDATE ATTRIBUTES
    li.classList.add("appear");
    addDelete.classList.add("delete");
    addDelete.setAttribute("id", `${key - 1}`);

    // APPEND TO PARENT
    li.appendChild(addName);
    li.appendChild(addOrg);
    li.appendChild(addDemd);
    li.appendChild(addRecd);
    li.appendChild(addRetd);
    li.appendChild(addExpt);
    li.appendChild(addActu);
    li.appendChild(addDelete);
    list.appendChild(li);
  });

  // HIDE RECORDS
  const hideBox = document.querySelector(".hide");
  let visible = true;

  hideBox.addEventListener("click", (element) => {
    hideBox.classList.add("noDelay");

    // HIDE OR SHOW GRID ITEMS
    if (visible) {
      visible = false;
      list.style.display = "none";
      hideBox.textContent = "SHOW ALL RECORDS";
    } else {
      visible = true;
      list.style.display = "grid";
      hideBox.textContent = "HIDE ALL RECORDS";
    }
  });

  // SEARCH RECORDS
  const find = forms["search"]["searchList"];

  // PREVENT SUBMISSION
  forms["search"].addEventListener("submit", (element) => {
    element.preventDefault();
  });

  // SEARCH ITEMS
  find.addEventListener("keyup", (element) => {
    // VARIABLE DECLARATION
    const term = element.target.value.toLowerCase();
    const dataEntry = Array.from(list.getElementsByTagName("li"));

    dataEntry.forEach((entry) => {
      const title = entry.textContent;

      // HIDE OR SHOW RESULTS
      if (title.toLowerCase().indexOf(term) != -1) {
        entry.style.display = "block";
      } else {
        entry.style.display = "none";
      }
    });
  });
});

// COUNTER ANIMATION FOR NUMBERS
let display = document.querySelectorAll(".num");
let interval = 20000;

display.forEach((element) => {
  // VARIABLE DECLARATION
  let end = parseInt(element.getAttribute("countUpto"));
  let upto = Math.floor(interval / end);
  let start = 0;

  // SET COUNTER INTERVAL
  let counter = setInterval(() => {
    start++;
    element.textContent = start;
    if (start == end) clearInterval(counter);
  }, upto);
});

// SCROLL EVENTS
let timerPart = document.querySelectorAll(".appear");
window.onscroll = function fadeIn() {
  timerPart.forEach((element) => {
    // VARIABLE DECLARATION
    let size1 = element.getBoundingClientRect();
    let limit1 = size1.bottom;

    // ANIMATION STYLES
    if (window.scrollY >= limit1) {
      element.style.opacity = "1";
      element.style.transform = "translateX(0)";
      element.style.transition = "1.5s ease-in-out";
    } else {
      element.style.opacity = "0";
      element.style.transform = "translateX(-50px)";
      element.style.transition = "0.5s ease-in-out";
    }
  });
};z
