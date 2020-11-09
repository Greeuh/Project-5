import React from 'react';
import axios from 'axios';

export default class QueryUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            queryUserT: undefined,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    refreshThisTimeline = () => {
        axios.post('https://projet5ocr.antoineparriaud.fr/api/queryUserTimeline', {
            screen_name: this.state.value
        })
            .then(res => {
                this.setState({ queryUserT: res.data })
            })
            .catch(error => {
            })
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('https://projet5ocr.antoineparriaud.fr/api/queryUserTimeline', {
            screen_name: this.state.value
        })
            .then(res => {
                this.setState({ queryUserT: res.data })
            })
            .catch(error => {
            });
    }

    handlePostFav = param => event => {
        event.preventDefault();
        axios.post('https://projet5ocr.antoineparriaud.fr/api/postFavorite', {
            id: param,
        })
            .then(response => {
                this.refreshThisTimeline();
            })
            .catch(error => {
            });
    }

    handleDestroyFav = param => event => {
        event.preventDefault();
        axios.post('https://projet5ocr.antoineparriaud.fr/api/destroyFavorite', {
            id: param,
        })
            .then(response => {
                this.refreshThisTimeline();
            })
            .catch(error => {
            });
    }

    handlePostRetweet = param => event => {
        event.preventDefault();
        axios.post('https://projet5ocr.antoineparriaud.fr/api/postRetweet', {
            id: param,
        })
            .then(response => {
                this.props.refreshT();
            })
            .catch(error => {
                this.props.refreshT();
            });
    }

    handleDestroyTweet = param => event => {
        event.preventDefault();
        axios.post('https://projet5ocr.antoineparriaud.fr/api/destroyTweet', {
            id: param,
        })
            .then(response => {
                this.props.refreshT();
            })
            .catch(error => {
                this.props.refreshT();
            });
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>

                    <input
                        type="text"
                        name="usersearch"
                        rows="6"
                        cols="80"
                        maxLength="140"
                        placeholder="Search user without the @"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />

                </form>

                {this.state.queryUserT ?
                    <div className="timeline">
                        {
                            this.state.queryUserT.map(result =>
                                <div key={result.id_str} className="tw-block-parent">
                                    <div className="timeline-TweetList-tweet">
                                        <div className="timeline-Tweet">
                                            <div className="timeline-Tweet-brand">
                                                <div className="Icon Icon--twitter"></div>
                                            </div>
                                            <div className="timeline-Tweet-author">
                                                <div className="TweetAuthor"><a className="TweetAuthor-link" href={"?ID=" + result.user.id_str}> </a><span className="TweetAuthor-avatar">
                                                    <div className="Avatar"><img src={result.user.profile_image_url_https}></img> </div></span><span className="TweetAuthor-name">{result.user.name}</span>
                                                    {result.user.verified
                                                        && <span className="Icon Icon--verified"> </span>}
                                                    <span className="TweetAuthor-screenName">@{result.user.screen_name}</span></div>
                                            </div>
                                            <div className="timeline-Tweet-text" dangerouslySetInnerHTML={{ __html: result.full_text }} />
                                            <div className="timeline-Tweet-metadata"><a href={'https://twitter.com/' + result.user.screen_name + '/status/' + result.id_str}><span className="timeline-Tweet-timestamp">{result.created_at}</span></a></div>
                                            <ul className="timeline-Tweet-actions">
                                                <li className="timeline-Tweet-action"> {result.favorited
                                                    ? <a className="Icon Icon--hearted" onClick={this.handleDestroyFav(result.id_str)}></a>
                                                    : <a className="Icon Icon--heart" onClick={this.handlePostFav(result.id_str)}></a>
                                                }</li>
                                                <li className="timeline-Tweet-action"> {result.retweeted
                                                    ? <a className="Icon Icon--shared" onClick={this.handleDestroyTweet(result.id_str)}></a>
                                                    : <a className="Icon Icon--share" onClick={this.handlePostRetweet(result.id_str)}></a>
                                                }</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>)
                        }</div>
                    : <p>Enter the @ from an user and submit.</p>}

            </React.Fragment>)
    }
}