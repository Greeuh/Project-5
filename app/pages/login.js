import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from 'next/head';

export default function Login() {
    return (
        <div className="container">
            <Head>
                <meta charset="UTF-8" />
                <title>Login : Application Twitter</title>
                <meta property="og:title" content="Application Twitter" key="title" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Application for Twitter" />
                <meta name="keywords" content="HTML, CSS, JavaScript, PHP" />
                <meta name="author" content="Antoine Parriaud" />
            </Head>
            <div className="center">
                <a id="twitter-button" className="btn btn-block btn-social btn-twitter glow-on-hover" href="https://projet5ocr.antoineparriaud.fr/twitter/login">
                    <FontAwesomeIcon icon={faTwitter} /> Sign in with Twitter
                </a>
            </div>
            <div class="wrapper">
                <div class="link_wrapper">
                    <a href="#">Hover Me!</a>
                    <div class="icon">
                        <a id="twitter-button" className="btn btn-block btn-social btn-twitter glow-on-hover" href="https://projet5ocr.antoineparriaud.fr/twitter/login">
                            <FontAwesomeIcon icon={faTwitter} /> Sign in with Twitter
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}