import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';

export default class DmTimeline extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
        };
    }

    render() {
        const { open } = this.state;
        if (this.props.data) {
            return <div class="timeline"><h2 className="timeline-header">DM</h2><div className="text-center"><Button
                onClick={() => this.setState({ open: !open })}
                aria-controls="fade-dm-tl"
                aria-expanded={open}
            >
                Show your DM for the last 30 days
          </Button></div>
                <Fade in={this.state.open}><div id="fade-dm-tl">
                    {
                        this.props.data.map(result =>
                            <div class="tw-block-parent">
                                <div class="timeline-TweetList-tweet">
                                    <div class="timeline-Tweet">
                                        <div class="timeline-Tweet-brand">
                                            <div class="Icon Icon--twitter"></div>
                                        </div>
                                        <div class="timeline-Tweet-author">
                                            <div class="TweetAuthor"><a class="TweetAuthor-link" href={"?ID=" + result.message_create.sender_id.id_str}> </a><span class="TweetAuthor-avatar">
                                                <div class="Avatar"><img src={result.message_create.sender_id.profile_image_url_https}></img> </div></span><span class="TweetAuthor-name">{result.message_create.sender_id.name}</span>  <span class="Icon Icon--verified"> </span> <span class="TweetAuthor-screenName">@{result.message_create.sender_id.screen_name}</span></div>
                                        </div>
                                        <div class="timeline-Tweet-text" dangerouslySetInnerHTML={{ __html: result.message_create.message_data.text }} />
                                        <div class="timeline-Tweet-metadata"><span class="timeline-Tweet-timestamp">{result.created_timestamp}</span></div>
                                        <ul class="timeline-Tweet-actions">
                                            <li class="timeline-Tweet-action">
                                                <a class="Icon Icon--hearted"></a>
                                                <a class="Icon Icon--heart"></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>)
                    }</div></Fade>
            </div>
        } else {
            return <p>to be load</p>
        }
    }
}