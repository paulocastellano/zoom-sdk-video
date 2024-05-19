import { getExploreName } from '../utils/platform';

export const devConfig = {
  sdkKey: '',
  sdkSecret: '',
  webEndpoint: 'zoom.us',
  topic: 'DailyMeeting', // meeting name
  name: `${getExploreName()}-${Math.floor(Math.random() * 1000)}`, // user name
  password: '',
  signature: '',
  sessionKey: '', // meeting id
  userIdentity: '',
  role: 1
};
