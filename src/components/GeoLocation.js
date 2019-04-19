import React from 'react';
import { geolocated } from 'react-geolocated';

class GeoLocation extends React.Component {
  componentDidMount() {
    // console.log('geolocation props', this.props)
  }

  displayErrors({ isGeolocationAvailable, isGeolocationEnabled}) {
    if (!isGeolocationAvailable) {
      return <p>Your browser currently doesn't support GeoLocation</p>
    }
    if (!isGeolocationEnabled) {
      return <p>Your browser currently doesn't have GeoLocation enabled</p>
    }
  }

  render() {
    let { isGeolocationAvailable, isGeolocationEnabled, coords, children } = this.props;

    if(!isGeolocationEnabled || !isGeolocationAvailable) {
      return (
        <div>
          {this.displayErrors(this.props)}
          {children}
        </div>
      )
    }
    else if (coords) {
      if(Object.keys(coords).length === 0) {
        return children
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
  userDecisionTimeout: 5000,
})(GeoLocation)