import React, { Component } from "react";
import RowRepos from "./RowRepos";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./ListRepos.css";


class ListRepos extends Component {
  state = {
    repos: [],
    hasMore: true  
  };

 

  loadRepos = async (page) => {

    if(page===10){
        this.setState({hasMore:false});
        return;
    }
    const dateBefore = this.getDateBefore(30);
    axios.defaults.baseURL = "https://api.github.com";
    const res = await axios.get(
      "/search/repositories?q=created:>" + dateBefore + "&sort=stars&order=desc&page="+page
    );

    
    const pageRepos = res.data.items.map(repo => ({
      title: repo.name,
      description: repo.description,
      avatarUrl: repo.owner.avatar_url,
      nbStars: repo.stargazers_count,
      nbIssues: repo.open_issues_count,
      timeInterval: Math.floor(
        (Date.parse(new Date()) - Date.parse(repo.created_at)) /
          (24 * 60 * 60 * 1000)
      ),
      ownerName: repo.owner.login,
      repoUrl: repo.html_url  
    }));

    console.log(pageRepos);
    const {repos} = this.state;

    repos.push( ...pageRepos);    
    
    this.setState({ repos});
  };

  getDateBefore = days => {
    var today = new Date();
    today.setDate(today.getDate() - days);
    console.log(today);
    return today
      .toISOString()
      .substring(0, 10)
      .trim();
  };

  render() {
    const { repos,hasMore } = this.state;

    return (
      <div className="listRepos-container">
        <InfiniteScroll
        dataLength={30}
          pageStart={0}
          loadMore={this.loadRepos}
          hasMore={hasMore}
          loader={
            <div className="loader" key={0}>
                <img src="wait.gif" alt=''></img>
            </div>
          }
        >
          {repos.map((repo, index) => (
            <RowRepos
              key={index}
              title={repo.title}
              description={repo.description}
              avatarUrl={repo.avatarUrl}
              nbStars={repo.nbStars}
              nbIssues={repo.nbIssues}
              timeInterval={repo.timeInterval}
              ownerName={repo.ownerName}
              repoUrl={repo.repoUrl}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default ListRepos;
 