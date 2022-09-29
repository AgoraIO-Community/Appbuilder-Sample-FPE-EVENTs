/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
import React, {useContext} from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {
  useMeetingInfo,
  useRecording,
  NavBarComponentsArray,
  $config,
} from 'customization-api';

const CustomNavBar = () => {
  //commented for v1 release
  //const recordingLabel = useString('recordingLabel')();
  const recordingLabel = 'Recording';
  const {
    data: {meetingTitle},
  } = useMeetingInfo();
  const {isRecordingActive} = useRecording();
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
      style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignSelf: 'center',
          paddingHorizontal: 10,
        }}>
        <View>
          <Text>
            {meetingTitle} {' - Sample App'}
          </Text>
        </View>
        <View style={[style.navItem, style.navSmItem]}>
          <CopyJoinInfo />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignSelf: 'center',
          maxWidth: 300,
        }}>
        <View style={[style.navItem, style.navSmItem]}>
          <ParticipantsIconButton />
        </View>
        {$config.CHAT ? (
          <>
            <View style={[style.navItem, style.navSmItem]}>
              <ChatIconButton />
            </View>
          </>
        ) : (
          <></>
        )}
        <View
          style={[style.navItem, style.navSmItem]}
          /**
           * .measure returns undefined on Android unless collapsable=false or onLayout are specified
           * so added collapsable property
           * https://github.com/facebook/react-native/issues/29712
           * */
          collapsable={false}>
          <LayoutIconButton />
        </View>
        <View style={[style.navItem, style.navSmItem]}>
          <SettingsIconButton />
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  navItem: {
    width: 30,
    height: 30,
    alignItems: 'center',
    position: 'relative',
  },
  navSmItem: {},
});

export default CustomNavBar;
