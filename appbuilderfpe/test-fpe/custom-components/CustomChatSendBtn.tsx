import React from 'react';
import {
  ChatSendButtonProps,
  icons,
  MESSAGE_TYPE,
  useChatUIControl,
  useSendMessage,
} from 'customization-api';
import {TouchableOpacity, Image} from 'react-native';
import * as leoProfanity from 'leo-profanity';

export default function CustomChatSendBtn(props: ChatSendButtonProps) {
  const {
    selectedChatUserId: selectedUserId,
    message,
    setMessage,
  } = useChatUIControl();
  const sendChatMessage = useSendMessage();
  const onPress = () => {
    if (!selectedUserId) {
      sendChatMessage(MESSAGE_TYPE.group, leoProfanity.clean(message));
      setMessage && setMessage('');
    } else {
      sendChatMessage(
        MESSAGE_TYPE.private,
        leoProfanity.clean(message),
        selectedUserId,
      );
      setMessage && setMessage('');
    }
  };
  return (
    <TouchableOpacity
      style={{
        width: 30,
        marginRight: 0,
        height: 30,
        borderRadius: 30,
        alignSelf: 'center',
        marginHorizontal: 10,
        backgroundColor: $config.PRIMARY_COLOR,
        display: 'flex',
        justifyContent: 'center',
      }}
      onPress={onPress}>
      <Image
        source={{
          uri: icons.send,
        }}
        style={{
          width: '80%',
          height: '80%',
          alignSelf: 'center',
          transform: [
            {
              translateX: -2,
            },
          ],
        }}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );
}
