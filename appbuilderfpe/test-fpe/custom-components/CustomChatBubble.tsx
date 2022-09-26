import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {
  ChatBubbleProps,
  ChatBubble,
  useMessages,
  useChatUIControl,
  useLocalUid,
} from 'customization-api';
import * as leoProfanity from 'leo-profanity';
const CustomChatBubble = (props: ChatBubbleProps) => {
  const [editActive, setEditActive] = useState(false);
  const {editMessage, deleteMessage} = useMessages();
  const localUid = useLocalUid();
  const {privateActive, selectedChatUserId} = useChatUIControl();
  const [editMsgLocal, setEditMsgLocal] = useState('');
  if (editActive) {
    return (
      <>
        <TextInput
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            width: '90%',
            height: 35,
            borderRadius: 20,
            borderWidth: 2,
            paddingHorizontal: 10,
            borderColor: $config.PRIMARY_COLOR,
          }}
          placeholder={'Edit message'}
          onChangeText={(txt) => setEditMsgLocal(txt)}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              //do edit
              editMessage(
                props.msgId,
                editMsgLocal,
                privateActive ? selectedChatUserId : undefined,
              );
              setEditActive(false);
            }}>
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginHorizontal: 10}}
            onPress={() => {
              setEditActive(false);
            }}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
  return (
    <View>
      <ChatBubble
        {...props}
        message={
          props.isDeleted
            ? 'This message was deleted'
            : leoProfanity.clean(props.message)
        }
      />
      {props.uid === localUid && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          {!props?.isDeleted && (
            <>
              <TouchableOpacity
                onPress={() => {
                  setEditActive(true);
                }}>
                <Text>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginHorizontal: 10}}
                onPress={() => {
                  deleteMessage(
                    props.msgId,
                    privateActive ? selectedChatUserId : undefined,
                  );
                }}>
                <Text style={{color: 'red'}}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default CustomChatBubble;
