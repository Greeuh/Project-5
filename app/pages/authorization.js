import React, { Component } from 'react';
import Twitter from 'twitter-lite';
import Link from 'next/link';
import { parseCookies, setCookie, destroyCookie } from 'nookies';


function Authorization({ UserInfos }) {

    if (typeof window !== 'undefined') {
        setCookie(null, 'UserToken', UserInfos.oauth_token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
        setCookie(null, 'UserTokenSecret', UserInfos.oauth_token_secret, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
        window.location.href = "https://projet5ocr.antoineparriaud.fr:3000/app";
    }

    return (
        <div>
            <h1>Page d'authentification</h1>
            <h2>Bienvenue {UserInfos.screen_name}</h2>
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

    let UserInfos;

    const oauthVerifier = query.oauth_verifier
    const oauthToken = query.oauth_token

    await client
        .getAccessToken({
            oauth_verifier: oauthVerifier,
            oauth_token: oauthToken
        })
        .then(res => {
            UserInfos = res;
            return UserInfos;
        })
        .catch(console.error);

    return { props: { UserInfos } };
}

export default Authorization;