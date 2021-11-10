import apple from '../images/apple.png';

const Apple = ({position}) => {
  return (
    <img src={apple} className="tile apple" style={{left:"calc("+position.x+" * 5vh)",top:"calc("+position.y+" * 5vh)"}} alt="" />
  );
}

export default Apple;
