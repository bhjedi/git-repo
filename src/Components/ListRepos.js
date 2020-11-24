import React, { useState ,useEffect} from "react";
import "./ListRepos.css";
import RowRepos from "./RowRepos";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import {ReactComponent as Load} from './../load.svg'


function ListRepo() {
  const [listRepo, setListRepo] = useState([]);
  const [hasMore,setHasMore]=useState(true)
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
  async function getListRepo  (page) {
    if(page===10){
      setHasMore(false);
      return;
  }
    const result = await axios.get(
      `https://api.github.com/search/repositories?q=created:>${dateBefore}&sort=stars&order=desc&page=${page}`
    );
    setListRepo((prevState)=>[...prevState,...result.data.items] );
  };
  
 
 
  console.log(listRepo);
  return (
    <div className="container" >
     
      <InfiniteScroll
          pageStart={0}
          loadMore={getListRepo}
          hasMore={hasMore}
          loader={
       <div className="loader" key={0}><Load/></div>          }
        > 
{listRepo.map((repo) => (
         <a href={repo.html_url} >
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
     </InfiniteScroll> 
     

      
    
      
    </div>
  );
}

export default ListRepo;
