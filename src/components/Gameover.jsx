const Gameover = ({score}) => { 
   
  return (
    <div className="gameover">
      <h1>Game Over</h1>
      <p>your score : {score}</p>
      <div>Press Enter to play again ...</div>
    </div>    
  )
};

export default Gameover;
