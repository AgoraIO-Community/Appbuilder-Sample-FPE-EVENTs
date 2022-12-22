import {customEvents, customize, useRender} from 'customization-api';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ViewStyle, Dimensions} from 'react-native';
import {navHolder} from '../../theme.json';
import {
  NavBarComponentsArray,
  useMeetingInfo,
  useRecording,
  isMobileOrTablet,
  isWeb,
  isDesktop,
  UiKitImageIcon,
  useIsHost,
} from 'customization-api';
import {EventPersistLevel} from '../src/rtm-events-api/types';

const getDimensionData = (width?: number, height?: number) => {
  (width = width ? width : Dimensions.get('window').width),
    (height = height ? height : Dimensions.get('window').height);
  const dim: [number, number, boolean] = [width, height, width > height];
  return {
    dim: dim,
    isDesktopWidth: width < height + 150 ? false : true,
  };
};

const RenderSeparator = () => {
  const {isDesktopWidth} = getDimensionData();
  return isWeb() || (isDesktop() && isDesktopWidth) ? (
    <View style={style.navItem}>
      <View style={style.navItemSeparator}></View>
    </View>
  ) : (
    <View style={{marginHorizontal: 2}}></View>
  );
};

//Timer component
const Timer = () => {
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const {activeUids} = useRender();
  const isHost = useIsHost();
  useEffect(() => {
    customEvents.on('TIMER_START', ({payload}) => {
      let data = JSON.parse(payload);
      if (data && data?.startTime) {
        if (!startTime) {
          setStartTime(data.startTime);
        }
      }
    });
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isHost && activeUids && activeUids.length === 2) {
      if (!startTime) {
        let timeNow = Date.now();
        customEvents.send(
          'TIMER_START',
          JSON.stringify({
            startTime: timeNow,
          }),
          EventPersistLevel.LEVEL2,
        );
        setStartTime(timeNow);
      }
    }
  }, [activeUids]);

  const formatTime = (currentTime: number, startTime: number) => {
    if (!currentTime || !startTime || currentTime < startTime) {
      return '00:00:00';
    }

    let d = Number((currentTime - startTime) / 1000);

    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    return (
      ('0' + h).slice(-2) +
      ':' +
      ('0' + m).slice(-2) +
      ':' +
      ('0' + s).slice(-2)
    );
  };

  return (
    <View style={{alignSelf: 'center'}}>
      <Text>{formatTime(currentTime, startTime)}</Text>
    </View>
  );
};

const CustomTopbar = () => {
  const recordingLabel = 'Recording';
  const {
    data: {meetingTitle},
  } = useMeetingInfo();
  //built-in nav bar icon buttons
  const [
    CopyJoinInfo,
    ParticipantsCountView,
    ParticipantsIconButton,
    ChatIconButton,
    LayoutIconButton,
    SettingsIconButton,
  ] = NavBarComponentsArray;
  const {isRecordingActive} = useRecording();

  const {isDesktopWidth} = getDimensionData();

  const isWebAOrDesktop = () => isWeb() || isDesktop();

  //re-building the same topbar with timer
  return (
    <View
      style={[
        isWebAOrDesktop() ? style.navHolder : style.navHolderNative,
        {backgroundColor: $config.SECONDARY_FONT_COLOR + 80},
        isWebAOrDesktop()
          ? {
              justifyContent: isMobileOrTablet() ? 'space-between' : 'flex-end',
            }
          : {},
      ]}>
      {isRecordingActive ? (
        <View
          style={[
            style.recordingView,
            {backgroundColor: $config.SECONDARY_FONT_COLOR},
          ]}>
          <UiKitImageIcon
            name={'recordingActiveIcon'}
            style={{
              width: 20,
              height: 20,
              margin: 1,
            }}
            color="#FD0845"
          />
          {!isMobileOrTablet() && (
            <Text
              style={{
                fontSize: isWebAOrDesktop() ? 16 : 12,
                color: '#FD0845',
                fontWeight: '400',
                alignSelf: 'center',
                textAlign: 'center',
                flex: 1,
              }}>
              {recordingLabel}
            </Text>
          )}
        </View>
      ) : (
        <></>
      )}
      <View
        style={[
          style.roomNameContainer,
          // @ts-ignore
          isWebAOrDesktop() && !isMobileOrTablet()
            ? {transform: [{translateX: '50%'}]}
            : {},
        ]}>
        {isWebAOrDesktop() ? (
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
                    ? meetingTitle.slice(0, 13) + '..'
                    : meetingTitle
                  : meetingTitle}
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
            <View
              style={{
                backgroundColor: $config.PRIMARY_FONT_COLOR + '80',
                width: 1,
                height: 'auto',
                marginHorizontal: 10,
              }}
            />
            <Timer />
          </View>
        ) : (
          <View>
            <Text style={style.roomNameText}>
              {meetingTitle.length > 13
                ? meetingTitle.slice(0, 13) + '..'
                : meetingTitle}
            </Text>
          </View>
        )}
      </View>
      <View style={style.navControlBar}>
        <View
          style={[
            style.navContainer,
            {
              minWidth:
                isWebAOrDesktop() && isDesktopWidth
                  ? 300
                  : isMobileOrTablet()
                  ? 160
                  : 200,
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
          {/**
           * In custom-layout - show the layout icon if more than 1 layout provided otherwise hide it from the ui
           */}
          <>
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
          </>
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
    left: isMobileOrTablet() ? '48%' : 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
    backgroundColor: isWeb()
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
});

//overriding the topbar component
const userCustomization = customize({
  components: {
    videoCall: {
      topBar: CustomTopbar,
    },
  },
});

export default userCustomization;
