import React, { Component } from "react";
import './App.css';

//added blue as default text color
let defaultStyle = {
  color: "blue",
};

//set fake server data to simulize a data source
let fakeServerData = {
  user: {
    name: "JasBox",
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
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) =>  {
      return songs.concat(eachPlaylist.songs)
  }, [])

    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    },0)
  
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
class Playlist extends Component {
  render (){
    let playlist = this.props.playlist
  return(
    <div style={{...defaultStyle, width: "20%", display: "inline-block"}}>
      <img/>
      <h3>{playlist.name}</h3>
      <ul>
        {playlist.songs.map(song =>
          <li>{song.name}</li>
          )}
        
        </ul>
    </div>
  )
  }
}


class App extends Component {
  constructor(){
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
    this.setState({serverData: fakeServerData});
    }, 500);
  }
  render() {
  return (
    <div className="App" style={{...defaultStyle}}>
            {this.state.serverData.user ?
      <div> 
        <h1>         
            {this.state.serverData.user.name}
          </h1>
        
        <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
        
        <MinutesCounter playlists={this.state.serverData.user.playlists}/>

        <Filter/>

        {
          this.state.serverData.user.playlists.map(playlist => 
            <Playlist playlist= {playlist}/>
          
            )}

        

      </div> : <h1>Loading</h1>}
    </div>
  );
}
}

export default App;
