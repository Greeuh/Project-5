import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login() {
    return (
        <div class="container">
            <div class="center">
                <a id="twitter-button" class="btn btn-block btn-social btn-twitter" href="https://projet5ocr.antoineparriaud.fr/twitter/login">
                <FontAwesomeIcon icon={faTwitter} /> Sign in with Twitter
                </a>
            </div>
        </div>
    );
}