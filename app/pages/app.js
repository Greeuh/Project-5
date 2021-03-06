import React, { Component } from 'react';
import axios from 'axios';
import PostTweet from '../components/PostTweet';
import TimelineColumn from '../components/TimelineColumn';
import DmTimeline from '../components/DmTimeline';
import QueryUser from '../components/QueryUser';
import Head from 'next/head';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      homeT: undefined,
      userLogT: undefined,
      mentionsT: undefined,
      directMessage: undefined,
      userIsLog: false,
      queriedUser: [],
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

    this.isUserLog();

    this.getUserTimeline();
    this.getHomeTimeline();
    this.getMentionsTimeline();
    this.getDM();

    this.timer = setInterval(() => {
      this.refreshTimeline();
    }, 75000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  disconnectUser = () => {
    axios.get('https://projet5ocr.antoineparriaud.fr/api/logOut')
      .then(res => {
        if (res.status === 200) {
          this.setState({ userIsLog: false });
          return window.location.replace("https://projet5ocr.antoineparriaud.fr:3000/login");
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  isUserLog = () => {
    axios.get('https://projet5ocr.antoineparriaud.fr/api/isUserLog')
      .then(res => {
        if (res.status === 202) {
          return window.location.replace("https://projet5ocr.antoineparriaud.fr:3000/login");
        } if (res.status === 201) {
          this.setState({ userIsLog: true })
        } else {
          this.setState({ userIsLog: true })
          if (res !== null) {
            this.setState({ queriedUser: res.data })
          }
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

  newUserQuery = (param) => {
    this.setState(prevState => ({
      queriedUser: [...prevState.queriedUser, param]
    }), () => {
      this.updateUserQuery();
    });
  }

  updateUserQuery = () => {
    axios.post('https://projet5ocr.antoineparriaud.fr/api/updateQueryUser', {
      users_queried: this.state.queriedUser
    })
      .then(response => {
      })
      .catch(error => {
        console.log(error);
      });
  }

  delUserQuery = (param) => {
    let queriedUserUpdated = this.state.queriedUser.filter(item => item !== param);
    this.setState({ queriedUser: queriedUserUpdated });
  }


  render() {
    if (this.state.userIsLog) {
      return (
        <div id="main">
          <Head>
            <title>Application Twitter</title>
            <meta property="og:title" content="Application Twitter" key="title" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="Application for Twitter" />
            <meta name="keywords" content="HTML, CSS, JavaScript, PHP" />
            <meta name="author" content="Antoine Parriaud" />
          </Head>
          <div id="content" className="scrollbar-style-x">
            <div id="board-container">
              <section id="board">

                <PostTweet refreshT={this.refreshTimeline} addUser={this.newUserQuery} logOut={this.disconnectUser} />

                <TimelineColumn data={this.state.homeT} refreshT={this.refreshTimeline} title='Home' />

                <TimelineColumn data={this.state.userLogT} refreshT={this.refreshTimeline} title='Own Tweets' ownedT='true' />

                <TimelineColumn data={this.state.mentionsT} refreshT={this.refreshTimeline} title='Mentions' />

                <DmTimeline data={this.state.directMessage} />

                {this.state.queriedUser.map(result =>
                  <QueryUser user={result} key={result} title={'@' + result} deleteCol={() => this.delUserQuery(result)} updateUserQuery={this.updateUserQuery} />
                )
                }

              </section>
            </div>
          </div>
        </div >
      );
    } else {
      return <p className="center">Checking if the user is authenticated...</p>
    }
  }
}


export default App;

