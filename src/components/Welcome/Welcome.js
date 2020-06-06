import React from "react";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {player: ""};
        this.onPlayerNameChange = this.onPlayerNameChange.bind(this);
    }

    onPlayerNameChange(event){
        console.log("name change");
        this.setState({player: event.target.value});
    }

    render(){
        return (<Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={this.state.player} onChange={this.onPlayerNameChange} />
        </Form.Group>
        <Button variant="primary" onClick={() => this.props.changePlayer(this.state.player)}>
          Play
        </Button>
      </Form>)
    }
}

export default Welcome;