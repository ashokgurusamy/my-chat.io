import React from "react";

import "./Input.css";
import "bootstrap/dist/css/bootstrap.css";
import closeIcon from "../../icons/paper-plane (1).svg";

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => (event.key === "Enter" ? sendMessage(event) : null)}
    />
    <button
      className="sendButton glyphicon glyphicon-send"
      onClick={e => sendMessage(e)}
    >
      <img src={closeIcon} alt="send-message" width="36%" />{" "}
    </button>
  </form>
);

export default Input;
