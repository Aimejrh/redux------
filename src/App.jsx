import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTodo from "./components/AddTodo/AddTodo.jsx";
import ColorPicker from "./components/Color/ColorPicker.jsx";
import TodoList from "./components/TodoList/TodoList.jsx";
import { setColor } from "./store/slices/ThemeSlice";
import "./index.scss";

const App = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadColor = async () => {
      const response = await fetch("http://localhost:4000/theme");
      const data = await response.json();
      dispatch(setColor(data.color));
    };

    loadColor();
  }, [dispatch]);

  return (
    <div>
      <ColorPicker variable="--input-background-color" />
      <div>
        <h1>Redux</h1>
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
};

export default App;
