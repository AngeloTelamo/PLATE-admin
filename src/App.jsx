import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Home from "./pages/home/Home";
import { userSample } from "./sampledatasource";
import Profile from "./pages/profile/profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ChatHome from "./pages/chatHome/ChatHome";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="message" element={<ChatHome />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/users">
            <Route index element={<List />} />
            <Route path=":userID" element={<Single />} />
            <Route path="edit" element={<New inputs={userSample} />} />
          </Route>
          {/* <Route path="/products">
            <Route index element={<List />} />
            <Route path=":productID" element={<Single />} />
            <Route path="new" element={<New />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
