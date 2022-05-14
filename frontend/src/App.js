import "./App.css";
import { Frontpage } from "./screens/Frontpage";
import { Portfolio } from "./screens/Portfolio";
import Table from "./components/Table";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { NewsFeed } from "./components/NewsFeed";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Portfolio />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/" element={<Table />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
