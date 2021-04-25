import React, { Component } from "react";
import './App.css';

//added blue as default text color
let defaultStyle = {
  color: "blue",
};

//set fake server data to simulize a data source
let fakeServerData = {
  user: {
    name: "Jasmin",
    playlists: [
      {
        name: "Sternenschweif",
        episodes: "12",
        songs: [
                {name: "Title1", duration: 210},
                {name: "Title2", duration: 270},
                {name: "Title3", duration: 180},
                {name: "Title4", duration: 210}
              ]
      },
      {
        name: "Emmi von Candis",
        episodes: "11",
        songs: [
                {name: "Title1", duration: 150},
                {name: "Title2", duration: 230},
                {name: "Title3", duration: 180},
                {name: "Title4", duration: 210}
              ]
      },
      {
        name: "My Little Pony",
        episodes: "7",
        songs: [
                {name: "Title1", duration: 66},
                {name: "Title2", duration: 540},
                {name: "Title3", duration: 180},
                {name: "Title4", duration: 210}
              ]
      },
      {
        name: "Paw Patrol",
        episodes: "22",
        songs: [
                {name: "Title1", duration: 123},
                {name: "Title2", duration: 268},
                {name: "Title3", duration: 180},
                {name: "Title4", duration: 210}
              ]
      }
      
    ]
  }
};

//Counter of how much playlists are within the fakeServerData
class PlaylistCounter extends Component {
  render () {
    return (
      <div style={{...defaultStyle, display: "inline-block", padding: "10px"}}>
            <h2>{this.props.playlists 
                  && this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}
//Counter of minutes of all playlists
class MinutesCounter extends Component {
  render () {
    let totalDuration = 100 
    return (
      <div style={{...defaultStyle, display: "inline-block", padding: "10px"}}>
            <h2>{Math.round(totalDuration/60)} minutes</h2>
      </div>
    );
  }
}
class Filter extends Component {
  render (){
  return(
    <div>
      <img/>
      <input type="text" style={{margin:"10px"}} 
        onKeyUp={event => this.props.onTextChange(event.target.value)}/>
      Filter
    </div>
  );
}}

//Playlist
class Playlists extends Component {
  render (){
  return(
    <div style={{...defaultStyle, width: "20%", display: "inline-block"}}>
      <img/>
      <h3>playlist name</h3>
      <ul>
        <li>song1</li>
        <li>song2</li>
        <li>song3</li>
        </ul>
    </div>
  )
  }
}


class App extends Component {
  render() {
  return (
    <div className="App" style={{...defaultStyle}}>
        <h1>Title</h1>
        <PlaylistCounter/>
        <MinutesCounter/>
        <Filter/>
        <Playlists/>
        <Playlists/>
        <Playlists/>
        <Playlists/>
    </div>
  );
}
}

export default App;
