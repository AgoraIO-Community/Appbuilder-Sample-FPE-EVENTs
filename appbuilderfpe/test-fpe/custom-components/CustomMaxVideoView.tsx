import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  NetworkQualityPill,
  RenderInterface,
  NameWithMicIcon,
  UiKitMaxVideoView,
  config,
} from 'customization-api';

interface MaxVideoRendererInterface {
  user: RenderInterface;
}
const CustomMaxVideoView: React.FC<MaxVideoRendererInterface> = ({user}) => {
  return (
    <View style={maxStyle.container}>
      <NetworkQualityPill
        user={user}
        primaryColor={config.PRIMARY_COLOR}
        rootStyle={{
          marginLeft: 10,
          top: 8,
          left: 5,
        }}
      />
      <UiKitMaxVideoView
        fallback={() => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignContent: 'center',
                borderRadius: 15,
              }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: config.PRIMARY_COLOR,
                  alignSelf: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  shadowColor: config.PRIMARY_COLOR,
                  shadowRadius: 20,
                }}>
                <Text
                  style={{
                    color: config.SECONDARY_FONT_COLOR,
                    fontSize: 20,
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {user?.name ? user.name[0]?.toUpperCase() : 'U'}
                </Text>
              </View>
            </View>
          );
        }}
        user={user}
        key={user.uid}
      />
      <View style={maxStyle.nameHolder}>
        <NameWithMicIcon user={user} />
      </View>
    </View>
  );
};

const maxStyle = StyleSheet.create({
  container: {width: '100%', height: '100%'},
  width80: {width: '80%'},
  width100: {width: '100%'},
  flex2: {flex: 2},
  flex4: {flex: 4, backgroundColor: '#ffffff00'},
  flex1: {flex: 1},
  nameHolder: {
    marginTop: -25,
    backgroundColor: config.SECONDARY_FONT_COLOR + 'aa',
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    height: 25,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    zIndex: 5,
    maxWidth: '100%',
  },
  name: {
    color: config.PRIMARY_FONT_COLOR,
    lineHeight: 25,
    fontWeight: '700',
    flexShrink: 1,
  },
  MicBackdrop: {
    width: 20,
    height: 20,
    borderRadius: 15,
    marginHorizontal: 10,
    backgroundColor: config.SECONDARY_FONT_COLOR,
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  MicIcon: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export {CustomMaxVideoView};
