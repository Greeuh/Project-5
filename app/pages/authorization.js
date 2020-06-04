import React, { Component } from 'react';
import Twitter from 'twitter-lite';

const client = new Twitter({
    consumer_key: "xyz",
    consumer_secret: "xyz"
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