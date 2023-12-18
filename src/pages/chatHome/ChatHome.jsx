import Chat from "../../chatComponents/Chat";
import Chats from "../../chatComponents/Chats";
import ChatSidebar from "../../chatComponents/ChatSidebar";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./chatHome.scss";

const ChatHome = () => {
  return (
    <div className="chatHome">
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="container">
            <div className="chatContainer">
              <ChatSidebar />
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
