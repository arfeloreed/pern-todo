import React, { useState } from "react";
import axios from "axios";

function InputTodo() {
  const [todo, setTodo] = useState("");

  async function submitForm(event) {
    event.preventDefault();

    try {
      const body = { description: todo };
      await axios.post("http://localhost:5000/todos", body);

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <h1 className="text-center mt-5">Pern Todo List</h1>

      <form className="d-flex mt-5" onSubmit={submitForm}>
        <input
          type="text"
          className="form-control"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          autoFocus
        />
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
    </div>
  );
}

export default InputTodo;
