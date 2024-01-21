import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
