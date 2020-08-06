import React, { Component } from 'react';
import axios from 'axios';
import PostTweet from '../components/PostTweet';
import HomeTimeline from '../components/HomeTimeline';
import UserTimeline from '../components/UserTimeline';
import TimelineColumn from '../components/TimelineColumn';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      homeT: undefined,
      userT: undefined,
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

    this.getUserTimeline();
    this.getHomeTimeline();

    setTimeout(
    this.timer = setInterval(() => {
      this.refreshTimeline();
    }, 10000), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getUserTimeline() {
    axios.get('https://projet5ocr.antoineparriaud.fr/api/userTimeline')
      .then(res => {
        this.setState({ userT: res.data })
      })
      .catch(error => {
        console.log(error);
      })
  }

  getHomeTimeline() {
    axios.get('https://projet5ocr.antoineparriaud.fr/api/homeTimeline')
      .then(res => {
        this.setState({ homeT: res.data })
      })
  }

  refreshTimeline() {
    this.getUserTimeline();
    console.log("C'est refresh!");
  }

  render() {

    return (
      <div className="App" id="main">

        <div id="main-Timeline">
          <TimelineColumn data={this.state.homeT} />
        </div>

        <div id="userowntweets">
          <TimelineColumn data={this.state.userT} />
        </div>

        <div id="postTweet">
          <PostTweet refreshT={this.refreshTimeline()} />
        </div>

      </div>
    );
  }
}


export default App;

