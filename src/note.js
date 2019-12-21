import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return(
    <button className = "square" onClick={props.onClick}>
        { props.value }
    </button> 
    );
}

// class Square extends React.Component {
//   // 构造函数，用来构造state这个属性
//   // 在 JavaScript class 中，每次你定义其子类的构造函数时，都需要调用 super 方法。
//   // 因此，在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头。

//   render() {
//     return (
//       // alert()方法用来显示一条带有指定消息和ok按钮的警告框
//       // 下面用的是箭头函数，不用箭头函数的形式为{function(){ alert('onClick'); }}

//       <button 
//         className="square" 
//         onClick={() => this.props.onClick()}
//         //onClick = {() => alert("alert")}
//       >
//       {this.props.value}   
//       </button>
//     );
//   }
// }

class Board extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      squares : Array(9).fill(null),
      xIsNext : true, 
    };
  }

  handleClick(i){
    // 使用const声明的是常量，在后面出现的代码中不能再修改该常量的值。
    // slice() 浅复制的方法,创建备份
    const squares = this.state.squares.slice();
    // 将不再进行直接返回
    if (calculateWinner(squares) || squares[i]) {
      return;
    }   
    // 修改备份中的内容
    squares[i] = this.state.xIsNext ? 'x' : 'o';
    // 将修改后的内容传送过去
    this.setState({
      squares: squares,
      xIsNext : !this.state.xIsNext,
    });
        
  }

  renderSquare(i) {
    // 传递一个value的prop到square
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick = {()=> this.handleClick(i)}
      />
      );
  }

  render() {
    const winner = calculateWinner(this.state.squares);

    var status;
    if (winner){
      status = 'winner :' + winner;
    }else{
      status = status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      /*调用返回 给square的 renderSquare方法*/
      <div>
        <div className="status">{ status }</div>
         
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>

        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>

        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


// 判断玩家胜利的标志
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}