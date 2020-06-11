import React, { Component } from 'react';
import Twitter from 'twitter-lite';


function Login({token}) {

        let url = 'https://api.twitter.com/oauth/authorize?oauth_token=' + token;

        return (
            <div>
                <h1>Vous allez être redirigé sur le site de Twitter...</h1>
                <a href={url} id="link" >Ou cliquez là </a>
                <script>window.location.href = {url}</script>
            </div>);
}

export async function getServerSideProps() {

    const client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    });

    let token;

    await client
        .getRequestToken("https://projet5ocr.antoineparriaud.fr:3000/authorization")
        .then(res => {
            console.log({
                reqTkn: res.oauth_token,
                reqTknSecret: res.oauth_token_secret
            })

            return token = res.oauth_token;
        })
    return { props: { token } };
}

export default Login;