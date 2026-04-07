import { ICONS } from "./icons.js";

export function initTodo() {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  let todos = [];
  const saved = localStorage.getItem("aquastart-todos");
  if (saved) {
    try { todos = JSON.parse(saved); } catch {}
  }

  const save = () => {
    localStorage.setItem("aquastart-todos", JSON.stringify(todos));
    render();
  };

  const render = () => {
    list.innerHTML = "";
    if (todos.length === 0) {
      list.innerHTML = `<p class="text-sm text-muted text-center py-4">No tasks yet 🌊</p>`;
      return;
    }

    todos.forEach((todo) => {
      const div = document.createElement("div");
      div.className = `todo-item ${todo.done ? "done" : ""}`;

      const checkBtn = document.createElement("button");
      checkBtn.className = "todo-checkbox";
      if (todo.done) {
        checkBtn.innerHTML = ICONS.check;
      }
      checkBtn.addEventListener("click", () => {
        todo.done = !todo.done;
        save();
      });

      const span = document.createElement("span");
      span.className = "todo-text";
      span.textContent = todo.text;

      const delBtn = document.createElement("button");
      delBtn.className = "todo-delete";
      delBtn.innerHTML = ICONS.trash;
      delBtn.addEventListener("click", () => {
        todos = todos.filter((t) => t.id !== todo.id);
        save();
      });

      div.appendChild(checkBtn);
      div.appendChild(span);
      div.appendChild(delBtn);

      list.appendChild(div);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      todos.push({ id: Date.now().toString(), text, done: false });
      input.value = "";
      save();
    }
  });

  render();
}
