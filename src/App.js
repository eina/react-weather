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

  componentDidMount(){
    console.log('wow super unsafe key testing', process.env.REACT_APP_OPENCAGE_KEY)
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
    console.log('submitted data', this.state.userInputValue)
    axios.get('https://api.opencagedata.com/geocode/v1/json?', {
      params: {
        key: encodeURIComponent(process.env.REACT_APP_OPENCAGE_KEY),
        q: encodeURIComponent('Vancouver, BC, Canada'),
        no_annotations: 1,
        pretty: 1
      }
    })
      .then(res => {
        const coords = res && res.data && res.data.results && res.data.results[0] && res.data.results[0].geometry ? res.data.results[0].geometry : null;
        console.log('what did you give me', res)
        this.setState({ dataReturned: coords })
        return coords;
      })
      .then(coords => {
        this.findWeatherForCoords(coords.lat, coords.lng)
      })
    event.preventDefault();
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

        {this.state.dataReturned && <code>{JSON.stringify(this.state.dataReturned)}</code>}
      </div>
    );
  }
}

export default App
