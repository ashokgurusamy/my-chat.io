import React from "react";

import onlineIcon from "../../icons/onlineIcon.png";

import "./TextContainer.css";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h2>
        MyChat - Multiple Group Chat
        <span role="img" aria-label="emoji">
          💬
        </span>
      </h2>
      {/* <h3>
        Created with React, Express, Node and Socket.IO
        <span role="img" aria-label="emoji">
          ❤️
        </span>
      </h3> */}
      <br></br>
    </div>
    {users ? (
      <div>
        <h3>People currently chatting:</h3>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
