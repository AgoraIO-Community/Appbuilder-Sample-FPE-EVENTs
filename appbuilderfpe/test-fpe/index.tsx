import {installFPE} from 'fpe-api/install';
/* Custom imports*/
import CustomTitle from './components/CustomTitle';
/*
import NewCustomLayout from './pages/NewCustomLayout';
import ChatBubble from './components/ChatBubble';
*/

const userCustomization = installFPE({
  components: {
    videoCall: {
      bottomBar: CustomTitle,
    },
  },
  // components: {
  //   videoCall: {
  // # Pass a function that returns an array of layout objects to override available layouts
  //     customLayout: (defaultLayouts) => {
  //       return [...defaultLayouts, {
  //           label: 'Vertical',
  //           name: 'vertical_pinned',
  //           iconName: 'screenshare'
  //           component: NewCustomLayout;
  //         }];
  //     },
  // # Pass custom components here to override default components
  //     componentOverrides: {
  //        chatBubble: ChatBubble,
  //     },
  //   },
  // },
});

export default userCustomization;
