import React, { Component } from 'react';
import axios from 'axios';
import PostTweet from '../components/PostTweet';
import TimelineColumn from '../components/TimelineColumn';
import DmTimeline from '../components/DmTimeline';
import QueryUser from '../components/QueryUser';
import IsUserLog from '../components/IsUserLog';
import Cookies from 'js-cookie';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      homeT: undefined,
      userLogT: undefined,
      mentionsT: undefined,
      directMessage: undefined,
      userIsLog: false,
      queriedUser: ['laravelphp'],
    };
  }

  componentDidMount() {
    // console.log(Cookies.get());
    // console.log(Cookies.get(user_id));

    // if (!Cookies.get('user_id')) {
    //   return window.location.replace("https://projet5ocr.antoineparriaud.fr:3000/login");
    // } else {

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

    this.isUserLog();

    this.getUserTimeline();
    this.getHomeTimeline();
    this.getMentionsTimeline();
    this.getDM();

    this.timer = setInterval(() => {
      this.refreshTimeline();
    }, 75000);
    // }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  disconnectUser = () => {

  }

  isUserLog = () => {
    axios.get('https://projet5ocr.antoineparriaud.fr/api/isUserLog')
      .then(res => {
        if (res.status === 202) {
          return window.location.replace("https://projet5ocr.antoineparriaud.fr:3000/login");
        } else {
          this.setState({ userIsLog: true })
        }
      })
      .catch(error => {
        console.log(error);
      })
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

    if (this.state.userIsLog) {
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

          <div id="postTweet">
            <PostTweet refreshT={this.refreshTimeline} />
          </div>

          {this.state.queriedUser.map(result =>
            <div id="queryuser-Timeline">
              <QueryUser user={result} />
            </div>)
          }


        </div>
      );
    } else {
      return <p>Vérification si l'utilisateur est authentifié...</p>
    }
  }
}


export default App;

