import React from 'react';
import {ChatBubbleProps, ChatBubble} from 'fpe-api';
import * as filter from 'leo-profanity';

const CustomChatBubble = (props: ChatBubbleProps) => {
  return <ChatBubble {...props} message={filter.clean(props.message)} />;
};

export default CustomChatBubble;
