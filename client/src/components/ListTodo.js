import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import EditTodo from "./EditTodo";

function ListTodo() {
  const url = "http://localhost:5000/todos";
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    try {
      const response = await axios.get(url);
      setTodos(response.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`${url}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <table className="table text-center mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <MdDelete
                  className="icon-btn delete"
                  onClick={() => deleteTodo(todo.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListTodo;
