import ChatNavBar from "./ChatNavbar";
import ChatSearch from "./ChatSearch";
import Chats from "./Chats";

const ChatSidebar = () => {
  return (
    <div className="chatSide">
      <ChatNavBar />
      <ChatSearch />
      <Chats />
    </div>
  );
};

export default ChatSidebar;
