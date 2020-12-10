<template>
  <div class="betting-history">
    <div class="opened-result">
      <div class="fliter-section">
        <p class="text-filter">Filter by:</p>
        <select v-model="bettingHistory.sortFlag" @change="handleOptionSelected">
          <option :value=0>All</option>
          <option :value=1>Correct</option>
          <option :value=2>Wrong</option>
        </select>
      </div>
      <table class="table-section">
        <tr class="title-bar">
          <th class="column-question">Question</th>
          <th class="column-bet-time">Betting time</th>
          <th class="column-bet-chips">Betting chips</th>
          <th class="column-correct-answer">Given answer</th>
          <th class="column-odds">Odds</th>
          <th class="column-earn">Bonus Chips earned</th>
        </tr>
        <br/>
        <tr v-for="(item, index) in bettingHistory.betList" :key="index">
          <td>{{item.questionId}}</td>
          <td class="text-bet-time">{{item.betTime}}</td>
          <td>{{item.betChips}}</td>
          <td>{{correctAnswerText[item.questionId]}}</td>
          <td>{{item.odds}}</td>
          <td
            class="text-earn"
          >{{item.earn}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'BettingHistory',
  computed: {
    ...mapState(['bettingHistory', 'userInfo']),
    ...mapGetters(['getCorrectAnswerText']),
    correctAnswerText() {
      return this.getCorrectAnswerText();
    },
  },
  methods: {
    ...mapActions(['getBetHistory', 'bettingHistoryMounted']),
    handleOptionSelected(evt) {
      this.getBetHistory(Number(evt.target.value));
    },
  },
  async mounted() {
    this.bettingHistoryMounted();
  },
};
</script>

<style lang="scss" scoped>
@import "../variables.scss";

.betting-history {
  width: 100%;
  min-width: 400px;
  height: 100%;
}

.opened-result {
  position: relative;
  width: 90%;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .fliter-section {
  display: flex;

  .text-filter {
    margin-right: 16px;
  }
}

  .table-section {
    width: 100%;
    margin: 20px auto;

    .title-bar {
      border-bottom: 2px solid $table-border-color;
    }

    tr > th:not(:last-of-type) {
      border-right: 2px solid $table-border-color;
    }

    tr {
      height: 40px;
    }

    tr:nth-child(even) {
      background: rgba($table-background, 0.4);
    }

    .column-question {
      width: 10%;
    }

    .column-bet-time {
      width: 25%;
    }

    .column-bet-chips {
      width: 15%;
    }

    .column-correct-answer {
      width: 18%;
    }

    .column-odds {
      width: 8%;
    }

    .column-earn {
      width: 24%;
    }
  }
}

@media (max-width: $mobile-max-width) {
  .text-bet-time {
    font-size: 12px;
  }
}
</style>
