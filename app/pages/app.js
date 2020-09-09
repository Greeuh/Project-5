import React, { Component } from 'react';
import axios from 'axios';
import PostTweet from '../components/PostTweet';
import TimelineColumn from '../components/TimelineColumn';
import DmTimeline from '../components/DmTimeline';
import QueryUser from '../components/QueryUser';
import IsUserLog from '../components/IsUserLog';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      homeT: undefined,
      userLogT: undefined,
      mentionsT: undefined,
      directMessage: undefined,
    };
  }

  componentDidMount() {
    const cookies = parseCookies();

    if (cookies.user_id === 'undefined') {
      return window.location.replace("https://projet5ocr.antoineparriaud.fr:3000/login");
    } else {

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
      }, 75000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  disconnectUser = () => {

  }

  getUserTimeline = () => {
    axios.get('https://projet5ocr.antoineparriaud.fr/api/userLogTimeline')
      .then(res => {
        this.setState({ userLogT: res.data })
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
        this.setState({ directMessage: res.data.events })
      })
  }

  refreshTimeline = () => {
    this.getUserTimeline();
    this.getHomeTimeline();
    this.getMentionsTimeline();
  }

  render() {

    return (
      <div className="App" id="main">

        <div id="main-Timeline">
          <TimelineColumn data={this.state.homeT} refreshT={this.refreshTimeline} />
        </div>

        <div id="userowntweets">
          <TimelineColumn data={this.state.userLogT} refreshT={this.refreshTimeline} />
        </div>

        <div id="mentions-Timeline">
          <TimelineColumn data={this.state.mentionsT} refreshT={this.refreshTimeline} />
        </div>

        <div id="dm-Timeline">
          <DmTimeline data={this.state.directMessage} />
        </div>

        <div id="queryuser-Timeline">
          <QueryUser />
        </div>

        <div id="postTweet">
          <PostTweet refreshT={this.refreshTimeline} />
        </div>

      </div>
    );
  }
}


export default App;

