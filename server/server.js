const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
const PORT = 4000;
const dbPath = path.join(__dirname, "db.json");

app.use(express.json());

app.post("http://localhost:4000/todos", (req, res) => {
  const newTodo = {
    id: new Date().toISOString(),
    title: req.body.title,
  };

  const currentState = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  currentState.todos.push(newTodo);
  fs.writeFileSync(dbPath, JSON.stringify(currentState));

  res.json(newTodo);
});

app.delete("http://localhost:4000/todos/:id", (req, res) => {
  const currentState = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  const updatedTodos = currentState.todos.filter(
    (todo) => todo.id !== req.params.id
  );
  currentState.todos = updatedTodos;
  fs.writeFileSync(dbPath, JSON.stringify(currentState));
  res.json(updatedTodos);
});

app.put("http://localhost:4000/theme", (req, res) => {
  // Получаем новое значение цвета из тела запроса
  const newColor = req.body.color;

  // Путь к файлу db.json
  const dbPath = path.join(__dirname, "db.json");

  try {
    // Читаем текущее состояние из файла
    const currentState = JSON.parse(fs.readFileSync(dbPath, "utf8"));

    // Обновляем цвет темы в текущем состоянии
    currentState.theme.color = newColor;

    // Записываем обновленное состояние обратно в файл
    fs.writeFileSync(dbPath, JSON.stringify(currentState));

    // Отправляем ответ клиенту
    res.json({ message: "Цвет темы обновлен", color: newColor });
  } catch (error) {
    console.error("Ошибка при обновлении db.json:", error);
    res.status(500).json({ message: "Ошибка при обновлении цвета темы" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
