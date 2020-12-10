import utils from '../utils';

const getUserInfo = async () => {
  await utils.delay(200);
  // throw new Error('error');
  return utils.transformer.camelizeKeys({
    // login
    account: '123',
    chip_balance: 500,
    isWithdraw: 0,
    bet_list: [],
    // login (givenAnswer)
    // account: 'Jackylove',
    // chip_balance: 100,
    // isWithdraw: 0,
    // bet_list: [
    //   {
    //     question_id: 1,
    //     bet_chips: 2,
    //     given_answer: 1,
    //     earn: 4,
    //   },
    //   {
    //     question_id: 2,
    //     bet_chips: 4,
    //     given_answer: 1,
    //     earn: 12,
    //   },
    //   {
    //     question_id: 3,
    //     bet_chips: 8,
    //     given_answer: 2,
    //     earn: 0,
    //   },
    //   {
    //     question_id: 4,
    //     bet_chips: 16,
    //     given_answer: 0,
    //     earn: 0,
    //   },
    // ],
    // un-login
    // account: '',
    // chip_balance: null,
    // bet_list: [],
  });
};

const getHomepageContent = async () => {
  await utils.delay(200);
  return utils.transformer.camelizeKeys({
    title: 'S9 Worlds Pick’em',
    draw_status: 0,
    questions: [
      {
        question_id: 1,
        question_name: 'Will Faker use hero Arika in S9?',
        odds: 2,
        options: [
          'Yes',
          'No',
        ],
        correct_answer: 1,
      },
      {
        question_id: 2,
        question_name: 'Which of the following team will be the first runner-up of S9?',
        odds: 3,
        options: [
          'RNG',
          'FNC',
          'GNF',
          'G2',
        ],
        correct_answer: 1,
      },
      {
        question_id: 3,
        question_name: 'Which of the following team will be the champion of S9?',
        odds: 2,
        options: [
          'SKT',
          'G2',
          'IG',
          'FNC',
        ],
        correct_answer: 1,
      },
      {
        question_id: 4,
        question_name: 'Will Theshy be the S9 MVP?',
        odds: 2,
        options: [
          'Yes',
          'No',
        ],
        correct_answer: 1,
      },
    ],
  });
};

const postQuestionList = async () => {
  await utils.delay(200);
  return utils.transformer.camelizeKeys({
    chip_balance: 490,
  });
};

const getBetHistory = async (sortFlag) => {
  await utils.delay(200);
  let betList = [];
  if (sortFlag === 0) {
    betList = [
      {
        question_id: 1,
        bet_time: '2020-04-14 11:00:00',
        bet_chips: 2,
        correct_answer: 1,
        odds: 2,
        earn: 4,
      },
      {
        question_id: 2,
        bet_time: '2020-04-14 11:00:00',
        bet_chips: 4,
        correct_answer: 2,
        odds: 3,
        earn: 12,
      },
      {
        question_id: 3,
        bet_time: '2020-04-14 11:00:00',
        bet_chips: 8,
        correct_answer: 2,
        odds: 2,
        earn: 0,
      },
      {
        question_id: 4,
        bet_time: '2020-04-14 11:00:00',
        bet_chips: 16,
        correct_answer: 0,
        odds: 2,
        earn: 0,
      },
    ];
  } else if (sortFlag === 1) {
    betList = [
      {
        question_id: 1,
        bet_time: '2020-04-14 11:00:00',
        bet_chips: 2,
        correct_answer: 1,
        odds: 2,
        earn: 4,
      },
      {
        question_id: 2,
        bet_time: '2020-04-14 11:00:00',
        bet_chips: 4,
        correct_answer: 1,
        odds: 3,
        earn: 12,
      },
    ];
  } else if (sortFlag === 2) {
    betList = [
      {
        question_id: 3,
        bet_time: '2020-04-14 11:00:00',
        bet_chips: 8,
        correct_answer: 1,
        odds: 2,
        earn: 0,
      },
      {
        question_id: 4,
        bet_time: '2020-04-14 11:00:00',
        bet_chips: 16,
        correct_answer: 1,
        odds: 2,
        earn: 0,
      },
    ];
  }
  return utils.transformer.camelizeKeys({
    betList,
  });
};

const postDrawStatus = async () => {
  await utils.delay(200);
  return utils.transformer.camelizeKeys({
    draw_status: true,
  });
};

const postBonusChip = async () => {
  await utils.delay(200);
  return utils.transformer.camelizeKeys({
    chip_balance: 200,
  });
};

const login = async () => {
  await utils.delay(200);
};

const logout = async () => {
  await utils.delay(200);
};

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
