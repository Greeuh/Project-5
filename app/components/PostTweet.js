import React from 'react';
import axios from 'axios';

export default class PostTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        axios.post('https://projet5ocr.antoineparriaud.fr/api/postTweet', {
            status: this.state.value
        })
            .then(function (response) {
                if (response === 413) {
                    alert('Your tweet is too long!');
                }
                if (response === 200) {
                    alert('Your tweet has been sent!');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <input
                    type="text"
                    name="tweetarea"
                    rows="6"
                    cols="30"
                    maxLength="280"
                    placeholder="Tweet something here !"
                    value={this.state.value}
                    onChange={this.handleChange}
                />


                <br></br>
                <text>
                    Characters Left: {this.state.value.length}/280
                    </text>

            </form>
        )
    }
} 