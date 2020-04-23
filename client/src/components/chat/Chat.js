import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Footer from "../footer/footer";
import Input from "../Input/Input";

import "./Chat.css";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  //const ENDPOINT = "https://project-mychat.herokuapp.com/";
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const ENDPOINT = "https://project-chat-application.herokuapp.com/";
  var aesjs = require("aes-js");
  var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  // The initialization vector (must be 16 bytes)
  var iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      console.log("Comes from chat.js: ", message, room, name, messages.length);
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  const encryptMsg = event => {
    event.preventDefault();
    alert();
    if (message) {
      var text = "hi";
      var textBytes = aesjs.utils.utf8.toBytes(text);

      var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
      var encryptedBytes = aesCbc.encrypt(textBytes);

      // To print or store the binary data, you may convert it to hex
      var encryptedHex;
      encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
      console.log(message, room, name, messages.length);
      socket.emit("encryptMsg", message, () => setMessage(""));

      console.log(encryptedHex);
    }
  };

  return (
    <div className="Parent">
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            encryptMsg={encryptMsg}
          />
        </div>
        <TextContainer users={users} />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Chat;
