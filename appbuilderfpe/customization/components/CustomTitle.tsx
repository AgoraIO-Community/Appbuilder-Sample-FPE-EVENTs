import {customEvents} from 'customization-api';
import React from 'react';
import {View, Button} from 'react-native';

export default function CustomTitle() {
  React.useEffect(() => {
    customEvents.on('test1', (data) => {
      console.log('CUSTOM_EVENT_API:FPE_EVENT callback test1: ', data);
    });
    customEvents.on('test2', (data) => {
      console.log('CUSTOM_EVENT_API:FPE_EVENT callback test1: ', data);
    });
    customEvents.on('test3', (data) => {
      console.log('CUSTOM_EVENT_API:FPE_EVENT callback test1: ', data);
    });
    customEvents.on('test4', (data) => {
      console.log('CUSTOM_EVENT_API:FPE_EVENT callback test1: ', data);
    });
  }, []);

  const sendLevel1Message = () => {
    customEvents.send(
      'test1',
      JSON.stringify({
        value: 'level 1 value',
      }),
      2,
    );
  };
  const sendLevel2Message = () => {
    customEvents.send(
      'test2',
      JSON.stringify({
        value: 'level 2 value:',
        level: 2,
      }),
      2,
    );
  };
  const sendLevel3Message = () => {
    customEvents.send(
      'test3',
      JSON.stringify({
        value: 'level 3 value:',
        level: 3,
      }),
      2,
    );
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        flex: 1,
        backgroundColor: 'red',
      }}>
      <Button onPress={sendLevel1Message} title="Send Level 1 message" />
      <Button onPress={sendLevel2Message} title="Send Level 2 message" />
      <Button onPress={sendLevel3Message} title="Send Level 3 message" />
      {/* <Button onPress={fpeEvents.printEvents} title="Print events" /> */}
    </View>
  );
}
