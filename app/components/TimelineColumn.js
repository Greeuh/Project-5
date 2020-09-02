import React from 'react';
import axios from 'axios';

export default class TimelineColumn extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePostFav = param => event => {
        event.preventDefault();
        console.log(param);
        axios.post('https://projet5ocr.antoineparriaud.fr/api/postFavorite', {
            id: param,
        })
            .then(response => {
                console.log(response);
                this.props.refreshT();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleDestroyFav = param => event =>  {
        event.preventDefault();
        console.log(param);
        axios.post('https://projet5ocr.antoineparriaud.fr/api/destroyFavorite', {
            id: param,
        })
            .then(response => {
                console.log(response);
                this.props.refreshT();
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
                this.props.refreshT();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        if (this.props.data) {
            return <div>
                {
                    this.props.data.map(result =>
                        <div class="tw-block-parent">
                            <div class="timeline-TweetList-tweet">
                                <div class="timeline-Tweet">
                                    <div class="timeline-Tweet-brand">
                                        <div class="Icon Icon--twitter"></div>
                                    </div>
                                    <div class="timeline-Tweet-author">
                                        <div class="TweetAuthor"><a class="TweetAuthor-link" href={"?ID=" + result.user.id_str}> </a><span class="TweetAuthor-avatar">
                                            <div class="Avatar"><img src={result.user.profile_image_url_https}></img> </div></span><span class="TweetAuthor-name">{result.user.name}</span>  <span class="Icon Icon--verified"> </span> <span class="TweetAuthor-screenName">@{result.user.screen_name}</span></div>
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
                }</div>;
        }else{
            return <p>to be load</p>
        }
    }
}