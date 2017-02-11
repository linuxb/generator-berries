import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: 'welcome to my App'};
  }

  render() {
    return (
      <div className="container">
        {this.state.data}
      </div>
    );
  }
}
