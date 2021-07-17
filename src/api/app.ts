import instance from '../utils/axios/axiosUtils';

export function getConsumerData() {
  return instance.get('/api/consumer', {});
}

export function loginApi(mobile: string) {
  return instance.post('/auth/login', {
    'mobile':mobile
  });
}
