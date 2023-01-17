import React from 'react';
import {customize, customEvents, ParticipantsView} from 'customization-api';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  useRender,
  ControlsComponentsArray,
  ChatBubble,
} from 'customization-api';
import Popup from './components/Modal';
/* Custom imports
import NewCustomLayout from './pages/NewCustomLayout';
import ChatBubble from './components/ChatBubble';
*/

const timer = 60;
const GameButton = () => {
  const [gameStarted, setGameStarted] = React.useState(false);
  const [counter, setCounter] = React.useState(timer);

  const handleGameStart = React.useCallback(() => {
    // send event in channel to open popup
    const startTime = Date.now();
    const payload = JSON.stringify({startTime, counter});
    customEvents.send('event_gameOn', payload, 2);
    setGameStarted((prev) => true);
  }, []);

  customEvents.on('event_gameOn', (data) => {
    const res = JSON.parse(data.payload);
    const diff = Math.floor((Date.now() - Number(res.startTime)) / 1000);

    if (diff < timer) {
      // game is still running ;
      setCounter(timer - diff);
      setGameStarted(true);
    } else {
      // game is over
    }
  });

  customEvents.on('event_gameOff', (data) => setGameStarted(false));

  return (
    <TouchableOpacity style={styles.iconContainer} onPress={handleGameStart}>
      <View style={styles.gameBtn}>
        <Text style={{color: '#fff'}}>G</Text>
      </View>
      <Text>{!gameStarted ? `Start Game ` : `End Game `}</Text>

      <Popup
        modalVisible={gameStarted}
        setGameStarted={setGameStarted}
        setModalVisible={setGameStarted}
        initialTimerValue={timer}
        counter={counter}
        setCounter={setCounter}
      />
    </TouchableOpacity>
  );
};

// Bottom bar to add a button
const MyBottomBar = (props) => {
  const {renderList} = useRender();
  console.log('renderList', renderList);
  console.log(`ControlsComponentArray`, ControlsComponentsArray);
  const [firstControl, secondControl, thirdControl, ...rest] =
    ControlsComponentsArray;
  ControlsComponentsArray.map((ele) => ele);
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{firstControl('')}</View>
      <View style={styles.icon}>{secondControl('')}</View>
      <View style={styles.icon}>{thirdControl('')}</View>
      <View style={styles.icon}>
        <GameButton />
      </View>
      {rest.map((ele) => (
        <View style={styles.icon}>{ele('')} </View>
      ))}
    </View>
  );
};

const MyParticipantsPanel = (props) => {
  return (
    <ParticipantsView
      render={() => {
        console.log('hi');
      }}
    />
  );
};

const userCustomization = customize({
  components: {
    videoCall: {
      bottomBar: MyBottomBar,
      participantsPanel: MyParticipantsPanel,
    },
  },
});

const styles = StyleSheet.create({
  icon: {
    marginRight: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameBtn: {
    width: 40,
    height: 40,
    color: '#fff',
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
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

export default userCustomization;
