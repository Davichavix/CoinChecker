import "./App.css";
import { Frontpage } from "./screens/Frontpage";
import { Portfolio } from "./screens/Portfolio";
import Table from "./components/Table";
import { NewsFeed } from "./components/NewsFeed";

function App() {
  return (<div className="App">
    <Portfolio />
    <Table />
    <NewsFeed />
  </div>
);
}

export default App;
