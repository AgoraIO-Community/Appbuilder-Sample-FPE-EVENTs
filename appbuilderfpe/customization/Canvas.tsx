import React from 'react';
import useCanvas from './useCanvas';

const Canvas = (props) => {
  const {draw, ...rest} = props;
  const canvasRef = useCanvas(draw);

  return (
    <canvas
      style={{border: '1px solid red', width: '1000px', height: '500px'}}
      ref={canvasRef}
      {...rest}
    />
  );
};

export default Canvas;
