import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login() {
    return (
        <div className="container">
            <Head>
                <title>Project 5 : Tweetdeck - Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="center">
                <a id="twitter-button" className="btn btn-block btn-social btn-twitter" href="https://projet5ocr.antoineparriaud.fr/twitter/login">
                    <FontAwesomeIcon icon={faTwitter} /> Sign in with Twitter
                </a>
            </div>
        </div>
    );
}