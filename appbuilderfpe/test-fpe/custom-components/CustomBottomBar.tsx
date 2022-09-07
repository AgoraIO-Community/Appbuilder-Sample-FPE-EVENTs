import {ControlsComponentsArray, NavBarComponentsArray} from 'fpe-api';
import React from 'react';
import {View} from 'react-native';

const CustomBottomBar = () => {
  const [AudioBtn, VideoBtn, _, ScreenshareButton, Recording, Endcall] =
    ControlsComponentsArray;
  const [
    CopyJoinInfo,
    ParticipantsCountView,
    ParticipantsIconButton,
    ChatIconButton,
    LayoutIconButton,
    SettingsIconButton,
  ] = NavBarComponentsArray;
  return (
    <View
      style={{
        flex: 1,
        minHeight: 80,
        maxHeight: '8%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // position: 'relative',
        margin: 0,
        bottom: 0,
        //paddingHorizontal: '25%',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginLeft: 50,
        }}>
        <View
          style={{
            alignSelf: 'center',
          }}>
          <CopyJoinInfo />
        </View>
      </View>
      <View style={{flex: 2, flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            alignSelf: 'center',
            marginHorizontal: 50,
          }}>
          <VideoBtn />
        </View>
        <View
          style={{
            alignSelf: 'center',
            marginHorizontal: 50,
          }}>
          <AudioBtn />
        </View>

        <View
          style={{
            alignSelf: 'center',
            marginHorizontal: 50,
          }}>
          <ScreenshareButton />
        </View>
        <View
          style={{
            alignSelf: 'center',
            marginHorizontal: 50,
          }}>
          <Recording />
        </View>
        <View
          style={{
            alignSelf: 'center',
            marginHorizontal: 50,
          }}>
          <ParticipantsIconButton />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            alignSelf: 'center',
            marginRight: 50,
          }}>
          <Endcall />
        </View>
      </View>
    </View>
  );
};
export default CustomBottomBar;
