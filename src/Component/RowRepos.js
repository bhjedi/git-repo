import React from "react";
import "./RowRepos.css";

function RowRepos({ name, description, star, issues, avatar,submittedDays,loginName}) {
  return (
    <div className="row">
      <img src={`${avatar}`} alt="avatar_img" />
      <div className="row__rowContent">
        <h1 className="row__rowContentName" >{name}</h1>
        <p>{description} </p>
        <div className="row__rowContentBottom">
        <p className="row__bottom">Stars : {star}</p>
        <p className="row__bottom">Issues : {issues}</p>
         <p>Submitted {submittedDays} days ago by <strong>{loginName}</strong> </p>
        </div>
       
      </div>
    </div>
  );
}

export default RowRepos;
