import React, { Component } from "react";
import ashok from "../../icons/profile.jpg";

class Footer extends Component {
  render() {
    return (
      <div
        class="footer"
        style={{
          textAlign: "center",
          marginTop: 10
        }}
      >
        <img
          src={ashok}
          alt="Profile"
          style={{
            width: 100,
            borderRadius: 100
          }}
        />
        <p class="credit">Designed and developed by Ashok Gurusamy</p>
        <p class="license">
          Available at{" "}
          <a href="https://github.com/ashokgurusamy" target="_blank">
            Github
          </a>
        </p>
        <div class="copy">&copy; 2019 Ashok Gurusamy</div>
      </div>
    );
  }
}

export default Footer;
