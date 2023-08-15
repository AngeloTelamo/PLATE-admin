import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type something" />
      <div className="send">
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <AttachFileIcon className="imgs" />
        </label>
        <SendIcon className="sendImg" />
      </div>
    </div>
  );
};

export default Input;
