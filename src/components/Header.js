import noimg from "../noimg.png";
import React from "react";

const Header = ({ setLeadModal }) => {
  return (
    <header id="header" className="header">
      <div
        className="header__left"
        style={{ backgroundImage: `url('${noimg}')` }}
      ></div>
      <div className="header__right">
        <button onClick={() => setLeadModal(true)}>Add Lead</button>
      </div>
    </header>
  );
};

export default Header;
