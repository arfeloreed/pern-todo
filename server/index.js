import express from "express";
import cors from "cors";
import pg from "pg";
import "dotenv/config";

// variables
const app = express();
const port = process.env.SERVER_PORT;

// db setup
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
db.connect();

// middlewares
app.use(cors());
app.use(express.json());

// routes
// get all todos
app.get("/todos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todo");
    const todos = result.rows;

    res.json(todos);
  } catch (err) {
    console.error("Server problem.", err.message);
    res.status(500).send("Internal server error.");
  }
});

// create/add a todo
app.post("/todos", async (req, res) => {
  const { description } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    const todo = result.rows;

    res.json(todo);
  } catch (err) {
    console.error("Server problem.", err.message);
    res.status(500).send("Internal server error.");
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("SELECT * FROM todo WHERE id = $1", [id]);
    const todo = result.rows;

    res.json(todo);
  } catch (err) {
    console.error("Server problem.", err.message);
    res.status(500).send("Internal server error.");
  }
});

// update a todo
app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const result = await db.query(
      "UPDATE todo SET description = $1 WHERE id = $2 RETURNING *",
      [description, id]
    );
    const updated_todo = result.rows;

    res.json(updated_todo);
  } catch (err) {
    console.error("Server problem.", err.message);
    res.status(500).send("Internal server error.");
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM todo WHERE id = $1", [id]);

    res.json(`Successfully deleted todo ${id}`);
  } catch (err) {
    console.error("Server problem.", err.message);
    res.status(500).send("Internal server error.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
