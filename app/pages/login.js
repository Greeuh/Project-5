import Head from 'next/head';

export default function Login() {
    return (
        <div>
            <Head>
                <title>Login : Application Twitter</title>
                <meta property="og:title" content="Application Twitter" key="title" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Application for Twitter" />
                <meta name="keywords" content="HTML, CSS, JavaScript, PHP" />
                <meta name="author" content="Antoine Parriaud" />
            </Head>

            <div className="wrap">
                <form method="get" action="https://projet5ocr.antoineparriaud.fr/twitter/login" className="wrap">
                    <button type="submit" className="button">Sign in with Twitter</button>
                </form>
            </div>
        </div>
    );
}