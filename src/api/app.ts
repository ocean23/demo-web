import instance from '../utils/axios/axiosUtils';

export function getConsumerData() {
  return instance.get('/api/consumer', {});
}

export function loginApi(mobile: string) {
  return instance.post('/auth/login', {
    'mobile': mobile
  });
}

export function positionApi() {
  return instance.get('/api/position');
}


export function positionPublishApi(positionId: string) {
  return instance.put('/api/position/' + positionId + '/publish');
}

export function positionPrivateApi(positionId: string) {
  return instance.put('/api/position/' + positionId + '/private');
}


export function likeApi(positionId: string) {
  return instance.put('/api/candidate/position/' + positionId + "/like");
}

export function unLikeApi(positionId: string) {
  return instance.put('/api/candidate/position/' + positionId + "/unlike");
}

export function likedPositionApi() {
  return instance.get('/api/candidate/position/liked');
}

export function applyPositionApi(positionId: string) {
  return instance.put('/api/candidate/position/' + positionId + '/apply');
}

export function appliedApi() {
  return instance.put('/api/candidate/position/applied');
}
