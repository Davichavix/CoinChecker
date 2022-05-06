import "./App.css";
import { Frontpage } from "./screens/Frontpage";
import { Portfolio } from "./screens/Portfolio";
import Table from "./components/Table";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Portfolio />} />
          <Route path="/" element={<Table />} />
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
