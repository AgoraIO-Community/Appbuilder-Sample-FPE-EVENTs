import {ControlsComponentsArray} from 'fpe-api';
import React from 'react';
import {View} from 'react-native';

const CustomBottomBar = () => {
  const [AudioBtn, VideoBtn, _, ScreenshareButton, Recording, Endcall] =
    ControlsComponentsArray;
  return (
    <View
      style={{
        flex: 1.3,
        minHeight: 80,
        maxHeight: '8%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'relative',
        margin: 0,
        bottom: 0,
        paddingHorizontal: '25%',
      }}>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <VideoBtn />
      </View>
      <View
        style={{
          marginVertical: 10,
          alignSelf: 'center',
        }}>
        <AudioBtn />
      </View>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <ScreenshareButton />
      </View>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <Recording />
      </View>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <Endcall />
      </View>
    </View>
  );
};
export default CustomBottomBar;
