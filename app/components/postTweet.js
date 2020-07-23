import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class postTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        axios.post('https://projet5ocr.antoineparriaud.fr/api/postTweet')
            .then(res => {
                this.setState({ timeline: res.data })
            })

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
            <View>
                <form onSubmit={this.handleSubmit}>
                    <TextInput
                        multiline={true}
                        numberOfLines={6}
                        maxLength={280}
                        placeholder='Tweet something here !'
                        value={this.state.value}
                        onChangeText={(value) => this.setState({ value })}
                        onSubmitEditing={this.onSubmitEdit}

                    />


                    <Text>
                        Characters Left: {this.state.value.length}/280
                    </Text>
                </form>
            </View>
        )
    }
} 