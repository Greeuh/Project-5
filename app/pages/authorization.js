import React, { Component } from 'react';
import Twitter from 'twitter-lite';
import Link from 'next/link';


function Authorization({ res }) {

    if (typeof window !== 'undefined') {
        localStorage.setItem("UserToken", res.oauth_token);
        localStorage.setItem("UserTokenSecret", res.oauth_token_secret);
    }

    console.log(res);

    return (
        <div>
            <h1>Page d'authentification</h1>
            <h2>Bienvenue {res.screen_name}</h2>
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
            console.log(res);
            return res;
        })
        .catch(console.error);

    return { props: { res } };
}

export default Authorization;