import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Home from "./pages/home/Home";
import { userSample } from "./sampledatasource";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ChatHome from "./pages/chatHome/ChatHome";
import ForgotPassword from "./pages/forgotPassword/forgot";
import FoodList from "./pages/single/FoodList";
import Customers from "./pages/single/Customers";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path= "/"/>
          
          <Route index element={<Login />} />
          <Route path ='register'element= {<Register/>}/>
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="message" element={<ChatHome />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="forgot" element={<ForgotPassword/>}/>
          <Route path="/food/:orderId" element={<FoodList />} />
          <Route path="notif" element={<New/>}/>


          <Route path="users">
            <Route index element={<List />} />
            <Route path=":uid" element={<Single />} />
            <Route path="edit" element={<New inputs={userSample} />} />
          </Route>

          <Route path="customers">
            <Route path=":uid" element={<Customers />} />
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
