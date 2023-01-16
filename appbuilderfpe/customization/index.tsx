import React, {useEffect, useState} from 'react';
import {
  customize,
  useLayout,
  useRender,
  useRtc,
  useSidePanel,
} from 'customization-api';
import {View, Text, StyleSheet} from 'react-native';
import {customEvents} from 'customization-api';
import CustomTopbar from './TopBar';
enum EventPersistLevel {
  LEVEL1 = 1,
  LEVEL2,
  LEVEL3,
}
// import {ControlsComponentArray} from 'customization-api';
// import NewCustomLayout from './pages/NewCustomLayout';
// import ChatBubble from './components/ChatBubble';
import Canvas from './Canvas';

const NewCustomLayout = () => {
  const draw = (ctx, frameCount, xAxis, yAxis) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(20, 50, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  return <Canvas draw={draw} />;
};

const StartGameControl = () => {
  const {currentLayout, setLayout} = useLayout();
  const {setSidePanel} = useSidePanel();
  return (
    <button
      onClick={() => {
        customEvents.send(
          'start-game',
          'Payload is Hello!!',
          EventPersistLevel.LEVEL2,
        );
        setLayout('canvas');
        setSidePanel(1);
        // reset the game and timer when a new user joins
        customEvents.on('reset-game', (data) => {
          console.log('reset game event received, ', data);
        });

        // start the game timer
        customEvents.send(
          'start-timer',
          JSON.stringify({
            startTime: 20,
          }),
          EventPersistLevel.LEVEL2,
        );
      }}>
      Start game
    </button>
  );
};
const ParticipantsPanel = () => {
  const {activeUids, renderList} = useRender();
  const [shuffledUids, setShuffledUids] = useState(activeUids);
  useEffect(() => {
    customEvents.on('generate-sequence', ({payload, sender}) => {
      let data = JSON.parse(payload);
      setShuffledUids(data.shuffledUids);

      customEvents.send(
        'sequence-received',
        JSON.stringify({
          shuffledUids: data.shuffledUids,
        }),
        EventPersistLevel.LEVEL1,
        sender,
      );
    });

    customEvents.on('sequence-received', ({payload}) => {
      let data = JSON.parse(payload);
      setShuffledUids(data.shuffledUids);
    });
  }, []);
  useEffect(() => {
    setShuffledUids(activeUids);
  }, [activeUids]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <ul>
          {shuffledUids.map((item, index) => {
            return (
              <li>
                {renderList[item].name} - {index + 1}
              </li>
            );
          })}
        </ul>
      </View>
    </View>
  );
};
const BottomBar = () => {
  const {currentLayout, setLayout} = useLayout();
  const {setSidePanel} = useSidePanel();
  const {RtcEngine} = useRtc();

  useEffect(() => {
    RtcEngine.addListener('JoinChannelSuccess', async (channel, uid) => {
      customEvents.send(
        'reset-game',
        'Please reset the game..',
        EventPersistLevel.LEVEL1,
      );
    });
    customEvents.on('start-game', (data) => {
      setLayout('canvas');
      setSidePanel(1);
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>
          <StartGameControl />
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    maxHeight: 200,
    borderRadius: 30,
  },
  textStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
  },
});

const userCustomization = customize({
  components: {
    videoCall: {
      customLayout: (defaultLayouts) => {
        return [
          ...defaultLayouts,
          {
            label: 'Canvas',
            name: 'canvas',
            iconName: 'screenshare',
            component: NewCustomLayout,
          },
        ];
      },
      bottomBar: BottomBar,
      topBar: CustomTopbar,
      participantsPanel: ParticipantsPanel,
    },
  },
});

export default userCustomization;
