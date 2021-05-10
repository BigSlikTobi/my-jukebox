import React, { Component } from "react";
import queryString from 'query-string';
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
      <img src={playlist.imageUrl} style={{width: "160px"}}/>
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
    //get access token from query string after connecting to Spotify 
    let token = queryString.parse(window.location.search);
    console.log(token);
    let accessToken = token.access_token;
    console.log(accessToken);

    fetch ("https://api.spotify.com/v1/me", {
      headers: {"Authorization": "Bearer " +accessToken}
    }).then(response => response.json())
    .then(data => this.setState(
      {serverData: 
        {user: 
          {name: data.display_name}
        }
      }
      ))


    fetch ("https://api.spotify.com/v1/me/playlists", {
      headers: {"Authorization": "Bearer " +accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
          playlists: data.items.map(item => {
            console.log(data)
            return{
            name: item.name, 
            imageUrl: item.images[0].url,
                songs: []
          }
        })
      }))
      

    //.then(data => console.log(data)
    
    
    
    }
  render() {
  return (
    <div className="App" style={{...defaultStyle}}>
            {this.state.serverData.user ?
      <div> 
        <h1>         
            {this.state.serverData.user.name}
          </h1>
          {this.state.playlists &&
          <div>
        <PlaylistCounter playlists={this.state.playlists}/>
        
        <MinutesCounter playlists={this.state.playlists}/>

        <Filter/>

        {
          this.state.playlists.map(playlist => 
            <Playlist playlist= {playlist}/>
          
            )}
        </div>
  }
        </div> : 
        <button 
          onClick={() => {window.location.href="http://localhost:8888/login"}}
          style={{padding: "20px", "font-size": "50px", "margin-top": "20px"}}>Loading...</button>
  }
  </div>
    
  );
}
}

export default App;
