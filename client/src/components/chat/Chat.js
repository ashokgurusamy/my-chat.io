import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import $ from "jquery";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Footer from "../footer/footer";
import Input from "../Input/Input";

import "./chat.css";

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
  var aes256 = require("aes256");

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

  function encryptMsg() {
    var key = "my passphrase";
    var plaintext = message;

    var encrypted = aes256.encrypt(key, plaintext);
    var decrypted = aes256.decrypt(key, encrypted);
    console.log("encrypted is: " + encrypted, " decrypted is: ", decrypted);
  }

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      console.log("Comes from chat.js: ", message, room, name, messages.length);
      encryptMsg();
      post();
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  function post() {
    $.post(
      "https://apex.oracle.com/pls/apex/my-chat/storemessages/insert",
      {
        UserName: name,
        MsgOrder: messages.length,
        MessageContent: message,
        RoomName: room
      },
      function(data, status) {
        console.log("Data Stored Suucessfully");
      }
    );
  }

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
