import { getExploreName } from '../utils/platform';

export const devConfig = {
  sdkKey: 'mR0JbI-IS5WDlcOv5WFffg',
  sdkSecret: 'KkF0tFIVOa2M4xQSxapDmCCVXcq2oxQPxKKY',
  webEndpoint: 'zoom.us',
  topic: "Paulo Meeting's",
  name: `${getExploreName()}-${Math.floor(Math.random() * 1000)}`,
  password: '',
  signature: '',
  sessionKey: '',
  userIdentity: '',
  role: 1
};
