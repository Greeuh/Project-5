import React, { Component } from 'react';
import Twitter from 'twitter-lite';
import Link from 'next/link';


function Authorization({ name, accTkn, accTknSecret }) {

    localStorage.setItem("UserToken",accTkn);
    localStorage.setItem("UserTokenSecret",accTknSecret);

    return (
        <div>
            <h1>Page d'authentification</h1>
            <h2>Bienvenue {name}</h2>
            <Link href="/app">
            <p>Accéder à l'application</p>
            </Link>
        </div>
    )
}

export async function getServerSideProps({ query }) {

    const client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    });

    let name;
    let accTkn;
    let accTknSecret;

    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const oauthVerifier = urlParams.get('oauth_verifier');
    // const oauthToken = urlParams.get('oauth_token');
    const oauthVerifier = query.oauth_verifier
    const oauthToken = query.oauth_token

    await client
        .getAccessToken({
            oauth_verifier: oauthVerifier,
            oauth_token: oauthToken
        })
        .then(res => {
            console.log({
                accTkn: res.oauth_token,
                accTknSecret: res.oauth_token_secret,
                userId: res.user_id,
                screenName: res.screen_name
            })
            return name = res.screen_name, accTkn = res.oauth_token, accTknSecret = res.oauth_token_secret;
        })
        .catch(console.error);

    return { props: { name, accTkn, accTknSecret } };
}

export default Authorization;