import React from "react";
import "./ListRepos.css";
import RowRepos from "./RowRepos";
import InfiniteScroll from 'react-infinite-scroller';
import {ReactComponent as Load} from './../load.svg'


function ListRepo({listRepos,loadMore,hasMore}) {
  
  return (
    <div className="container" >
     
    <InfiniteScroll
          pageStart={0}
          loadMore={loadMore} 
          hasMore={hasMore}
          loader={ <div className="loader" key={0}><Load/></div> }

   > 
        {listRepos.map((repo) => (
         <a href={repo.html_url} >
         <RowRepos
          key={repo.id}
          name={repo.name}
          description={repo.description}
          star={repo.stargazers_count}
          issues={repo.open_issues_count}
          avatar={repo.owner.avatar_url}
          submittedDays={Math.floor((Date.parse(new Date())- Date.parse(repo.created_at))/ (24*60*60*1000))} //convert into number of days
          loginName={repo.owner.login}
        />
         </a>
      
      ))}
    </InfiniteScroll> 
     
    </div>
  );
}

export default ListRepo;
