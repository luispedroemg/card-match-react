import React from "react";
import ScoreCard from "../ScoreCard/ScoreCard"
import "./LeaderBoard.css";


class LeaderBoard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      scores: JSON.parse(localStorage.getItem("scores"))
    }
  }

  componentDidMount(){
    console.log("leaderboard did mount");
    this.setState({scores: JSON.parse(localStorage.getItem("scores"))});
    console.log(this.state.scores);
  }

  renderScores(){
    var _sortedScores = this.state.scores.sort((a,b) => {return a.value-b.value});
    return _sortedScores.map((score, index) => {
      return (
        <ScoreCard 
          key={index}
          score={score}
        />
      );
    });
  }

  render(){
    console.log(this.renderScores);
    return <div>
      LeaderBoard
      {this.renderScores()}
    </div>
  }
}
export default LeaderBoard;