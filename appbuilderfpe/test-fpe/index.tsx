import {installFPE} from 'fpe-api/install';
import CustomBottomBar from './custom-components/CustomBottomBar';
import TopPinnedVideo from './custom-layout/TopPinnedLayout';
import {CustomWrapperProvider} from './custom-wrapper/CustomWrapper';
import {CustomMaxVideoView} from './custom-components/CustomMaxVideoView';
import {CustomParticipantPanel} from './custom-components/CustomParticipantPanel';
import CustomTitle from './components/CustomTitle';
const userCustomization = installFPE({
  appRoot: CustomWrapperProvider,
  components: {
    videoCall: {
      participantsPanel: CustomParticipantPanel,
      //bottomBar: CustomTitle,
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
            iconName: 'clipboard',
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
        joinRoomButton: 'Join Room edited',
        meetingNameInputPlaceholder: 'Room name edited',
        pstnUserLabel: 'PSTN USER',
      },
    },
  ],
});

export default userCustomization;
