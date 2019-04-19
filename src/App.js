import React, { Component } from 'react';

import './App.css';
import GeoLocation from './components/GeoLocation'
import UserInputLocation from './components/UserInputLocation';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInputValue: '',
      coordsReturned: null,
      weatherReport: null
    }

    this.userInputSubmit = this.userInputSubmit.bind(this);
    this.handleUserInputValue = this.handleUserInputValue.bind(this)
  }

  handleUserInputValue(event) {
    this.setState({ userInputValue: event.target.value })
  }

  findWeather(coords) {
    console.log('hi coords', coords)
    if (coords.lat !== null && coords.lng !== null) {
      console.log('go fetch!')
      fetch('/.netlify/functions/getWeather', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          lat: coords.lat,
          lng: coords.lng
        })
      })
      .then(weather => {
        console.log('what is the weather response', weather)
      })

    }
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
        this.findWeather(coords)
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

        {this.state.coordsReturned && <p><code>{JSON.stringify(this.state.coordsReturned)}</code></p>}
        {this.state.weatherReport && <p><code>{JSON.stringify(this.state.weatherReport)}</code></p>}
      </div>
    );
  }
}

export default App
