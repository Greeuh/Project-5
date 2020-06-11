import React, { Component } from 'react';
import axios from 'axios';
import Twitter from 'twitter-lite';
import Link from 'next/link';



class TweetsTimeline extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tweets: []
    };
  }


  componentDidMount() {
    if (localStorage.getItem("UserToken") != undefined) {
      let logged = 1;

      const client = new Twitter({
        subdomain: "api", // "api" is the default (change for other subdomains)
        version: "1.1", // version "1.1" is the default (change for other subdomains)
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: 313004648 - cbtxGYFWKtHnM07150vKxKLmul4Fz2jRlNYoWGQs,
        access_token_secret: OCyKFW6Br53SpnCdRi4MkgD0VxxUk14uGmQPDo5wJ6A9O

      });

      // client
      //   .get("account/verify_credentials")
      //   .then(results => {
      //     console.log("results", results);
      //   })
      //   .catch(console.error);

      client
        .get("statuses/home_timeline")
        .then(response => console.log(response))
        .then(response => {
          return response.json()
        })
        .then(result => {
          console.log(result)
          this.setState({ tweets: result })
          console.log(result[0].created_at)
        })
        .catch(console.error);

      return logged;
    } else {
      let logged = 0;

      return logged;
    }

    //   const user = new Twitter({
    //     consumer_key: process.env.TWITTER_CONSUMER_KEY,
    //     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    //   });

    //   user.getBearerToken().then(response => {
    //     const app = new Twitter({
    //       bearer_token: response.access_token
    //     });
    //   console.log(app.bearer_token)
    // })
  }

  render(logged) {
    if (logged == 1) {
      return (
        <div className="TweetsTimeline">
          {this.state.tweets.map(tweet =>
            <div class="tw-block-parent">
              <div class="timeline-TweetList-tweet">
                <div class="timeline-Tweet">
                  <div class="timeline-Tweet-brand">
                    <div class="Icon Icon--twitter"></div>
                  </div>
                  <div class="timeline-Tweet-author">
                    <div class="TweetAuthor"><a class="TweetAuthor-link" href="#channel"> </a><span class="TweetAuthor-avatar">
                      <div class="Avatar"> </div></span><span class="TweetAuthor-name">{tweet.user.screen_name}</span><span class="Icon Icon--verified"> </span><span class="TweetAuthor-screenName">@TwitterDev</span></div>
                  </div>
                  <div class="timeline-Tweet-text">We're excited for the inaugural Twitter Community Meetup<a href="#">@TwitterSeattle</a><span>tomorrow!</span><a href="#">#TapIntoTwitter</a><a href="#">meetup.com/Seattle-Twitte…</a></div>
                  <div class="timeline-Tweet-metadata"><span class="timeline-Tweet-timestamp">9h</span></div>
                  <ul class="timeline-Tweet-actions">
                    <li class="timeline-Tweet-action"><a class="Icon Icon--heart" href="#"></a></li>
                    <li class="timeline-Tweet-action"><a class="Icon Icon--share" href="#"></a></li>
                  </ul>
                </div>
              </div>
            </div>)}
        </div>
      );

    } else {
      return (
        <div>
          <Link href="/login">
            <h1>
              CONNECTEZ-VOUS AVEC TWITTER
            </h1>
          </Link>
        </div>
      );
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: []
    };
  }



  componentDidMount() {

    let token = localStorage.getItem('token');

    axios.post('http://localhost:8000/api/login',
      {
        email: 'ant@gmail.com',
        password: '123456'
      })
      .then(function (res) {
        localStorage.setItem('token', res.data.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://localhost:8000/api/products', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        this.setState({ products: res.data.data })
        console.log(res.data.data[0].id)
      })
  }

  render() {

    return (
      <div className="App">
        <ul>
          ils sont où les produits ?
       {this.state.products.filter(product => product.id < 10).map(product => <div>
          <p>{product.id}</p>
          <p>{product.name}</p>
        </div>)}
        </ul>
      </div>
    );
  }
}


export default TweetsTimeline;

