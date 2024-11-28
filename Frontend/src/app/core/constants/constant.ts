const api = 'http://localhost:3000/v1/api';
export const apiEndPoint = {
  Auth: {
    login: `${api}/login`,
    register: `${api}/register`,
    refreshToken: `${api}/refresh-token`,
  },
  Admin: {
    listUser: `${api}/admin/user`,
    getUserById: `${api}/admin/user/:id`,
    lockUser: `${api}/admin/user/:id`,
    deleteUserById: `${api}/admin/user/:id`
  },
  Address:{
    getAllProvinces: `${api}/address/p`,
    getProvinceById: `${api}/address/p/:id`,
    getAllDistricts: `${api}/address/d`,
    getDistrictById: `${api}/address/d/:id`,
    getDistrictsByCodeProvince:`${api}/address/d/search`,
    getAllWards: `${api}/address/w`,
    getWardById: `${api}/address/w/:id`,
    getWardsByCodeDistrict:`${api}/address/w/search`,
  }
};

export const localStorage = {
  token: 'USER_TOKEN',
}
