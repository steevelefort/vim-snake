import {Fragment} from "react";
import wallTile from "../images/wall-shadow.png";

const Walls = ({walls}) => { 
    return (
      <Fragment>
      {walls.map((wall,index) => (
        <img key={index} src={wallTile} alt="" className="tile" style={{left:"calc("+wall.x+" * 5vh)",top:"calc("+wall.y+" * 5vh)"}} />
      ))}
      </Fragment>
    )
}
export default Walls;
