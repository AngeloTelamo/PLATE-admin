const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img
          alt=""
          src="https://i.pinimg.com/564x/ed/90/9f/ed909fbed92f6e2919cf6ef4e63c1683.jpg"
        ></img>
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>Hello</p>
        {/* <img
          alt=""
          src="https://i.pinimg.com/564x/ed/90/9f/ed909fbed92f6e2919cf6ef4e63c1683.jpg"
        ></img> */}
      </div>
    </div>
  );
};

export default Message;
