import React, { Component } from 'react';
import axios from 'axios';
import Twitter from 'twitter-lite';
import Link from 'next/link';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import dynamic from 'next/dynamic';


const QueryUser = dynamic(
  () => import('../components/queryUser.js'));

function Dashboard({ results, userOwnTweets }) {

  const cookies = parseCookies();

  if (cookies.UserToken !== 'null') {
    return [
      <div class="TweetsTimeline">
        {results.map(result =>
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
      </div>,
      <div class="TweetsTimelineQueryUser">
      {userOwnTweets.map(result =>
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
    ]
  } else {
    return (
      <div>
        <Link href="/login">
          <a>
            CONNECTEZ-VOUS AVEC TWITTER
        </a>
        </Link>
      </div>
    );
  }
}

export async function getServerSideProps(ctx) {

  const cookies = parseCookies(ctx)

  const client = new Twitter({
    subdomain: "api", // "api" is the default (change for other subdomains)
    version: "1.1", // version "1.1" is the default (change for other subdomains)
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: cookies.UserToken,
    access_token_secret: cookies.UserTokenSecret
  });

  const response = await client.getBearerToken();
  const app = new Twitter({
    bearer_token: response.access_token
  });

  let results;
  let userOwnTweets;

  await client
    .get("statuses/home_timeline", {
      count: 50,
    })
    .then(res => {
      results = res;
      return results;
    })

  await client
    .get("statuses/user_timeline", {
      user_id: 1240656557815275520,
      count: 50,
    })
    .then(res => {
      results = res;
      return userOwnTweets;
    })

  return { props: { results, userOwnTweets } };
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


export default Dashboard;

