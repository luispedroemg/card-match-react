import React from "react";
import "./App.css";
import NavBar from "./components/Nav/NavBar";
import Game from "./components/Game/Game";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Welcome from "./components/Welcome/Welcome"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "welcome",
      playerName: null
    };
    //function needs to be bound to be used in child component (NavBar.js)
    this.changePage = this.changePage.bind(this);
    this.changePlayer = this.changePlayer.bind(this);
  }

  changePage(page) {
    console.log("page: "+page);
    this.setState({
      page
    });
  }

  changePlayer(player){
    this.setState({playerName: player});
    this.changePage("game");
  }

  render() {
    const { page } = this.state;
    return (
      <div className="App">
        <NavBar page={page} changePage={this.changePage} />
        <div className="App-header">
          {page === "game" && <Game playerName={this.state.playerName}/>}
          {page === "leaderboard" && <LeaderBoard />}
          {page === "welcome" && <Welcome changePlayer={this.changePlayer}/>}
        </div>
      </div>
    );
  }
}

export default App;
