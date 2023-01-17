import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import CountDown from './CountDown';
import Player from './Player';
import {customEvents, useLocalUserInfo} from 'customization-api';

// Calculates page offset of our gameboard
function offset(el) {
  if (el) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {x: rect.left + scrollLeft, y: rect.top + scrollTop};
  }
}

const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const createPlayer = (id, name) => ({
  id,
  name,
  color: randomColor(),
  position: {x: 300, y: 150}, // all players begin in the center of the board
});

const Popup = (props) => {
  const {
    modalVisible,
    setModalVisible,
    initialTimerValue,
    counter,
    setCounter,
    setGameStarted,
    isGameHost,
  } = props;
  const [boardOffset, setBoardOffset] = useState({x: 0, y: 0});
  const [selfPosition, setSelfPosition] = useState({x: 300, y: 150});
  const [players, setPlayers] = useState({});

  const {name, uid} = useLocalUserInfo();

  const handleUpdatePosition = (x, y) => {
    const playerObj = {
      name: name,
      id: uid,
      position: {x, y},
    };
    setSelfPosition({x, y});
    const payload = JSON.stringify(playerObj);
    customEvents.send('player_position', payload, 2);
  };

  customEvents.on('initialize', (data) => {
    const {name, id, position} = JSON.parse(data.payload);
    const newPlayer = createPlayer(id, name);
    players[id] = newPlayer;
  });

  customEvents.on('player_position', (data) => {
    const res = JSON.parse(data.payload);
    const player = players[res.id];
    players[res.id].position = res.position;
  });

  const handlePointerDown = ({clientX, clientY}) => {
    handleUpdatePosition(clientX - boardOffset.x, clientY - boardOffset.y);
  };

  React.useEffect(() => {
    setBoardOffset(offset(document.querySelector('.board')));
    const payload = {name: name, id: uid};
    customEvents.send('initialize', JSON.stringify(payload), 2);
  }, [modalVisible]);

  const onTimerComplete = React.useCallback(() => {
    console.log('timer over =>', players);
    customEvents.send('event_gameOver', JSON.stringify(players), 2);
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {counter > 0 ? 'Time Remaining in the Game' : 'Game Ended '}
            {
              <CountDown
                time={counter}
                setTime={setCounter}
                onTimerComplete={onTimerComplete}
                setGameStarted={setGameStarted}
              />
            }
          </Text>
          <div
            style={{
              width: '600px',
              height: '300px',
              border: '1px solid pink',
              position: 'relative',
              overflow: 'hidden',
              margin: '0 auto',
            }}
            className="board"
            onPointerDown={handlePointerDown}>
            {/* remote players */}
            {Object.entries(players).map(([id, data]) => {
              if (id === uid) return null;
              return (
                <Player
                  key={`player${id}`}
                  position={data.position}
                  color={data.color}
                  name={data.name}
                />
              );
            })}

            {/* local player */}
            <Player position={selfPosition} color="#a22058" name={name} />
          </div>
          {isGameHost && (
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                // setModalVisible(!modalVisible);
                setGameStarted(false);
                //setCounter(initialTimerValue);
              }}>
              <Text style={styles.textStyle}> Close</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  gameBoard: {
    width: 600,
    height: 300,
    background: '#fff',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'pink',
    marginBottom: 20,
  },

  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Popup;
