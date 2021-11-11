import './App.css';
import { useEffect, useState} from 'react';
import Snake from './components/Snake';
import Apple from './components/Apple';
import Startup from './components/Startup';
import Gameover from './components/Gameover';
import Walls from './components/Walls';

function App() {
  // let latency = 1000;
  
  const [walls, setWalls] = useState([]); 
  const [snake, setSnake] = useState([{x:9,y:9}])
  const [currentDirection, setCurrentDirection] = useState(1); 
  const [applePosition, setApplePosition] = useState({x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)}) 
  const [gameState, setGameState] = useState(0);
  const [score, setScore] = useState(0)
  const directions = [
    {x:0,y:-1,className:''},
    {x:+1,y:0,className:'right'},
    {x:0,y:1,className:'bottom'},
    {x:-1,y:0,className:'left'} 
  ]

  // This is the control loop
  const gameLoop = () => { 
    if (gameState === 1) {
    const nextPosition = {x:snake[0].x+directions[currentDirection].x, y:snake[0].y+directions[currentDirection].y};
    if (nextPosition.x>19) setGameState(2);
    if (nextPosition.x<0) setGameState(2);
    if (nextPosition.y>19) setGameState(2);
    if (nextPosition.y<0) setGameState(2);
    
    for (const wall of walls) {
        if (nextPosition.x === wall.x && nextPosition.y === wall.y) {
          setGameState(2);
          break;
        } 
    }

    for (let i = 1; i<snake.length; i++) {
        if (nextPosition.x === snake[i].x && nextPosition.y === snake[i].y) {
          setGameState(2);
          break;
        }
    }
      
    const newSnake = [nextPosition,...snake]; 
    if (nextPosition.x === applePosition.x && nextPosition.y === applePosition.y) {
      setWalls([...walls, {...snake[snake.length-1]}]);
      setScore(score+1); 
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
    const pos = {};
    let ok = true;
    do {
      // On tire une nouvelle position pour la pomme
      pos.x=Math.floor(Math.random()*20);
      pos.y=Math.floor(Math.random()*20);
      // On vérifie si la pomme n'est pas sur le serpent
      for (const segment of snake) {
        if (pos.x === segment.x && pos.y === segment.y) {
          ok = false;
          break;
        }
      }      // On vérifie si la pomme n'est pas sur un mur

      for (const wall of walls) {
        if (pos.x === wall.x && pos.y === wall.y) {
          ok = false;
          break;
        } 
      }
    } while(!ok)

    setApplePosition(pos);
  }

  const handleKey =  (e) => {
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
      case "enter":
        setScore(0);
        setSnake([{x:9,y:9}]);
        setWalls([]);
        setGameState(1);
        break;
      default:
        break;
    }
  }
    
  return ( 
    <div className="App" tabIndex="0" >
      <Walls walls={walls}/>
      <Snake snake={snake} directions={directions} currentDirection={currentDirection}/>
      <Apple position={applePosition} />
      <div className="score">Score : {score}</div>
    { gameState === 0 && <Startup/> }
    { gameState === 2 && <Gameover score={score}/> }
    </div>
  );
}

export default App;
