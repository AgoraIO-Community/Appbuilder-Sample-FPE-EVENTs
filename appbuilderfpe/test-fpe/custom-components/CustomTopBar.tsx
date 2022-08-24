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
import {navHolder} from '../../theme.json';
import {ImageIcon} from '../../agora-rn-uikit';
import DimensionContext from '../../src/components/dimension/DimensionContext';
import isMobileOrTablet from '../../src/utils/isMobileOrTablet';
import {useMeetingInfo, useRecording, NavBarComponentsArray} from 'fpe-api';
import {isWeb, isIOS} from '../../src/utils/common';
const RenderSeparator = () => {
  const {getDimensionData} = useContext(DimensionContext);
  const {isDesktop} = getDimensionData();
  return isWeb && isDesktop ? (
    <View style={style.navItem}>
      <View style={style.navItemSeparator}></View>
    </View>
  ) : (
    <View style={{marginHorizontal: 2}}></View>
  );
};

const CustomNavBar = () => {
  //commented for v1 release
  //const recordingLabel = useString('recordingLabel')();
  const recordingLabel = 'Recording';
  const {meetingTitle} = useMeetingInfo();
  const {isRecordingActive} = useRecording();
  const {getDimensionData} = useContext(DimensionContext);
  const {isDesktop} = getDimensionData();
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
      style={[
        isWeb ? style.navHolder : style.navHolderNative,
        {backgroundColor: $config.SECONDARY_FONT_COLOR + 80},
        isWeb
          ? {
              justifyContent: isMobileOrTablet() ? 'space-between' : 'flex-end',
            }
          : {},
      ]}>
      {isRecordingActive && !isMobileOrTablet() ? (
        <View
          style={[
            style.recordingView,
            {backgroundColor: $config.SECONDARY_FONT_COLOR},
          ]}>
          <ImageIcon
            name={'recordingActiveIcon'}
            style={{
              width: 20,
              height: 20,
              margin: 1,
            }}
            color="#FD0845"
          />
          <Text
            style={{
              fontSize: isWeb ? 16 : 12,
              color: '#FD0845',
              fontWeight: '400',
              alignSelf: 'center',
              textAlign: 'center',
              flex: 1,
            }}>
            {recordingLabel}
          </Text>
        </View>
      ) : (
        <></>
      )}
      <View
        style={[
          style.roomNameContainer,
          // @ts-ignore
          isWeb && !isMobileOrTablet()
            ? {transform: [{translateX: '50%'}]}
            : {},
        ]}>
        {isWeb ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingLeft: 5,
            }}>
            <View>
              <Text style={style.roomNameText}>
                {isMobileOrTablet()
                  ? meetingTitle.length > 13
                    ? meetingTitle.slice(0, 13) + '.. Sample App'
                    : meetingTitle + ' - Sample App'
                  : meetingTitle + ' - Sample App'}
              </Text>
            </View>
            <View />
            <View
              style={{
                backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
                width: 1,
                height: 'auto',
                marginHorizontal: 10,
              }}
            />
            <View style={{width: 30}}>
              <CopyJoinInfo />
            </View>
          </View>
        ) : (
          <View>
            <Text style={style.roomNameText}>{meetingTitle}</Text>
          </View>
        )}
      </View>
      <View style={style.navControlBar}>
        <View
          style={[
            style.navContainer,
            {
              minWidth:
                isWeb && isDesktop ? 300 : isMobileOrTablet() ? 160 : 200,
            },
          ]}>
          <ParticipantsCountView />
          <View style={[style.navItem, style.navSmItem]}>
            <ParticipantsIconButton />
          </View>
          {$config.CHAT ? (
            <>
              <RenderSeparator />
              <View style={[style.navItem, style.navSmItem]}>
                <ChatIconButton />
              </View>
            </>
          ) : (
            <></>
          )}
          <RenderSeparator />
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
          <RenderSeparator />
          <View style={[style.navItem, style.navSmItem]}>
            <SettingsIconButton />
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  backDrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  navHolder: navHolder as ViewStyle,
  navHolderNative: {
    position: 'relative',
    width: '100%',
    height: '8%',
    backgroundColor: $config.SECONDARY_FONT_COLOR + '80',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  recordingView: {
    height: 35,
    maxHeight: 30,
    position: 'absolute',
    left: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  recordingIcon: {
    width: 20,
    height: 20,
    margin: 1,
    resizeMode: 'contain',
  },
  btnHolder: {
    marginHorizontal: isMobileOrTablet() ? 2 : 0,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  btnHolderCustom: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  roomNameContainer: {
    paddingHorizontal: 1,
    marginHorizontal: 1,
    height: 35,
    maxHeight: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 10,
  },
  roomNameText: {
    fontSize: 18,
    color: $config.PRIMARY_FONT_COLOR,
    fontWeight: '500',
  },
  badge: {
    lineHeight: 1,
    height: 20,
    minWidth: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: $config.PRIMARY_COLOR,
    color: $config.SECONDARY_FONT_COLOR,
    fontFamily: isIOS ? 'Helvetica' : 'sans-serif',
    borderRadius: 10,
    position: 'absolute',
    paddingHorizontal: 5,
    top: 0,
    left: -2,
  },
  chip: {
    backgroundColor: $config.PRIMARY_COLOR,
    borderRadius: 2.5,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    paddingVertical: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontFamily: isIOS ? 'Helvetica' : 'sans-serif',
    fontSize: 12,
    color: $config.SECONDARY_FONT_COLOR,
  },
  navControlBar: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    zIndex: 9,
  },
  navContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: isWeb
      ? $config.SECONDARY_FONT_COLOR
      : $config.SECONDARY_FONT_COLOR + '00',
    paddingVertical: 4,
    paddingHorizontal: isMobileOrTablet() ? 0 : 10,
    minHeight: 35,
    borderRadius: 10,
  },
  navItem: {
    height: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  navSmItem: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '15%',
  },
  navItemSeparator: {
    backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
    width: 1,
    height: '100%',
    marginHorizontal: 10,
    alignSelf: 'center',
    opacity: 0.8,
  },
  navItemSeparatorHorizontal: {
    backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
    width: '100%',
    height: 1,
    marginVertical: 10,
    alignSelf: 'center',
    opacity: 0.8,
  },
  dropdownIconContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  separaterContainer: {
    flex: 0.5,
    paddingHorizontal: 5,
  },
  dropdownContainer: {
    position: 'absolute',
    marginTop: 5,
    width: 40,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
  },
});

export default CustomNavBar;