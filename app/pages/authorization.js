import React, { Component } from 'react';
import Twitter from 'twitter-lite';


class Authorization extends Component {

    componentDidMount (){
    const client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    });

    client
        .getAccessToken({
            oauth_verifier: oauthVerifier,
            oauth_token: oauthToken
        })
        .then(res =>
            console.log({
                accTkn: res.oauth_token,
                accTknSecret: res.oauth_token_secret,
                userId: res.user_id,
                screenName: res.screen_name
            })
        )
        .catch(console.error);
    }
    
}

export default Authorization;