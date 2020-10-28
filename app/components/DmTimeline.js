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
            return <div className="timeline scrollbar-style"><h2 className="timeline-header">DM</h2><div className="text-center"><Button
                onClick={() => this.setState({ open: !open })}
                aria-controls="fade-dm-tl"
                aria-expanded={open}
            >
                Show your DM for the last 30 days
          </Button></div>
                <Fade in={this.state.open}><div id="fade-dm-tl">
                    {
                        this.props.data.map(result =>
                            <div key={result.id} className="tw-block-parent">
                                <div className="timeline-TweetList-tweet">
                                    <div className="timeline-Tweet">
                                        <div className="timeline-Tweet-brand">
                                            <div className="Icon Icon--twitter"></div>
                                        </div>
                                        <div className="timeline-Tweet-author">
                                            <div className="TweetAuthor"><a className="TweetAuthor-link" href={"?ID=" + result.message_create.sender_id.id_str}> </a><span className="TweetAuthor-avatar">
                                                <div className="Avatar"><img src={result.message_create.sender_id.profile_image_url_https}></img> </div></span><span className="TweetAuthor-name">{result.message_create.sender_id.name}</span>  <span className="Icon Icon--verified"> </span> <span className="TweetAuthor-screenName">@{result.message_create.sender_id.screen_name}</span></div>
                                        </div>
                                        <div className="timeline-Tweet-text" dangerouslySetInnerHTML={{ __html: result.message_create.message_data.text }} />
                                        <div className="timeline-Tweet-metadata"><span className="timeline-Tweet-timestamp">{result.created_timestamp}</span></div>
                                        <ul className="timeline-Tweet-actions">
                                            <li className="timeline-Tweet-action">
                                                <a className="Icon Icon--hearted"></a>
                                                <a className="Icon Icon--heart"></a>
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