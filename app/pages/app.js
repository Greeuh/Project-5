import React, { Component } from 'react';
import axios from 'axios';
import PostTweet from '../components/PostTweet';
import HomeTimeline from '../components/HomeTimeline';
import UserTimeline from '../components/UserTimeline';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
    };
  }

  componentDidMount() {

    const axiosConfig = {
      headers: {
        'content-Type': 'application/json',
        "Accept": "/",
        "Cache-Control": "no-cache",
        "Cookie": document.cookie
      },
      credentials: "same-origin"
    };
    axios.defaults.withCredentials = true;
  }

  render() {

    return (
      <div className="App" id="main">

        <div id="main-Timeline">
          
            <HomeTimeline />
        </div>

        <div id="userowntweets">
        
              <UserTimeline />
        </div>

        <div id="postTweet">
          <PostTweet />
        </div>

      </div>
    );
  }
}


export default App;

