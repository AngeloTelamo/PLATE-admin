const ChatSearch = () => {
  return (
    <div className="chatSearch">
      <div className="searchForm">
        <input type="text" placeholder="Search"></input>
      </div>
      <div className="userChat">
        <img
          src="https://i.pinimg.com/564x/ed/90/9f/ed909fbed92f6e2919cf6ef4e63c1683.jpg"
          alt=""
        ></img>
        <div className="userChatinfo">
          <span>Jm</span>
          <p>Please help</p>
        </div>
      </div>
    </div>
  );
};

export default ChatSearch;
