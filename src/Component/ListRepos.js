import React, { useState, useEffect } from "react";
import "./ListRepos.css";
import RowRepos from "./RowRepos";
import axios from "axios";

function ListRepos() {
  const [listRepo, setListRepo] = useState([]);
 const getDateBefore = days => {
    var today = new Date();
    today.setDate(today.getDate() - days);
    console.log(today);
    return today
      .toISOString()
      .substring(0, 10)
      .trim();
  };
  const dateBefore = getDateBefore(30);

  useEffect(() => {
    const getListRepo = async () => {
      const result = await axios.get(
        `https://api.github.com/search/repositories?q=created:>${dateBefore}&sort=stars&order=desc`
      );
      setListRepo(result.data.items);
    };
    getListRepo(); 
    
    
    // setListRepo(getListRepo());
    // console.log(abc);
  }, []);
  console.log(listRepo);
  return (
    <div className="container">
     
      {listRepo.map((repo) => (
         <a href={repo.html_url} target='_blank'>
         <RowRepos
          key={repo.id}
          name={repo.name}
          description={repo.description}
          star={repo.stargazers_count}
          issues={repo.open_issues_count}
          avatar={repo.owner.avatar_url}
          submittedDays={Math.floor((Date.parse(new Date())- Date.parse(repo.created_at))/ (24*60*60*1000))}
          loginName={repo.owner.login}
        />
         </a>
       
       
      ))}
    </div>
  );
}

export default ListRepos;
