import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import GeoLocation from './components/GeoLocation'
import UserInputLocation from './components/UserInputLocation';

class App extends Component {
  constructor(props){
    super(props)
  
    this.state = {
      userInputValue: '',
      coordsReturned: null,
      weatherReport: null
    }

    this.userInputSubmit = this.userInputSubmit.bind(this);
    this.handleUserInputValue = this.handleUserInputValue.bind(this)
    this.findWeatherForCoords = this.findWeatherForCoords.bind(this)
  }

  handleUserInputValue(event){
    this.setState({ userInputValue: event.target.value })
  }

  findWeatherForCoords(lat, long) {
    console.log('what is the request url', `https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_KEY}/${lat},${long}`)
    axios.get(`https://api.darksky.net/forecast/${process.env.REACT_APP_DARK_SKY_KEY}/${lat},${long}`, {
      params: {
        exclude: 'minutely,hourly,daily,flags'
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      console.log('what is the weather report returned', res)
    })
  }

  userInputSubmit(event) {
    event.preventDefault();

    fetch('/.netlify/functions/getLocation', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationQuery: this.state.userInputValue
      })
    }).then(res => res.json())
      .then(coords => {
        console.log('lambda response?', coords)
        this.setState({ coordsReturned: coords })
      })
      .catch(err => console.log('oops error', err))
  }

  render() {
    return (
      <div className="App">
        <p>something something something</p>

        <GeoLocation
          userInput={<UserInputLocation 
              userInputValue={this.state.userInputValue} 
              handleUserInputValue={this.handleUserInputValue}
              submitFn={this.userInputSubmit} />} 
        />

        {this.state.coordsReturned && <code>{JSON.stringify(this.state.coordsReturned)}</code>}
      </div>
    );
  }
}

export default App
