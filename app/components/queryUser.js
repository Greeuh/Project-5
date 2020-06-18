import React, { Component } from 'react';
import axios from 'axios';
import Twitter from 'twitter-lite';
import Link from 'next/link';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export function UserQueryTweets({ results }) {

    const cookies = parseCookies();

    if (cookies.UserToken !== 'null') {
        return (
            <div class="TweetsTimelineQueryUser">
                {results.map(result =>
                    <div class="tw-block-parent">
                        <div class="timeline-TweetList-tweet">
                            <div class="timeline-Tweet">
                                <div class="timeline-Tweet-brand">
                                    <div class="Icon Icon--twitter"></div>
                                </div>
                                <div class="timeline-Tweet-author">
                                    <div class="TweetAuthor"><a class="TweetAuthor-link" href="#channel"> </a><span class="TweetAuthor-avatar">
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


export async function getServerSideProps(ctx, ID) {

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
    let user_id;

    await client
        .get("account/verify_credentials")
        .then(result => {
            user_id = result.id_str;
            return user_id;
        })
        .catch(console.error);

    await client
        .get("statuses/user_timeline", {
            user_id: user_id,
            count: 50,
        })
        .then(res => {
            results = res;
            return results;
        })

    return { props: { results } };
}



export default UserQueryTweets;

