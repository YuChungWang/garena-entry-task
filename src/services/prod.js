import axios from 'axios';
import utils from '../utils';

const getUserInfo = async () => axios({
  method: 'get',
  baseURL: '',
  url: '/api/member/user_info',
}).then(({ data }) => utils.transformer.camelizeKeys(data));

const getHomepageContent = async () => axios({
  method: 'get',
  baseURL: '',
  url: '/api/question/homepage_content',
}).then(({ data }) => utils.transformer.camelizeKeys(data));

const postQuestionList = async (param) => {
  const snakifyParam = utils.transformer.snakifyKeys(param);
  return axios({
    method: 'post',
    baseURL: '',
    url: '/api/history/bet',
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
    data: {
      questions: snakifyParam,
    },
  }).then(({ data }) => utils.transformer.camelizeKeys(data));
};

const postDrawStatus = async (param) =>
  axios({
    method: 'post',
    baseURL: '',
    url: '/api/setting/draw',
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
    data: {
      is_draw: param,
    },
  }).then(({ data }) => utils.transformer.camelizeKeys(data));

const postBonusChip = async (param) => axios({
  method: 'post',
  baseURL: '',
  url: '/api/member/bonus_chips',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
  data: {
    chips: param,
  },
}).then(({ data }) => utils.transformer.camelizeKeys(data));

const getBetHistory = async (param) => axios({
  method: 'get',
  baseURL: '',
  url: '/api/history/bet_history',
  params: {
    sort_flag: param,
  },
}).then(({ data }) => utils.transformer.camelizeKeys(data));

const login = async () => axios({
  method: 'get',
  baseURL: '',
  url: '/api/member/login',
}).then(({ data }) => console.warn(data));

const logout = async () => axios({
  method: 'post',
  baseURL: '',
  url: '/api/member/logout',
}).then(({ data }) => console.warn(data));

export default {
  getUserInfo,
  getHomepageContent,
  postQuestionList,
  postDrawStatus,
  postBonusChip,
  getBetHistory,
  login,
  logout,
};
