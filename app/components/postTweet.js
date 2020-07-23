import React from 'react';

export default class PostTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
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

                <textarea 
                name="tweetarea" 
                rows={6} 
                col={30} 
                maxLength={280} 
                placeholder="Tweet something here !" 
                onChange={(event) => this.handleChange(event)}
                >
                    
                </textarea>
                <br></br>
                <text>
                    Characters Left: {this.state.value.length}/280
                    </text>

            </form>
        )
    }
} 