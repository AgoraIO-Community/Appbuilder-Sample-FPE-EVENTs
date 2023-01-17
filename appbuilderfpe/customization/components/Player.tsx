import React from 'react';
import {useSpring, animated} from 'react-spring';

function Player({position, color, name}) {
  const props = useSpring({
    transform: `translate3d(${position.x}px, ${position.y}px ,0)`,
    config: {mass: 1, tension: 30, friction: 10},
  });
  React.useEffect(() => {
    console.warn('moving');
  }, [position]);
  const playerStyle = {
    width: '50px',
    height: '50px',
    position: 'absolute',
    left: '-25px',
    top: '-25px',
    backgroundColor: color,
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'border-radius': '25px',
  };
  return (
    <animated.div style={{...props, ...playerStyle}}>
      <animated.span
        style={{color: '#fff', textTransform: 'capitalize', fontSize: '12px'}}>
        {name.toUpperCase()}
      </animated.span>
    </animated.div>
  );
}

export default Player;
