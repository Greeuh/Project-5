import React, { Component } from 'react';
import axios from 'axios';
import Twitter from 'twitter-lite';


const client = new Twitter({
  subdomain: "api", // "api" is the default (change for other subdomains)
  version: "1.1", // version "1.1" is the default (change for other subdomains)
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client
  .get("account/verify_credentials")
  .then(results => {
    console.log("results", results);
  })
  .catch(console.error);

client
  .get("statuses/home_timeline")
  .then(results => {
    console.log("results", results);
  })
  .catch(console.error);

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
      products: []
      };
  }



  componentDidMount() {

    let token = localStorage.getItem('token');

    axios.post('http://localhost:8000/api/login', 
    {
        email: 'ant@gmail.com',
        password: '123456'
    })
    .then(function (res) {
      localStorage.setItem('token', res.data.data.token);
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('http://localhost:8000/api/products',{
      headers: {
        'Authorization' : `Bearer ${token}`
    }})
      .then(res => {
        this.setState({ products: res.data.data })
        console.log(res.data.data[0].id)
      })
  }
  
  render() {
     
    return (
      <div className="App">
      <ul>
      ils sont où les produits ?
       {this.state.products.filter(product => product.id < 10).map(product => <div>
       <p>{product.id}</p>
       <p>{product.name}</p>
       </div>)}
      </ul>
      </div>
    );
  }
}



export default App;

