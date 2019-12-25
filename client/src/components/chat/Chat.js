import React, { useState, useEffect } from "react";
import queryString from "query-string"; //retrieve data from url
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    //Check below three console for better understanding
    console.log(location);
    console.log(location.search);
    console.log(name + room);

    setName(name);
    setRoom(room);
  });
  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};

export default Chat;
