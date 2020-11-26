import React,{useState} from 'react'
import ListRepos from './ListRepos';
import axios from "axios";




function ListReposContainer() {
    const [listRepo, setListRepo] = useState([]);
  const [hasMore,setHasMore]=useState(true);
 const getDateBefore = days => {
    var today = new Date();
    today.setDate(today.getDate() - days);
    console.log(today);
    return today
      .toISOString()
      .substring(0, 10)
      .trim();   // convert to YY-MM-DD
  };
  const dateMonthBefore = getDateBefore(30); // get days before 30days
  async function getListRepo (page) {
    if(page===15){
      setHasMore(false);
      alert('This is the end')
      return;
  }
    const result = await axios.get(
      `https://api.github.com/search/repositories?q=created:>${dateMonthBefore}&sort=stars&order=desc&page=${page}`
    );
    setListRepo((prevState)=>[...prevState,...result.data.items] );
  };
  
  console.log(listRepo);
    return (
        <div>
      
   <ListRepos listRepos={listRepo} loadMore={getListRepo} hasMore={hasMore}   /> 
        </div>
    )
}

export default ListReposContainer 
