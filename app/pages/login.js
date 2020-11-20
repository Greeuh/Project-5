import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login() {
    return (
        <div className="container">
            <div className="center">
                <a id="twitter-button" className="btn btn-block btn-social btn-twitter" href="https://projet5ocr.antoineparriaud.fr/twitter/login">
                    <FontAwesomeIcon icon={faTwitter} /> Sign in with Twitter
                </a>
            </div>
        </div>
    );
}