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
                console.log(error);
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
                console.log(error);
            });
    }

    handlePostFav = param => event => {
        event.preventDefault();
        console.log(param);
        axios.post('https://projet5ocr.antoineparriaud.fr/api/postFavorite', {
            id: param,
        })
            .then(response => {
                console.log(response);
                this.refreshThisTimeline();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleDestroyFav = param => event => {
        event.preventDefault();
        console.log(param);
        axios.post('https://projet5ocr.antoineparriaud.fr/api/destroyFavorite', {
            id: param,
        })
            .then(response => {
                console.log(response);
                this.refreshThisTimeline();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handlePostRetweet = param => event => {
        event.preventDefault();
        console.log(param);
        axios.post('https://projet5ocr.antoineparriaud.fr/api/postRetweet', {
            id: param,
        })
            .then(response => {
                console.log(response);
                this.refreshThisTimeline();
            })
            .catch(error => {
                console.log(error);
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
                    <div class="timeline">
                        {
                            this.state.queryUserT.map(result =>
                                <div class="tw-block-parent">
                                    <div class="timeline-TweetList-tweet">
                                        <div class="timeline-Tweet">
                                            <div class="timeline-Tweet-brand">
                                                <div class="Icon Icon--twitter"></div>
                                            </div>
                                            <div class="timeline-Tweet-author">
                                                <div class="TweetAuthor"><a class="TweetAuthor-link" href={"?ID=" + result.user.id_str}> </a><span class="TweetAuthor-avatar">
                                                    <div class="Avatar"><img src={result.user.profile_image_url_https}></img> </div></span><span class="TweetAuthor-name">{result.user.name}</span>
                                                    {result.user.verified
                                                        && <span class="Icon Icon--verified"> </span>}
                                                    <span class="TweetAuthor-screenName">@{result.user.screen_name}</span></div>
                                            </div>
                                            <div class="timeline-Tweet-text" dangerouslySetInnerHTML={{ __html: result.full_text }} />
                                            <div class="timeline-Tweet-metadata"><a href={'https://twitter.com/' + result.user.screen_name + '/status/' + result.id_str}><span class="timeline-Tweet-timestamp">{result.created_at}</span></a></div>
                                            <ul class="timeline-Tweet-actions">
                                                <li class="timeline-Tweet-action"> {result.favorited
                                                    ? <a class="Icon Icon--hearted" onClick={this.handleDestroyFav(result.id_str)}></a>
                                                    : <a class="Icon Icon--heart" onClick={this.handlePostFav(result.id_str)}></a>
                                                }</li>
                                                <li class="timeline-Tweet-action"> {result.retweeted
                                                    ? <a class="Icon Icon--shared" href="#"></a>
                                                    : <a class="Icon Icon--share" onClick={this.handlePostRetweet(result.id_str)}></a>
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