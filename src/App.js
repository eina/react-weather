import React, { Component } from 'react';

import './App.css';
// import GeoLocation from './components/GeoLocation'
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
        body: JSON.stringify({...coords})
      })
        .then(weather => weather.json())
        .then(weatherReport => {
          console.log('what is the response', weatherReport)
          this.setState({ weatherReport })
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
      .then(coordsReturned => {
        console.log('lambda response?', coordsReturned)
        this.setState({ coordsReturned })
        return this.findWeather(coordsReturned)
      })
      .catch(err => console.log('oops error', err))
  }

  render() {
    return (
      <div className="App">
        <p>something something something</p>

        <UserInputLocation
          userInputValue={this.state.userInputValue}
          handleUserInputValue={this.handleUserInputValue}
          submitFn={this.userInputSubmit}
        />

        {/* <GeoLocation>
          <UserInputLocation
            userInputValue={this.state.userInputValue}
            handleUserInputValue={this.handleUserInputValue}
            submitFn={this.userInputSubmit} 
          />
        </GeoLocation> */}

        {this.state.coordsReturned && <p><code>{JSON.stringify(this.state.coordsReturned)}</code></p>}
        {this.state.weatherReport && <p><code>{JSON.stringify(this.state.weatherReport)}</code></p>}
      </div>
    );
  }
}

export default App
