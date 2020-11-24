import React from 'react';
import axios from 'axios';

export default class TimelineColumn extends React.Component {
    constructor(props) {
        super(props);
    }

    handlePostFav = param => event => {
        event.preventDefault();
        axios.post('https://projet5ocr.antoineparriaud.fr/api/postFavorite', {
            id: param,
        })
            .then(response => {
                this.props.refreshT();
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
                this.props.refreshT();
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
        if (this.props.data) {
            return <div className="timeline scrollbar-style">
                <h2 className="timeline-header">{this.props.title}</h2>
                {
                    this.props.data.map(result =>
                        <div key={result.id_str} className="tw-block-parent">
                            {result.retweeted_status
                                ? <div className="timeline-TweetList-tweet">
                                    <div className="timeline-Tweet">
                                        <div className="timeline-Tweet-brand">
                                            <div className="Icon Icon--twitter"></div>
                                        </div>
                                        <div className="rt-User-Info">
                                            <div><span className="TweetAuthor-name">{result.user.name} </span>retweeted :</div>
                                        </div>
                                        <div className="timeline-Tweet-author">
                                            <div className="TweetAuthor"><a className="TweetAuthor-link" href={"?ID=" + result.retweeted_status.user.id_str}> </a><span className="TweetAuthor-avatar">
                                                <div className="Avatar"><img src={result.retweeted_status.user.profile_image_url_https}></img> </div></span><span className="TweetAuthor-name">{result.retweeted_status.user.name}</span>
                                                {result.retweeted_status.user.verified
                                                    ? <span className="Icon Icon--verified"> </span>
                                                    : ''}
                                                <span className="TweetAuthor-screenName">@{result.retweeted_status.user.screen_name} </span></div>
                                        </div>
                                        <div className="timeline-Tweet-text" dangerouslySetInnerHTML={{ __html: result.retweeted_status.full_text }} />
                                        {result.retweeted_status.extended_entities?.media
                                            ? <div className="timeline-Tweet-media timeline-media">
                                                {result.retweeted_status.extended_entities.media[0].type != 'video'
                                                    ? <a href={result.retweeted_status.extended_entities.media[0].media_url_https} target="_blank"><img src={result.retweeted_status.extended_entities.media[0].media_url_https} alt=""></img></a>
                                                    : <video controls>                                                        
                                                        <source src={result.retweeted_status.extended_entities.media[0]?.video_info?.variants[0]?.bitrate
                                                        ? result.retweeted_status.extended_entities.media[0]?.video_info?.variants[0]?.url
                                                        : result.retweeted_status.extended_entities.media[0]?.video_info?.variants[1]?.url} type="video/mp4"></source>
                                                    </video>}
                                            </div>
                                            : ''
                                        }
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
                                : <div className="timeline-TweetList-tweet">
                                    <div className="timeline-Tweet">
                                        <div className="timeline-Tweet-brand">
                                            <div className="Icon Icon--twitter"></div>
                                        </div>
                                        <div className="timeline-Tweet-author">
                                            <div className="TweetAuthor"><a className="TweetAuthor-link" href={"?ID=" + result.user.id_str}> </a><span className="TweetAuthor-avatar">
                                                <div className="Avatar"><img src={result.user.profile_image_url_https}></img> </div></span><span className="TweetAuthor-name">{result.user.name}</span>
                                                {result.user.verified
                                                    ? <span className="Icon Icon--verified"> </span>
                                                    : ''}
                                                <span className="TweetAuthor-screenName">@{result.user.screen_name}</span></div>
                                        </div>
                                        <div className="timeline-Tweet-text" dangerouslySetInnerHTML={{ __html: result.full_text }} />
                                        {result.extended_entities?.media
                                            ? <div className="timeline-Tweet-media timeline-media">
                                                {result.extended_entities.media[0].type != 'video'
                                                    ? <a href={result.extended_entities.media[0].media_url_https} target="_blank"><img src={result.extended_entities.media[0].media_url_https} alt=""></img></a>
                                                    : <video controls>
                                                        <source src={result.extended_entities.media[0]?.video_info?.variants[0]?.bitrate
                                                        ? result.extended_entities.media[0]?.video_info?.variants[0]?.url
                                                        : result.extended_entities.media[0]?.video_info?.variants[1]?.url} type="video/mp4"></source>
                                                    </video>}
                                            </div>
                                            : ''
                                        }
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
                                            {this.props.ownedT
                                                ? <li className="timeline-Tweet-action">
                                                    <a className="Icon Icon--delete" onClick={this.handleDestroyTweet(result.id_str)}></a>
                                                </li>
                                                : ''
                                            }
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>)
                }</div>;
        } else {
            return <p>to be load</p>
        }
    }
}