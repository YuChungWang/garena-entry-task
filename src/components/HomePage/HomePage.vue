<template>
  <div
    :class="['home-page', {
      'point-event-none':
        userInfo.account === '' ||
        homePage.drawStatus === 1 ||
        (homePage.drawStatus === 0 && isWaiting)
    }]"
    v-if="homePage.isInitialized"
  >
    <h3 class="title">{{ homePage.title }}</h3>
      <div
        v-for="(questionItem, questionIndex) in homePage.questions"
        :key="questionItem.questionId"
        :questionItem="questionItem"
        :class="['question-item',{
          'is-claimed': homePage.drawStatus === 1 && userInfo.account !== ''
        }]"
      >
        <div class="question-section">
          <div class="question-info-section">
            <h4 class="question-id">Q{{ questionItem.questionId }}</h4>
            <div class="question-text-odds-section">
              <span class="question-text">{{ questionItem.questionName }}</span>
              <span class="question-odds">*Odds: {{ questionItem.odds }}</span>
            </div>
          </div>
          <div class="question-option-section">
            <form
              v-for="(option, optionIndex) in questionItem.options"
              :key="questionItem.questionId + '-' + optionIndex"
              class="question-option"
            >
            <input
              type="radio"
              :id="formControl.betList[questionIndex].questionId + '-' + optionIndex"
              :value="optionIndex"
              :name="questionIndex"
              :disabled="userInfo.account === ''"
              v-model="formControl.betList[questionIndex].givenAnswer"
            >
              <label
                :for="formControl.betList[questionIndex].questionId + '-' + optionIndex"
                :class="['input-radio', {
                  selected: homePage.drawStatus === 0 &&
                    formControl.betList[questionIndex].givenAnswer === optionIndex,
                  correct: userInfo.account !== '' && homePage.drawStatus === 1 &&
                    homePage.questions[questionIndex].correctAnswer === optionIndex,
                  ['correct-icon']: homePage.drawStatus === 1 &&
                    homePage.questions[questionIndex].correctAnswer === optionIndex &&
                    formControl.betList[questionIndex].givenAnswer === optionIndex,
                  wrong: homePage.drawStatus === 1 &&
                    homePage.questions[questionIndex].correctAnswer
                      !== formControl.betList[questionIndex].givenAnswer &&
                    formControl.betList[questionIndex].givenAnswer === optionIndex
                }]"
              >
                {{ option }}
              </label>
            </form>
          </div>
          <div v-if="homePage.drawStatus === 1 && userInfo.account !== ''" class="earn-section">
            <span>Bouns chips earned:</span>
            <span
              :class="[
                'text-bonus-chip',
                {['text-win']:
                  userInfo.betList.find(
                    (item) => item.questionId === questionItem.questionId).earn > 0
                }]"
            >
              {{userInfo.betList.find((item) => item.questionId === questionItem.questionId).earn}}
            </span>
          </div>
        </div>
        <div class="bet-amount-section">
          <p class="text-bet-amount">bet amount</p>
          <input
            type="number"
            v-model.number="formControl.betList[questionIndex].betChips"
            class="input-bet-amount"
            :disabled="userInfo.account === ''"
          >
        </div>
      </div>
      <Button
        v-show="!isWaiting && homePage.drawStatus === 0 || userInfo.account === ''"
        class="button-confirm"
        :disabled="!isFormEnable"
        @click="handleConfirmBtnClick"
      >
        Confirm
      </Button>
      <Button
        v-show="!isWaiting && homePage.drawStatus === 1 && userInfo.account !== ''"
        class="button-claim"
        :disabled="userInfo.isWithdraw === 1"
        @click="handleClaimBtnClick"
      >
        Claim Bunus Chips
      </Button>
      <div
        v-show="isWaiting && homePage.drawStatus === 0 && userInfo.account !== ''"
        class="waiting-section"
      >
        <p>waiting for result to be revealed</p>
        <button
          class="button-refresh"
          @click="handleRefreshBtnClick()"
        />
      </div>
    </div>
  </template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import _ from 'lodash';

export default {
  name: 'HomePage',
  computed: {
    ...mapState(['isWaiting', 'userInfo', 'homePage', 'formControl']),
    ...mapGetters(['isFormEnable', 'getUserTotalBetChips']),
  },
  methods: {
    ...mapActions(['homePageMounted', 'showPopupMsg', 'updateChipBalance', 'getUserInfo', 'postDrawStatus', 'updateChipBalance']),
    handleConfirmBtnClick() {
      let payload = {};
      if (this.getUserTotalBetChips() > this.userInfo.chipBalance) {
        payload = {
          title: 'Notice',
          content: 'over chip balance. Please re-bet',
          buttons: [
            {
              type: 'cancel',
              text: 'Confirm',
            },
          ],
        };
      } else {
        payload = {
          title: 'Notice',
          content: 'You will be spending total betChips chips in this round.',
          buttons: [
            {
              type: 'cancel',
              text: 'Cancel',
            },
            {
              type: 'submit',
              text: 'Confirm',
            },
          ],
        };
      }
      this.showPopupMsg(payload);
    },
    handleClaimBtnClick() {
      const payload = {
        title: 'Notice',
        content: 'You have earned total totalEarn bonus chips in this round.',
        buttons: [
          {
            type: 'cancel',
            text: 'Confirm',
          },
        ],
      };
      this.updateChipBalance();
      this.showPopupMsg(payload);
    },
    handleRefreshBtnClick() {
      console.warn('refresh');
      this.postDrawStatus();
    },
  },
  created() {
    this.handleRefreshBtnClick = _.throttle(this.handleRefreshBtnClick, 1000);
  },
  mounted() {
    this.homePageMounted();
  },
};
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.home-page {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  &.point-event-none .question-item {
    pointer-events: none;
  }
}

.title {
  margin: 40px auto 36px;
}

.waiting-section {
  width: 300px;
  margin: 0 auto 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-confirm, .button-claim {
  width: 160px;
  height: 36px;
  margin: 0 auto 40px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  border-radius: 6px;
  background: $button-background-normal;
  transition: .3s background;

  &:hover {
    background: $button-background-hover;
  }

  &:disabled {
    background: $button-background-disabled;
    cursor: auto;
  }
}

.button-refresh {
  margin-left: 16px;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: $button-background-normal url('../../assets/icon-reload.png') center no-repeat;
  background-size: 16px 16px;
  transition: .3s background;

  &:hover {
    background: $button-background-hover url('../../assets/icon-reload.png') center no-repeat;
    background-size: 16px 16px;
  }
}

.question-item {
  width: 100%;
  margin: 0 auto 40px;
  display: flex;
  justify-content: space-between;

  &.is-claimed {
    margin-bottom: 18px;
  }
}

.question-section {
  width: 80%;

  .question-info-section {
    margin-bottom: 12px;
    display: flex;

    .question-id {
      margin-right: 6px;
    }

    .question-text-odds-section {
      text-align: justify;
      word-wrap: break-word;

      .question-text {
        margin-right: 16px;
      }

      .question-odds {
        color: $text-odds-color;
      }
    }
  }
}

.question-option-section {
  display: flex;
  flex-wrap: wrap;

  .question-option {
    display: flex;
    margin: 0 16px 4px 0;
  }

  .input-radio {
    width: 100px;
    height: 36px;
    border: 2px solid $input-radio-border-normal;
    border-radius: 6px;
    margin-right: 6px;
    padding-top: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      background: $input-radio-background-hover;
      border-color: $input-radio-border-hover;
    }

    &.selected, &.correct {
      background: $input-radio-background-hover;
      border-color: $input-radio-border-hover;
    }

    &.correct-icon {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 2px;
        right: 2px;
        width: 16px;
        height: 16px;
        background: url('../../assets/icon-correct.png') center no-repeat;
        background-size: contain;
      }
    }

    &.wrong {
      position: relative;
      background: $input-radio-border-wrong;
      border-color: $input-radio-background-wrong;

      &::after {
        content: '';
        position: absolute;
        top: 2px;
        right: 2px;
        width: 16px;
        height: 16px;
        background: url('../../assets/icon-wrong.png') center no-repeat;
        background-size: contain;
      }
    }
  }
}

.earn-section {
  display: flex;
  margin-top: 8px;

  .text-bonus-chip {
    font-weight: 600;
    margin-left: 4px;
    color: $berry-red;

    &.text-win {
      color: $bright-green;
    }
  }
}

input[type="radio"]:disabled+label {
  color: white;
  background: rgba($button-background-disabled, 0.7);
  pointer-events: none;
  cursor: auto;
}

input[type="number"]:disabled {
  background: rgba($input-background-disabled, 0.7);
}

.bet-amount-section {
  width: 100px;
  display: flex;
  flex-direction: column;

  .text-bet-amount {
    margin-bottom: 12px;
  }

  .input-bet-amount {
    width: 100%;
    height: 36px;
    text-align: center;
  }
}

@media (max-width: $mobile-max-width) {
  .question-item {
    flex-direction: column;
  }

  .question-section {
    width: 100%;
  }

  .bet-amount-section {
    width: 100%;
    margin-top: 8px;
    flex-direction: row;
    align-items: center;

    .text-bet-amount {
      width: 138px;
      margin-right: 14px;
      margin-bottom: 0;
    }

    .input-answer {
      width: 100px;
    }
  }
}
</style>
