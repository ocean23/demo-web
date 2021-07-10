import instance from '../utils/axios/axiosUtils';
import configEnv from '../utils/config';

export function getConsumerData() {
  return instance.get('/consumer', {});
}
