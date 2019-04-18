import React, { Component } from 'react';

class UserInputLocation extends Component {
  render() {
    const { submitFn, handleUserInputValue, userInputValue } = this.props;

    return (
      <form onSubmit={submitFn}>
        <label>
          <span>Enter a location</span>
          <input type="text" value={userInputValue} onChange={handleUserInputValue}/>
        </label>

        <button type="submit">Search</button>
      </form>
    )
  }

}
export default UserInputLocation;