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
            <div className="wrap">
                <button className="button" onclick="location.href='https://projet5ocr.antoineparriaud.fr/twitter/login'" type="button">
                    Sign in with Twitter
                </button>
                <form>
                    <button className="button" formaction="https://projet5ocr.antoineparriaud.fr/twitter/login" type="button">
                        Sign in with Twitter
                    </button>
                </form>
            </div>
        </div>
    );
}