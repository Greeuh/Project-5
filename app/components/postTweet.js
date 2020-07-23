import React from 'react';

export default class postTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        axios.post('https://projet5ocr.antoineparriaud.fr/api/postTweet', {
            status: this.state.value
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        alert('Your tweet has been sent!');
        event.preventDefault();
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <textarea name="tweetarea" rows="6" maxlength="280" placeholder="Tweet something here !" onChange={(value) => this.setState({ value })} value={this.state.value}>
                    </textarea>


                    <text>
                        Characters Left: {this.state.value.length}/280
                    </text>
                </form>
        )
    }
} 