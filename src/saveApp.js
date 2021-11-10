import './App.css';
import { useEffect, useState} from 'react';
import Grid from './components/Grid';
import Snake from './components/Snake';
import Apple from './components/Apple';
import Startup from './components/Startup';

  const buffer = [];
  for (let y = 0; y < 20; y++) {
    const line = [];
    for (let x = 0; x < 20; x++) {
      line.push(0); 
    }
    buffer.push(line);
  }
  console.log(buffer);
 
function App() {
  // let latency = 1000;
  
  const [grid, setGrid] = useState(buffer);
  const [snake, setSnake] = useState([{x:9,y:9}])
  const [currentDirection, setCurrentDirection] = useState(1); 
  const [applePosition, setApplePosition] = useState({x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)}) 
  const [gameState, setGameState] = useState(0);
  const directions = [
    {x:0,y:-1,className:''},
    {x:+1,y:0,className:'right'},
    {x:0,y:1,className:'bottom'},
    {x:-1,y:0,className:'left'} 
  ]
  let playing = true;

  // This is the control loop
  const gameLoop = () => { 
    if (gameState === 1) {
    const nextPosition = {x:snake[0].x+directions[currentDirection].x, y:snake[0].y+directions[currentDirection].y};
    if (nextPosition.x>19) nextPosition.x = 0;
    if (nextPosition.x<0) nextPosition.x = 19;
    if (nextPosition.y>19) nextPosition.y = 0;
    if (nextPosition.y<0) nextPosition.y = 19;

    const newSnake = [nextPosition,...snake]; 
    console.log(nextPosition.x+" === "+ applePosition.x +" && "+ nextPosition.y +" === "+ applePosition.y);
    if (nextPosition.x === applePosition.x && nextPosition.y === applePosition.y) {
      randomApple();
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
    }
  }

  useEffect(()=>{
    let i;
    i = setTimeout(gameLoop,250);
    return () => { clearInterval(i) }
  })

  useEffect(()=>{
    document.body.addEventListener("keydown", handleKey)
    return () => { document.body.removeEventListener("keydown", handleKey)}
  });

  const randomApple = () => { 
    // TODO : Vérifier si la pomme n'est pas sur le serpent !!!
    setApplePosition({x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)})
  }
  const handleKey =  (e) => {
    console.log(currentDirection);
    switch (e.key.toString().toLowerCase()) {
      case "h":
       if (currentDirection!==1) setCurrentDirection(3);
       break;
      case "j":
       if (currentDirection!==0) setCurrentDirection(2);
        break;
      case "l":
        if (currentDirection!==3) setCurrentDirection(1);
        break;
      case "k":
        if (currentDirection!==2) setCurrentDirection(0);
        break;
    }
  }

  return ( 
    <div className="App" tabIndex="0" onKeyDowh={handleKey}>
      <Grid grid={grid}/>
      <Snake snake={snake} directions={directions} currentDirection={currentDirection}/>
      <Apple position={applePosition} />
    </div>
  );
}

export default App;
