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
                    <a id="twitter-button" className="btn btn-block btn-social btn-twitter glow-on-hover" href="https://projet5ocr.antoineparriaud.fr/twitter/login">
                        <FontAwesomeIcon icon={faTwitter} /> Sign in with Twitter
                        </a>
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.832 268.832">
                            <path d="M265.17 125.577l-80-80c-4.88-4.88-12.796-4.88-17.677 0-4.882 4.882-4.882 12.796 0 17.678l58.66 58.66H12.5c-6.903 0-12.5 5.598-12.5 12.5 0 6.903 5.597 12.5 12.5 12.5h213.654l-58.66 58.662c-4.88 4.882-4.88 12.796 0 17.678 2.44 2.44 5.64 3.66 8.84 3.66s6.398-1.22 8.84-3.66l79.997-80c4.883-4.882 4.883-12.796 0-17.678z" />
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    );
}