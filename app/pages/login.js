import React, { Component } from 'react';
import Twitter from 'twitter-lite';

const client = new Twitter({
    consumer_key: "xyz",
    consumer_secret: "xyz"
  });
   
  client
    .getRequestToken("https://projet5ocr.antoineparriaud.fr:3000/authorization")
    .then(res =>
      console.log({
        reqTkn: res.oauth_token,
        reqTknSecret: res.oauth_token_secret
      })
    )
    .catch(console.error);