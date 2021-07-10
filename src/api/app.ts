import instance from '../utils/axios/axiosUtils';

export function getConsumerData() {
  return instance.get('/api/consumer', {});
}
