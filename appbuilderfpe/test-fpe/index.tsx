import {installFPE} from 'fpe-api/install';
import TopPinnedVideo from './custom-layout/TopPinnedLayout';
import {CustomWrapperProvider} from './custom-wrapper/CustomWrapper';
import {CustomMaxVideoView} from './custom-components/CustomMaxVideoView';
import {CustomParticipantPanel} from './custom-components/CustomParticipantPanel';
import CustomTitle from './components/CustomTitle';
import CustomChatBubble from './custom-components/CustomChatBubble';
import CustomTopBar from './custom-components/CustomTopBar';
import CustomBottomBar from './custom-components/CustomBottomBar';
//@ts-ignore
import topPinnedLayoutIcon from './icons8-layout-64.png';
const userCustomization = installFPE({
  appRoot: CustomWrapperProvider,
  components: {
    videoCall: {
      topBar: CustomTopBar,
      chat: {
        chatBubble: CustomChatBubble,
      },
      participantsPanel: CustomParticipantPanel,
      bottomBar: CustomBottomBar,
      customContent: {
        rtc: CustomMaxVideoView,
      },
      customLayout(defaultLayouts) {
        return [
          ...defaultLayouts,
          {
            component: TopPinnedVideo,
            label: 'Top Pinned Layout',
            name: 'TopPinnedLayout',
            icon: topPinnedLayoutIcon,
          },
        ];
      },
    },
  },
  i18n: [
    {
      locale: 'en-us',
      label: 'English',
      data: {
        joinRoomButton: 'Join Room',
        meetingNameInputPlaceholder: 'Room name',
        pstnUserLabel: 'PSTN USER',
      },
    },
  ],
});

export default userCustomization;
