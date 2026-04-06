import { useState } from "react";
import { Plus, Check, Trash2 } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("aquastart-todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  const save = (items: Todo[]) => {
    setTodos(items);
    localStorage.setItem("aquastart-todos", JSON.stringify(items));
  };

  const addTodo = () => {
    if (!input.trim()) return;
    save([...todos, { id: Date.now().toString(), text: input.trim(), done: false }]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    save(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const removeTodo = (id: string) => {
    save(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="glass rounded-2xl p-5 aqua-shadow flex-1">
      <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3">
        To-Do
      </h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a task…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="flex-1 px-3 py-2 rounded-lg bg-input text-foreground text-sm font-body placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary/40"
        />
        <button
          onClick={addTodo}
          className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
        {todos.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4 font-body">
            No tasks yet 🌊
          </p>
        )}
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-foreground/5 transition-all duration-200"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                todo.done
                  ? "bg-primary border-primary"
                  : "border-border hover:border-primary/60"
              }`}
            >
              {todo.done && <Check className="w-3 h-3 text-primary-foreground" />}
            </button>
            <span
              className={`flex-1 text-sm font-body transition-all duration-200 ${
                todo.done ? "line-through text-muted-foreground" : "text-foreground"
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
