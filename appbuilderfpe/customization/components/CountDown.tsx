import React from 'react';
import {Text} from 'react-native';

function CountDown({time, setTime, setGameStarted, onTimerComplete}) {
  React.useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          setGameStarted(false);
          onTimerComplete();
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);
  return (
    <Text>
      {` ${Math.floor(time / 60)}`.padStart(2, 0)}:
      {`${time % 60}`.padStart(2, 0)}
    </Text>
  );
}

export default CountDown;
