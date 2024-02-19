import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import axios from "axios";

function EditTodo({ todo }) {
  const url = "http://localhost:5000/todos";
  const [description, setDescription] = useState(todo.description);

  // helper function
  async function updateTodo() {
    try {
      const body = { description };
      await axios.patch(`${url}/${todo.id}`, body);

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <MdEdit
        className="icon-btn edit"
        data-toggle="modal"
        data-target={`#id${todo.id}`}
      />

      <div
        className="modal"
        id={`id${todo.id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo:</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                onKeyDown={(e) => {
                  if (e.key === "Escape") return setDescription(todo.description);
                  if (e.key === "Enter") return updateTodo();
                }}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={updateTodo}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTodo;
