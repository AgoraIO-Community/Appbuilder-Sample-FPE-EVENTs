import {
  ChatTextInputProps,
  MESSAGE_TYPE,
  useChatUIControl,
  useSendMessage,
  TextInput,
} from 'customization-api';
import React from 'react';
import * as leoProfanity from 'leo-profanity';

export default function CustomChatInput(props: ChatTextInputProps) {
  const {
    selectedChatUserId: selectedUserId,
    message,
    setMessage,
  } = useChatUIControl();
  const sendChatMessage = useSendMessage();
  const chatMessageInputPlaceholder = 'Type your message..';
  const onChangeText = (text: string) => setMessage(text);
  const onSubmitEditing = () => {
    if (!selectedUserId) {
      sendChatMessage(MESSAGE_TYPE.group, leoProfanity.clean(message));
      setMessage('');
    } else {
      sendChatMessage(
        MESSAGE_TYPE.private,
        leoProfanity.clean(message),
        selectedUserId,
      );
      setMessage('');
    }
  };

  return (
    <>
      <TextInput
        value={message}
        onChangeText={onChangeText}
        style={{
          borderRadius: 10,
          backgroundColor: $config.PRIMARY_FONT_COLOR + '10',
          borderColor: $config.PRIMARY_COLOR,
          borderWidth: 1,
          color: $config.PRIMARY_FONT_COLOR,
          textAlign: 'left',
          height: 40,
          paddingVertical: 10,
          flex: 1,
          alignSelf: 'center',
        }}
        blurOnSubmit={false}
        onSubmitEditing={onSubmitEditing}
        placeholder={chatMessageInputPlaceholder}
        placeholderTextColor={$config.PRIMARY_FONT_COLOR}
        autoCorrect={false}
      />
    </>
  );
}
