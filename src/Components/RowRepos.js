import React from "react";
import "./RowRepos.css";

function RowRepos({ name, description, star, issues, avatar,submittedDays,loginName}) {
  return (
    <div className="row">
      <img src={`${avatar}`} alt="avatar_img" />
      <div className="row__rowContent">
        <h1 className="row__rowContentName" >{name}</h1>
        <p className="row_rowContentDescription">{description} </p>
        <div className="row__rowContentBottom">
        <p className="row__bottom">	★ Star : {star}</p>
        <p className="row__bottom"> <b>Issues</b> : {issues}</p>
         <p>Submitted {submittedDays} days ago by <strong style={{color:'blue'}}>{loginName}</strong> </p>
        </div>
       
      </div>
    </div>
  );
}

export default RowRepos;
