import React from "react";
import "./ScoreCard.css";

class ScoreCard extends React.Component{
    componentDidMount(){
        console.log("scorecard did mount");
        console.log("score: "+this.props.score);
    }

    render(){
        console.log("rendering score card");
        return (<div className="scoreCard">{this.props.score.name}:{this.props.score.value}</div>);
    }
}

export default ScoreCard;