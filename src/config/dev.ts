import { getExploreName } from '../utils/platform';

export const devConfig = {
  sdkKey: '',
  sdkSecret: '',
  webEndpoint: 'zoom.us',
  topic: '20 may daily', // meeting name
  name: `${getExploreName()}-${Math.floor(Math.random() * 1000)}`, // user name
  password: '',
  signature:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoibVIwSmJJLUlTNVdEbGNPdjVXRmZmZyIsInJvbGVfdHlwZSI6MSwidHBjIjoiMjAgbWF5IGRhaWx5IiwidmVyc2lvbiI6MSwiaWF0IjoxNzE2MTUyMzY0LCJleHAiOjE3MTYxNTU5NjR9.iCYblH6vSKeka7R2TDZuw7x6X_pd8oGp9ezIBHaXHsA',
  sessionKey: '', // meeting id
  userIdentity: '', // user id
  role: 1
};
