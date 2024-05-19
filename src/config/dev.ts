import { getExploreName } from '../utils/platform';
import { v4 as uuidv4 } from 'uuid';

export const devConfig = {
  sdkKey: '',
  sdkSecret: '',
  webEndpoint: 'zoom.us',
  topic: 'Daily meeting', // meeting name
  name: `${getExploreName()}-${Math.floor(Math.random() * 1000)}`, // user name
  password: '',
  signature: '',
  sessionKey: '9c14e63b-0fe3-4a09-aaec-c75831a67e8f', // meeting id
  userIdentity: uuidv4(),
  role: 1
};