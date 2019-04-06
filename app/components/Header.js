import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';
import ReactSpeedometer from "react-d3-speedometer";

export default class Header extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  };

  handleSave = (text) => {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  };

  render() {
    return (
      <header style={{textAlign: 'center', padding: '48px'}}>
        {/* Dynamic Example */}
        <ReactSpeedometer value={900} height={180} />
        {/* Static Example */}
        {/* <img src={'https://i.imgur.com/lWUkFJX.png'} alt={'logo'} /> */}
        <h2>Sustainability Score</h2>
        <p>Make sustainable travel decisions, and the travel industry to take responsibility for sustainability.</p>
        <br />
        <p>Developed @<a href="https://www.berg-hansen.no/">Berg-Hansen</a> Hackathon</p>
      </header>
    );
  }
}
