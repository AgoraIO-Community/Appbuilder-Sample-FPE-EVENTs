import {useRef, useEffect} from 'react';
import {
  customize,
  useLayout,
  useRender,
  customEvents,
  useLocalUserInfo,
} from 'customization-api';
enum EventPersistLevel {
  LEVEL1 = 1,
  LEVEL2,
  LEVEL3,
}

const useCanvas = (draw, options = {}) => {
  const canvasRef = useRef(null);
  const {renderList, activeUids} = useRender();
  const {uid} = useLocalUserInfo();
  let userCircleMap = {};

  useEffect(() => {
    // only identified once canvas has mounted
    let animationFrameId = null;
    const canvas = canvasRef.current;
    const context = canvas.getContext(options.context || '2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    let mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    function Circle(x, y, r, dy) {
      this.r = r;
      this.dy = dy;
      this.update = function (x, y) {
        context.beginPath();
        context.arc(x, y, this.r, 0, Math.PI * 2);
        context.fillStyle = 'blue';
        context.fill();
        // context.stroke();
        this.y += this.dy;
        if (this.y < this.r || this.y + this.r > canvas.height) {
          this.dy = -this.dy;
        }
      };
    }
    console.log(mouse.x, mouse.y, activeUids, 'activeUids');

    for (let i = 0; i < activeUids.length; i++) {
      let newCircle = new Circle(mouse.x, mouse.y, 10, 2);
      let circleConfig = {
        circle: newCircle,
        x: mouse.x,
        y: mouse.y,
      };
      userCircleMap[activeUids[i]] = circleConfig;
    }

    console.log(mouse.x, mouse.y, userCircleMap, 'userCircleMap');

    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // using object.keys on circlemap because, activeUIds cauing multiple rerenders and spoils the canvas rerendering
      for (let i = 0; i < Object.keys(userCircleMap).length; i++) {
        let {circle, x, y} = userCircleMap[activeUids[i]];
        console.log(activeUids[i], x, y, 'trying to animate');
        circle.update(x, y);
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    customEvents.on('mouse-move', (data) => {
      console.log('mouse move events received, ', data);
      console.log(userCircleMap, 'on mouse move rtm received', data.sender);
      const {sender} = data;
      const payload = JSON.parse(data.payload);
      userCircleMap[sender].x = payload.xAxis;
      userCircleMap[sender].y = payload.yAxis;
    });

    canvas.addEventListener('mousemove', function (e) {
      userCircleMap[uid].x = e.offsetX;
      userCircleMap[uid].y = e.offsetY;

      customEvents.send(
        'mouse-move',
        JSON.stringify({
          xAxis: e.offsetX,
          yAxis: e.offsetY,
        }),
        EventPersistLevel.LEVEL1,
      );
    });
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, activeUids]);

  return canvasRef;
};
export default useCanvas;
