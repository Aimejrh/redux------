import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setColor } from "../../store/slices/ThemeSlice";

const ColorPicker = ({ variable }) => {
  const [color, setColor] = useState("#ffffff");
  const dispatch = useDispatch();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/theme/48ff", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: color }),
      });

      if (!response.ok) {
        throw new Error("Failed to update theme color");
      }

      const data = await response.json();
      dispatch(setColor(data.color));
      console.log("Цвет обновлен");
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="color" value={color} onChange={handleColorChange} />
      <button type="submit">Обновить цвет</button>
    </form>
  );
};

export default ColorPicker;
