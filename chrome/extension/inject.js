import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import ReactSpeedometer from "react-d3-speedometer"

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <div>
        <button onClick={this.buttonOnClick}>
          Open TodoApp
        </button>
        <Dock
          position="right"
          dimMode="transparent"
          defaultSize={0.4}
          isVisible={this.state.isVisible}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            frameBorder={0}
            allowTransparency="true"
            src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
          />
        </Dock>
      </div>
    );
  }
}

let intervalValue;

const renderSustainabilityScore = async () => {

  let tripCards = document.getElementsByClassName('col-sm-2 sm-border-left-dashed price-per-traveller-container');
  
  // if not trip cards, return
  if (tripCards.length < 1) return;

  // clear the interval
  clearInterval(intervalValue);

  // render out the sustailability scores
  console.log('rendered!');

  var images = [
      "https://i.imgur.com/3TMbVmw.png",
      "https://i.imgur.com/lWUkFJX.png",
      "https://i.imgur.com/I6QnEa4.png"
  ];

  for (var item of tripCards) {

    // fetch sustainability score
    const CO2 = await fetchSustainabilityScore('sk1327', '2019', '04', '08', 'AES');
    console.log('co2: ', CO2);
          
    // calculate
    var calculatedSustainabilityScore = images[(Math.floor(Math.random() * (+3 - +0)) + +0)];

    // create placeholder image
    var x = document.createElement("IMG");
    x.setAttribute("src", `${calculatedSustainabilityScore}`);
    x.setAttribute("width", "120");
    x.setAttribute("height", "80");
    x.setAttribute("style", "transform: translate(10px, -60px)");
    x.setAttribute("alt", "The Pulpit Rock");

    item.appendChild(x);
  }

  // const injectDOM = document.createElement('div');
  // injectDOM.className = 'inject-react-example';
  // injectDOM.style.textAlign = 'center';
  // .appendChild(injectDOM);

  // appendChild

  // render(<InjectApp />, injectDOM);
}

window.addEventListener('load', () => {
  // listen until we see results showing up
  intervalValue = setInterval(renderSustainabilityScore, 1000);
});

const fetchSustainabilityScore = (flight, year, month, day, airport) => {
  return fetch(`https://travl.no/hackathon/travl-api_ny.php?flight=${flight}&y=${year}&m=${month}&d=${day}&airport=${airport}`)
      .then((data) => data.json())
      .then(content => content.decisions.carbon.description);
}
