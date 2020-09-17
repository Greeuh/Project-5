import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default class PostTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valueUser: '',
            visible: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitUser = this.handleSubmitUser.bind(this);
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('https://projet5ocr.antoineparriaud.fr/api/postTweet', {
            status: this.state.value
        })
            .then(response => {
                console.log(response);
                this.props.refreshT();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChangeUser = (event) => {
        this.setState({ valueUser: event.target.value });
    }

    handleSubmitUser(event) {
        event.preventDefault();

        axios.post('https://projet5ocr.antoineparriaud.fr/api/checkIfUserExist', {
            screen_name: this.state.valueUser
        })
            .then(response => {
                console.log(response);
                this.props.addUser(this.state.valueUser);
                this.setState({ valueUser: '' });
            })
            .catch(error => {
                console.log(error);
                this.setState({ visible: true })
            });
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>

                    <input
                        style={{ width: '200px' }}
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

                <br></br><br></br><br></br>

                <form onSubmit={this.handleSubmitUser}>

                    <input
                        style={{ width: '200px' }}
                        type="text"
                        name="usersearch"
                        rows="6"
                        cols="80"
                        maxLength="140"
                        placeholder="Search user without the @"
                        value={this.state.valueUser}
                        onChange={this.handleChangeUser}
                    />

                </form>
                <Alert variant='danger' show={this.state.visible} onClose={() => this.setState({ visible: false })} dismissible>
                    User not found.
                </Alert>

                <br></br><br></br><br></br>

                <Button 
                variant="dark" 
                size="lg" 
                onClick={this.props.logOut()}
                block
                >
                    Disconnect
                </Button>
            </>
        )
    }
} 