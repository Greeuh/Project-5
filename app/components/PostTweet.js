import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export default class PostTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valueUser: '',
            visible: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickLogOut = this.handleClickLogOut.bind(this);
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

    handleClickLogOut(event) {
        this.props.logOut();
    }

    render() {
        return (
            <>
                <div className="timeline">
                    <Form
                        onSubmit={this.handleSubmit}
                        style={{ width: 242 }}
                    >
                        <Form.Control
                            id="basic-url"
                            aria-describedby="tweet-something"
                            placeholder="Tweet something here !"
                            maxLength="280"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <Form.Text
                            id="tweet-something"
                            muted
                        >
                            Characters Left: {this.state.value.length}/280
                    </Form.Text>
                    </Form>

                    <br></br><br></br><br></br>

                    <Form
                        onSubmit={this.handleSubmitUser}
                        style={{ width: 242 }}
                    >
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="searchuser">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                placeholder="Search user"
                                aria-label="searchuser"
                                aria-describedby="searchuser"
                                value={this.state.valueUser}
                                onChange={this.handleChangeUser}
                            />
                        </InputGroup>
                    </Form>

                    <Alert variant='danger' show={this.state.visible} onClose={() => this.setState({ visible: false })} dismissible>
                        User not found.
                </Alert>

                    <br></br><br></br><br></br>

                    <Button
                        variant="dark"
                        size="lg"
                        onClick={this.handleClickLogOut}
                        block
                    >
                        Disconnect
                </Button>
                </div>
            </>
        )
    }
} 