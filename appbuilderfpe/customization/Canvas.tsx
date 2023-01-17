import React from 'react';
import useCanvas from './useCanvas';

const Canvas = (props) => {
  const {draw, ...rest} = props;
  const canvasRef = useCanvas(draw);

  return (
    <div style={{padding: 100}}>
      <canvas
        style={{
          border: '1px solid red',
          width: '1400px',
          height: '600px',
          margin: '50px auto',
        }}
        ref={canvasRef}
        {...rest}
        width="1400"
        height="600"
      />
    </div>
  );
};

export default Canvas;
