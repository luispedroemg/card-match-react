import React from "react";
import styles from "./Card.css";

console.log("styles");
console.log(styles);
class Card extends React.Component{
  render(){
    return(
    <div className={"card card_"
        +(this.props.cardState==="INVISIBLE"?"back":this.props.cardType)
        +(this.props.cardState==="MATCHED"?" border border-success":"")}
        onClick={this.props.onClick}>
        <div>{this.props.cardType}</div>
      <div className="cardState">{this.props.cardState}</div>
    </div>
    );
  }
}

export default Card;
