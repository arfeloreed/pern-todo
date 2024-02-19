import "./App.css";
import InputTodo from "./components/InputTodo.js";
import ListTodo from "./components/ListTodo.js";

function App() {
  return (
    <div className="App container">
      <InputTodo />
      <ListTodo />
    </div>
  );
}

export default App;
