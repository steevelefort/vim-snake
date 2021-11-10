import {Fragment} from 'react';
import head from '../images/snake-head-red.png';
import body from '../images/snake-body-red.png';

const Snake = ({snake,directions,currentDirection}) => {
  return (
    <Fragment>
    { snake.map((segment,index) => (
     <img key={index} src={index===0?head:body} className={"tile segment "+(index===0 && directions[currentDirection].className)} style={{left:"calc("+segment.x+" * 5vh)",top:"calc("+segment.y+" * 5vh)"}} alt="" /> 
    ) ) }
    </Fragment>
  );
}

export default Snake;
