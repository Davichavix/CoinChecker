import "./App.css";
import { Frontpage } from "./screens/Frontpage";
import { Portfolio } from "./screens/Portfolio";
import Table from "./components/Table";

function App() {
  return (<div className="App">
    <Portfolio />
    <Table />
  </div>
);
}

export default App;
