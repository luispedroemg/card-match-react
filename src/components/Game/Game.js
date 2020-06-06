import React from "react";
import "./Game.css";
import Card from "../Card/Card";
import Button from 'react-bootstrap/Button';
import SideBar from "../SideBar/SideBar";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardArray: [],
      selectedCards: [],
      matchedCards: [],
      moves: 0,
      win: false,
      startTime: new Date(),
      timeElapsed: 0,
      showStart: 0,
      timeShow: 2,
      lastTick: new Date(),
      score: 0
    };
    //function needs to be bound to be used in child component (Card.js)
    this.clickCard = this.clickCard.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem("scores") == null){
      localStorage.setItem("scores", JSON.stringify([{name:"Luis",value:341}]));
    }
    this.loadBoard();
    this.startTime();
  }
  componentWillUnmount() {
    this.stopTime();
  }

  stopTime(){
    if(this.intervalID != null){
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  startTime(){
    if(this.intervalID == null){
      this.intervalID = setInterval(
        () => this.tick(),
        100
      );
    }
  }

  componentWillMount() {
    this.generateCardArray();
    this.shuffleFunction();
  }

  generateCardArray() {
    var _cardArray = this.state.cardArray;
    for (var i = 1; i < 5*3 + 1; i++) {
      _cardArray[i-1] = {
        cardType: (i%5+1).toString().padStart(2, "0"),
        cardState: "INVISIBLE"
      };
    }
    console.log(_cardArray);
    this.setState({ cardArray: _cardArray });
  }

  shuffleFunction() {
    var _cardArray = this.state.cardArray;
    _cardArray.sort(() => Math.random() - 0.5);
    this.setState({ cardArray: _cardArray });
  }

  clickCard(_position) {
    var _cardArray = this.state.cardArray;
    var _moves = this.state.moves;
    var _selectedCards = this.state.selectedCards;
    var _matchedCards = this.state.matchedCards;
    var _win = this.state.win;
    if (_cardArray[_position].cardState === "INVISIBLE" && _selectedCards.length<3){
      _cardArray[_position].cardState = "VISIBLE";
      _selectedCards.push(_position);
      if(_selectedCards.length >= 3){
        _moves++;
        this.setState({showStart: new Date()});
        if(this.checkMatch(_cardArray, _selectedCards)){
          _selectedCards.forEach(card => {
            _matchedCards.push(card);
          })
        }
      }
      if(_matchedCards.length === _cardArray.length){
        this.stopTime();
        this.saveScore();
        _win = true;
      }
    }
    this.setState({ cardArray: _cardArray,
                    selectedCards:_selectedCards,
                    matchedCards: _matchedCards,
                    moves:_moves, win:_win});
  }

  checkMatch(_cardArray, selectedCards){
    var _type = null;
    for(var i = 0; i<selectedCards.length; i++){
      if(_type==null)
        _type=_cardArray[selectedCards[i]].cardType;
      if(_cardArray[selectedCards[i]].cardType !== _type){
        return false;
      }
    }
    for(i = 0; i<selectedCards.length; i++){
      _cardArray[selectedCards[i]].cardState="MATCHED";
    }
    return true;
  }

  hideCards(cardArray, matchedCards){
    for(var i = 0; i<cardArray.length; i++){
      if(!(matchedCards.includes(i))){
        cardArray[i].cardState = "INVISIBLE";
      }
    }
    this.setState({selectedCards: []});
  }

  tick() {
    var _time = new Date();
    var _timeElapsed = this.state.timeElapsed;
    _timeElapsed += _time - this.state.lastTick;
    var _timeShow = this.state.timeShow;
    if(this.state.selectedCards.length >=3 ){
      _timeShow -= (_time - this.state.showStart)/1000;
    }
    if(_timeShow <= 0){
      this.hideCards(this.state.cardArray, this.state.matchedCards);
      _timeShow = 2;
    }

    this.setState({timeElapsed: _timeElapsed, timeShow: _timeShow, lastTick: new Date()});
  }

  saveScore(){
    var _playerName = this.props.playerName;
    var _score = (this.state.moves * 5 + this.state.timeElapsed/1000).toFixed(0)
    this.setState({score: _score});
    var scores = JSON.parse(localStorage.getItem("scores"));
    scores.push({"name":_playerName, "value":_score});
    localStorage.setItem("scores", JSON.stringify(scores));
  }

  loadBoard(){
    var _state = JSON.parse(localStorage.getItem("state_"+this.props.playerName));
    if(_state != null){
      _state.startTime = new Date(_state.startTime);
      _state.lastTick = new Date();
      this.setState(_state);
    }
    this.startTime();
  }

  resetBoard(){
    this.setState({
      cardArray: [],
      selectedCards: [],
      matchedCards: [],
      moves: 0,
      win: false,
      startTime: new Date(),
      timeElapsed: 0,
      showStart: 0,
      timeShow: 2
    });
    this.generateCardArray();
    this.shuffleFunction();
    this.startTime();
  }

  renderWin(){
    var _playerName = this.props._playerName;
    var _score = this.state.score;
    return (<div>Congratulations {_playerName}!
      <div>
      Score {_score}
      </div>
      <div>
      <Button onClick={() => this.resetBoard()}>Play Again!</Button>
      </div>
    </div>)
  }

  renderCardTable() {
    return this.state.cardArray.map((card, index) => {
      const { cardType, cardState } = card;
      return (
        <Card
          key={index}
          cardType={cardType}
          cardState={cardState}
          onClick={() => this.clickCard(index)}
        />
      );
    });
  }

  render() {
    return <div className="Table-wrapper">
      <div className="Game-wrapper">
          {!this.state.win && this.renderCardTable()}
      </div>
      <div className="Win-wrapper">
        {this.state.win && this.renderWin()}
      </div>
      {<SideBar
        playerName={this.props.playerName}
        gameState={this.state}
        loadBoardCallback={() => this.loadBoard()}
      />}
    </div>;
  }
}

export default Game;
