import React, { Component } from 'react';
import Twitter from 'twitter-lite';

class Login extends Component {

    componentDidMount() {
        const client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
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
        window.location.replace("/authorization");
    }
}

export default Login;