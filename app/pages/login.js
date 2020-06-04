import React, { Component } from 'react';
import Twitter from 'twitter-lite';

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          token: []
        };
      }

     componentDidMount() {
        const client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        });

        client
            .getRequestToken("https://projet5ocr.antoineparriaud.fr:3000/authorization")
            .then(res => {
                this.setState({ token: res.oauth_token })
                document.getElementById("link").href="https://api.twitter.com/oauth/authorize?" + res.oauth_token; 
                console.log({
                    reqTkn: res.oauth_token,
                    reqTknSecret: res.oauth_token_secret
                })
                // window.location.replace("https://api.twitter.com/oauth/authorize?" + res.oauth_token);
            })
            .catch(console.error);
     }

    render() {
        return(
        <div>
            <h1>Vous allez être redirigé sur le site de Twitter...</h1>
            <a href='' id="link" >Ou cliquez là </a>
            <p>Ceci est le token : {this.state.token} .</p>
        </div>);
    }
}

export default Login;