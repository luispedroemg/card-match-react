import React from "react";
import Button from 'react-bootstrap/Button';
import "./SideBar.css";

class SideBar extends React.Component{

    saveBoard(){
      console.log("saving");
      localStorage.setItem("state_"+this.props.playerName, JSON.stringify(this.props.gameState));
    }

    render() {
      return (
        <div className="Sidebar-wrapper">
          <div>{this.props.playerName}</div>
          <div>
            Time Elapsed: {(this.props.gameState.timeElapsed/1000).toFixed(0)}
          </div>
          <Button className="sidebarButton" onClick={() => this.saveBoard()}>Save Board</Button>
          {/*<Button className="sidebarButton" onClick={this.props.loadBoardCallback}>Load Board</Button>*/}
        </div>
      );
    }
}

export default SideBar;