import React from 'react';
import { geolocated } from 'react-geolocated';

class GeoLocation extends React.Component {
  componentDidMount() {
    // console.log('geolocation props', this.props)
  }

  render() {
    let { isGeolocationAvailable, isGeolocationEnabled, coords, userInput } = this.props;

    if (!isGeolocationAvailable) {
      return (
        <div>
          <p>browser doesn't support geolocation</p>
          {userInput}
        </div>
      )
    } 
    else if (!isGeolocationEnabled) {
      return (
        <div>
          <p>geolocation is not enabled</p>
          {userInput}
        </div>
      )
    }
    else if (coords) {
      if(Object.keys(coords).length === 0) {
        return userInput
      }
      return <code>{JSON.stringify(coords, null, 2)}</code>
    }
    else {
      return <p>testing geolocation</p>
    }
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  // userDecisionTimeout: 5000,
})(GeoLocation)