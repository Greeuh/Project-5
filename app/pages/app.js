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
      mentionsT: undefined,
      directMessage: undefined,
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
    this.getMentionsTimeline();
    this.getDM();

    this.timer = setInterval(() => {
      this.refreshTimeline();
    }, 50000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getUserTimeline = () => {
    axios.get('https://projet5ocr.antoineparriaud.fr/api/userTimeline')
      .then(res => {
        this.setState({ userT: res.data })
      })
      .catch(error => {
        console.log(error);
      })
  }

  getHomeTimeline = () => {
    axios.get('https://projet5ocr.antoineparriaud.fr/api/homeTimeline')
      .then(res => {
        this.setState({ homeT: res.data })
      })
  }

  getMentionsTimeline = () => {
    axios.get('https://projet5ocr.antoineparriaud.fr/api/mentionsTimeline')
      .then(res => {
        this.setState({ mentionsT: res.data })
      })
  }

  getDM = () => {
    axios.get('https://projet5ocr.antoineparriaud.fr/api/directMessage')
      .then(res => {
        this.setState({ directMessage: res.data })
      })
  }

  refreshTimeline = () => {
    this.getUserTimeline();
    this.getHomeTimeline();
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

        <div id="mentions-Timeline">
          <TimelineColumn data={this.state.mentionsT} />
        </div>

        {/* <div id="dm-Timeline">
          <TimelineColumn data={this.state.directMessage} />
        </div> 
        CREATE SPECIAL COLUMN FOR DM (see PostMan)*/}

        <div id="postTweet">
          <PostTweet refreshT={this.refreshTimeline} />
        </div>

      </div>
    );
  }
}


export default App;

