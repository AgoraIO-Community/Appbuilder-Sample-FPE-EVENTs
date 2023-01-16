import React from 'react';
import useCanvas from './useCanvas';

const Canvas = (props) => {
  const {draw, ...rest} = props;
  const canvasRef = useCanvas(draw);

  return (
    <canvas
      style={{
        border: '1px solid red',
        width: '800px',
        height: '600px',
        margin: '100px auto',
      }}
      ref={canvasRef}
      {...rest}
      width="800"
      height="600"
    />
  );
};

export default Canvas;
