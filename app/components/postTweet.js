import React from 'react';
import axios from 'axios';

export default class PostTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
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