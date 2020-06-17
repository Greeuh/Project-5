import React, { Component } from 'react';
import axios from 'axios';
import Twitter from 'twitter-lite';
import Link from 'next/link';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

function UserTweets({ results }) {

  const cookies = parseCookies();
  const twitterlink = "https://twitter.com/{result.name}/status/"

  if (cookies.UserToken !== 'undefined') {
    return (
      <div class="TweetsTimeline">
        {results.map(result =>
          <div class="tw-block-parent">
            <div class="timeline-TweetList-tweet">
              <div class="timeline-Tweet">
                <div class="timeline-Tweet-brand">
                  <div class="Icon Icon--twitter"></div>
                </div>
                <div class="timeline-Tweet-author">
                  <div class="TweetAuthor"><a class="TweetAuthor-link" href="#channel"> </a><span class="TweetAuthor-avatar">
                    <div class="Avatar"><img src={result.profile_image_url_https}></img> </div></span><span class="TweetAuthor-name">{result.user.name}</span>  <span class="Icon Icon--verified"> </span> <span class="TweetAuthor-screenName">{result.user.screen_name}</span></div>
                </div>
                <div class="timeline-Tweet-text">{result.text}</div>
                <div class="timeline-Tweet-metadata"><a href={twitterlink + result.id}><span class="timeline-Tweet-timestamp">{result.created_at}</span></a></div>
                <ul class="timeline-Tweet-actions">
                  <li class="timeline-Tweet-action"><a class="Icon Icon--heart" href="#"></a></li>
                  <li class="timeline-Tweet-action"><a class="Icon Icon--share" href="#"></a></li>
                </ul>
              </div>
            </div>
          </div>)}
      </div>
    )
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

  let results;

  await client
    .get("statuses/home_timeline", 50)
    .then(res => {
      results = res;
      return results;
    })

  return { props: { results } };
}



export default UserTweets;

