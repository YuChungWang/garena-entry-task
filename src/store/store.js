import Vue from 'vue';
import Vuex from 'vuex';
import services from '../services';
import utils from '../utils';

Vue.use(Vuex);

// mutations
const CHANGE_SITE = 'CHANGE_SITE';
const SET_WAITING_STATUS = 'SET_WAITING_STATUS';
const UPDATE_CLAIM_STATUS = 'UPDATE_CLAIM_STATUS';

// formControl
const SET_FORM_CONTROL = 'SET_FORM_CONTROL';

// userInfo
const SET_USER_INFO = 'SET_USER_INFO';
const UPDATE_CHIP_BALANCE = 'UPDATE_CHIP_BALANCE';

// homePage
const SET_HOME_PAGE_CONTENT = 'SET_HOME_PAGE_CONTENT';

// historyList
const SET_HISTORY_LIST = 'SET_HISTORY_LIST';

const SHOW_POPUP_MSG = 'SHOW_POPUP_MSG';
const CLOSE_POPUP_MSG = 'CLOSE_POPUP_MSG';
const SHOW_POPUP_LOADING = 'SHOW_POPUP_LOADING';
const CLOSE_POPUP_LOADING = 'CLOSE_POPUP_LOADING';

export default new Vuex.Store({
  state: {
    site: 'Home Page',
    navBtnList: ['Home Page', 'Event Rules', 'Betting History'],
    isWaiting: false,
    isClaimed: false,
    formControl: {
      betList: [],
    },
    userInfo: {
      account: '',
      chipBalance: null,
      betList: [],
    },
    homePage: {
      isInitialized: false,
    },
    eventRules: {
      title: '2020 Predator League 英雄聯盟校際盃校際賽報名延長啦～～～',
      content: '2020 Predator League 英雄聯盟校際盃報名延長到到 04/12 (日) 並送上報名好禮加碼，只要報名就直接送精雕寶箱與鑰匙 1 組！還沒找到隊友的同學，快點趁著這一波站出來吧！\n同時，Predator 也加碼送出 5 支電競滑鼠，快到【英雄聯盟粉絲團】指定貼文按讚留言並公開分享，就有機會抽到限量的電競滑鼠喔！※ 同一參加人僅有一次獲獎機會，重複留言中獎將遞補給下一位幸運兒；獎項將由執行單位 Cyber Games Arena 進行派發。《2020 Predator League 英雄聯盟校際盃》為每年校園召喚師之間的年度盛事；為了全台喜歡英雄聯盟的學生所舉辦的比賽，2020 Predator League 英雄聯盟校際盃校際賽，即日起開放報名，超多好禮等你來拿，別在猶豫了，快號召同校的召喚師同學，一同為榮譽而戰吧。',
    },
    bettingHistory: {
      sortFlag: 0,
      betList: [],
    },
    popupMsg: {
      isShow: false,
      type: '',
      title: '',
      content: '',
      buttons: [],
    },
    popupLoading: {
      isShow: false,
    },
  },
  getters: {
    isFormEnable:
      (state) => state.homePage.drawStatus === 0 && state.formControl.betList.every(
        ({ givenAnswer, betChips }) => ![givenAnswer, betChips].includes(null)),
    getUserTotalBetChips:
      (state) => () => state.formControl.betList.reduce((acc, { betChips }) => acc + betChips, 0),
    getUserTotalEarn:
      (state) => () => state.userInfo.betList.reduce((acc, { earn }) => acc + earn, 0),
    getCorrectAnswerText:
      (state) => () => {
        const correctTextObject = {};
        if (state.homePage.questions) {
          state.bettingHistory.betList.forEach((item) => {
            correctTextObject[item.questionId] = state.homePage.questions.find(
              (question) => question.questionId === item.questionId).options[item.correctAnswer];
          });
        }
        return correctTextObject;
      },
  },
  mutations: {
    [CHANGE_SITE](state, payload) {
      state.site = payload;
    },
    [SET_FORM_CONTROL](state, payload) {
      state.formControl.betList = payload;
    },
    [SET_USER_INFO](state, payload) {
      state.userInfo = payload;
    },
    [SET_WAITING_STATUS](state, payload) {
      state.isWaiting = payload;
    },
    [UPDATE_CHIP_BALANCE](state, chipBalance) {
      state.userInfo.chipBalance = chipBalance;
    },
    [UPDATE_CLAIM_STATUS](state, payload) {
      state.isClaimed = payload;
    },
    [SET_HOME_PAGE_CONTENT](state, { homePageContent, isWaiting = false }) {
      state.homePage = homePageContent;
      state.isWaiting = isWaiting;
      state.homePage.isInitialized = true;
    },
    [SET_HISTORY_LIST](state, betList) {
      state.bettingHistory.betList = betList;
    },
    [SHOW_POPUP_MSG](state, { type = 'msg', title, content, buttons }) {
      if (type === 'error') {
        state.popupMsg.content = content;
      } else if (state.homePage.drawStatus === 0) {
        const totalBetChips = this.getters.getUserTotalBetChips();
        state.popupMsg.content = content.replace('betChips', totalBetChips);
      } else if (state.homePage.drawStatus === 1) {
        const totalEarn = this.getters.getUserTotalEarn();
        state.popupMsg.content = content.replace('totalEarn', totalEarn);
      }
      state.popupMsg.isShow = true;
      state.popupMsg.title = title;
      state.popupMsg.buttons = buttons;
    },
    [CLOSE_POPUP_MSG](state) {
      state.popupMsg.isShow = false;
      state.popupMsg.title = '';
      state.popupMsg.content = '';
      state.popupMsg.buttons = [];
    },
    [SHOW_POPUP_LOADING](state) {
      state.popupLoading.isShow = true;
    },
    [CLOSE_POPUP_LOADING](state) {
      state.popupLoading.isShow = false;
    },
  },
  actions: {
    updateSite({ commit }, site) {
      commit(CHANGE_SITE, site);
    },
    showPopupMsg({ commit }, payload) {
      commit(SHOW_POPUP_MSG, payload);
    },
    closePopupMsg({ commit }) {
      commit(CLOSE_POPUP_MSG);
    },
    showErrorMsg({ commit }, message) {
      const payload = {
        type: 'error',
        title: 'Notice',
        content: message,
        buttons: [
          {
            type: 'cancel',
            text: 'Confirm',
          },
        ],
      };
      commit(SHOW_POPUP_MSG, payload);
    },
    async getUserInfo({ commit, dispatch }) {
      try {
        commit(SHOW_POPUP_LOADING);
        const { userInfo } = await utils.axiosWithTimeout(
          services.getUserInfo(),
          5000,
        );
        commit(SET_USER_INFO, userInfo);
        commit(CLOSE_POPUP_LOADING);
      } catch (error) {
        dispatch('showErrorMsg');
      }
    },
    async homePageMounted({ commit, dispatch }) {
      try {
        const [userInfo, homePageContent] = await utils.axiosWithTimeout(
          Promise.all([services.getUserInfo(), services.getHomepageContent()]),
          5000,
        );

        let betList = [];
        if (userInfo === '' || userInfo.betList.length === 0) {
          homePageContent.questions.forEach((item) => {
            betList.push({
              questionId: item.questionId,
              givenAnswer: null,
              betChips: null,
            });
          });
        } else {
          betList = userInfo.betList;
        }

        let isWaiting = false;
        if (homePageContent.drawStatus === 0 && userInfo !== '' && userInfo.betList.length > 0) {
          isWaiting = true;
        }
        commit(SET_FORM_CONTROL, betList);
        if (userInfo !== '') {
          commit(SET_USER_INFO, userInfo);
        }
        commit(SET_HOME_PAGE_CONTENT, { homePageContent, isWaiting });
      } catch (error) {
        console.warn(error.message);
        dispatch('showErrorMsg', error.message);
      }
    },
    async formSubmit({ state, commit, dispatch }) {
      try {
        const questions = state.formControl.betList;

        commit(SHOW_POPUP_LOADING);
        const { chipBalance } = await utils.axiosWithTimeout(
          services.postQuestionList(questions),
          5000,
        );
        const payload = {
          title: 'Success',
          content: 'Bet Success',
        };
        commit(CLOSE_POPUP_LOADING);
        commit(SHOW_POPUP_MSG, payload);
        commit(UPDATE_CHIP_BALANCE, chipBalance);
        commit(SET_WAITING_STATUS, true);
        setTimeout(() => {
          commit(CLOSE_POPUP_MSG);
        }, 3000);
      } catch (error) {
        dispatch('showErrorMsg');
        commit(CLOSE_POPUP_LOADING);
      }
    },
    async postDrawStatus({ commit, dispatch }) {
      try {
        const [userInfo, homePageContent] = await utils.axiosWithTimeout(
          Promise.all([services.getUserInfo(), services.getHomepageContent()]),
          5000,
        );

        let isWaiting = false;
        if (homePageContent.drawStatus === 0 && userInfo !== '' && userInfo.betList.length > 0) {
          isWaiting = true;
        }
        commit(SET_USER_INFO, userInfo);
        commit(SET_HOME_PAGE_CONTENT, { homePageContent, isWaiting });
      } catch (error) {
        dispatch('showErrorMsg');
      }
    },
    async updateChipBalance({ getters, commit, dispatch }) {
      try {
        const userTotalEarn = getters.getUserTotalEarn();
        const { chipBalance } = await utils.axiosWithTimeout(
          services.postBonusChip(userTotalEarn),
          5000,
        );
        const { userInfo } = await utils.axiosWithTimeout(
          services.getUserInfo(),
          5000,
        );
        commit(UPDATE_CHIP_BALANCE, chipBalance);
        commit(SET_USER_INFO, userInfo);
      } catch (error) {
        dispatch('showErrorMsg');
      }
    },
    async bettingHistoryMounted({ commit, dispatch }) {
      try {
        const { betList } = await utils.axiosWithTimeout(
          services.getBetHistory(0),
          5000,
        );
        commit(SET_HISTORY_LIST, betList);
      } catch (error) {
        dispatch('showErrorMsg');
      }
    },
    async getBetHistory({ commit, dispatch }, sortFlag) {
      try {
        commit(SHOW_POPUP_LOADING);
        const { betList } = await utils.axiosWithTimeout(
          services.getBetHistory(sortFlag),
          5000,
        );
        commit(SET_HISTORY_LIST, betList);
        commit(CLOSE_POPUP_LOADING);
      } catch (error) {
        dispatch('showErrorMsg');
      }
    },
    async userLogin({ dispatch }) {
      try {
        await utils.axiosWithTimeout(
          services.login(),
          5000,
        );
      } catch (error) {
        dispatch('showErrorMsg');
      }
    },
    async userLogout({ dispatch }) {
      try {
        await utils.axiosWithTimeout(
          services.logout(),
          5000,
        );
      } catch (error) {
        dispatch('showErrorMsg');
      }
    },
  },
});
