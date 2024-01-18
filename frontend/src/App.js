import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
