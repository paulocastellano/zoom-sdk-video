import { getExploreName } from '../utils/platform';
import { v4 as uuidv4 } from 'uuid';

export const devConfig = {
  sdkKey: '',
  sdkSecret: '',
  webEndpoint: 'zoom.us',
  topic: 'Daily meeting', // meeting name
  name: `${getExploreName()}-${Math.floor(Math.random() * 1000)}`, // user name
  password: '',
  signature:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoibVIwSmJJLUlTNVdEbGNPdjVXRmZmZyIsInJvbGVfdHlwZSI6MSwidHBjIjoiRGFpbHkgbWVldGluZyIsInZlcnNpb24iOjEsImlhdCI6MTcxNjE1MzE4OCwiZXhwIjoxNzE2MTU2Nzg4fQ.p46n0_Zy3FWH_WA7-AOwkWGKOVDjRnfV65_YNpAuZXo',
  sessionKey: '9c14e63b-0fe3-4a09-aaec-c75831a67e8f', // meeting id
  userIdentity: uuidv4(),
  role: 1
};
