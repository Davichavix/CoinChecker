import "./App.css";
import { Frontpage } from "./screens/Frontpage";
import { Portfolio } from "./screens/Portfolio";
import Table from "./components/Table";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Portfolio />
      <Table />
    </div>
  );
}

export default App;
