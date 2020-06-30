import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timeline: [],
      userowntweets: []
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

    axios.get('https://projet5ocr.antoineparriaud.fr/api/homeTimeline')
      .then(res => {
        this.setState({ timeline: res.data })
      })

    axios.get('https://projet5ocr.antoineparriaud.fr/api/userTimeline')
      .then(res => {
        this.setState({ userowntweets: res.data })
      })
  }

  render() {

    return (
      <div className="App" class="main">
        {this.state.timeline.map(result =>
          <div class="tw-block-parent">
            <div class="timeline-TweetList-tweet">
              <div class="timeline-Tweet">
                <div class="timeline-Tweet-brand">
                  <div class="Icon Icon--twitter"></div>
                </div>
                <div class="timeline-Tweet-author">
                  <div class="TweetAuthor"><a class="TweetAuthor-link" href={"?ID=" + result.user.id_str}> </a><span class="TweetAuthor-avatar">
                    <div class="Avatar"><img src={result.user.profile_image_url_https}></img> </div></span><span class="TweetAuthor-name">{result.user.name}</span>  <span class="Icon Icon--verified"> </span> <span class="TweetAuthor-screenName">@{result.user.screen_name}</span></div>
                </div>
                <div class="timeline-Tweet-text">{result.text}</div>
                <div class="timeline-Tweet-metadata"><a href={'https://twitter.com/' + result.user.screen_name + '/status/' + result.id_str}><span class="timeline-Tweet-timestamp">{result.created_at}</span></a></div>
                <ul class="timeline-Tweet-actions">
                  <li class="timeline-Tweet-action"><a class="Icon Icon--heart" href="#"></a></li>
                  <li class="timeline-Tweet-action"><a class="Icon Icon--share" href="#"></a></li>
                </ul>
              </div>
            </div>
          </div>)},
        {this.state.userowntweets.map(result =>
          <div class="tw-block-parent">
            <div class="timeline-TweetList-tweet">
              <div class="timeline-Tweet">
                <div class="timeline-Tweet-brand">
                  <div class="Icon Icon--twitter"></div>
                </div>
                <div class="timeline-Tweet-author">
                  <div class="TweetAuthor"><a class="TweetAuthor-link" href={"?ID=" + result.user.id_str}> </a><span class="TweetAuthor-avatar">
                    <div class="Avatar"><img src={result.user.profile_image_url_https}></img> </div></span><span class="TweetAuthor-name">{result.user.name}</span>  <span class="Icon Icon--verified"> </span> <span class="TweetAuthor-screenName">@{result.user.screen_name}</span></div>
                </div>
                <div class="timeline-Tweet-text">{result.text}</div>
                <div class="timeline-Tweet-metadata"><a href={'https://twitter.com/' + result.user.screen_name + '/status/' + result.id_str}><span class="timeline-Tweet-timestamp">{result.created_at}</span></a></div>
                <ul class="timeline-Tweet-actions">
                  <li class="timeline-Tweet-action"><a class="Icon Icon--heart" href="#"></a></li>
                  <li class="timeline-Tweet-action"><a class="Icon Icon--share" href="#"></a></li>
                </ul>
              </div>
            </div>
          </div>)}
      </div>
    );
  }
}


export default App;

