document.addEventListener("DOMContentLoaded", () => {
  loadItems();
});

document.querySelector("#input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const input = document.querySelector("#input");
    addItem(input.value, true);
  }
});

document.querySelector("#add_item").addEventListener("click", () => {
  const input = document.querySelector("#input");
  addItem(input.value, true);
});

function addItem(input, save = false) {
  if (!input.trim()) return;

  const item = document.createElement("div");
  const div = document.createElement("div");
  const checkIcon = document.createElement("i");
  const trashIcon = document.createElement("i");
  const text = document.createElement("p");

  item.className = "item";
  text.textContent = input;

  checkIcon.className = "fas fa-check-square";
  checkIcon.style.color = "lightgray";
  checkIcon.addEventListener("click", () => {
    checkIcon.style.color = "limegreen";
  });
  div.appendChild(checkIcon);

  trashIcon.className = "fas fa-trash";
  trashIcon.style.color = "darkgray";
  trashIcon.addEventListener("click", () => {
    removeItem(input);
    item.remove();
  });
  div.appendChild(trashIcon);

  item.appendChild(text);
  item.appendChild(div);

  document.querySelector("#to_do_list").appendChild(item);
  document.querySelector("#input").value = "";

  if (save) saveItem(input);
}

function saveItem(input) {
  let items = JSON.parse(localStorage.getItem("todoItems")) || [];
  if (!items.includes(input)) {
    items.push(input);
    localStorage.setItem("todoItems", JSON.stringify(items));
  }
}

function removeItem(input) {
  let items = JSON.parse(localStorage.getItem("todoItems")) || [];
  items = items.filter(item => item !== input);
  localStorage.setItem("todoItems", JSON.stringify(items));
}

function loadItems() {
  let items = JSON.parse(localStorage.getItem("todoItems")) || [];
  items.forEach(item => addItem(item, false));
}