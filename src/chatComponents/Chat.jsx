import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfor">
        <span>Jm</span>
      </div>
      <div className="inforChat">
        <Messages className="informessage" />
      </div>
      <Input className='inforChats'/>
    </div>
  );
};

export default Chat;
