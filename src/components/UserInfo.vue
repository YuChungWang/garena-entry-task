<template>
  <div class="user-info">
    <div class="chip-balance-section">
      <p v-show="userInfo.chipBalance !== null">
        Chip Balance: {{ userInfo.chipBalance }}
      </p>
      <p
        v-show="homePage.drawStatus === 0 && totalBetChips > 0 && !isWaiting"
        class="text-total-bet-chips"
      >
        - {{totalBetChips}}
      </p>
    </div>
    <div class="user-info-section">
      <p v-show="userInfo.account !== ''" class="user-account">Hi! {{ userInfo.account }}</p>
    </div>
    <a
      href="http://localhost/api/member/login"
      v-if="userInfo.account === ''"
      class="button-login"
    >
      Login
    </a>
    <a
      href="http://localhost/api/member/logout"
      v-else-if="userInfo.account !== ''"
      class="button-logout"
    >
      Logout
    </a>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'UserInfo',
  computed: {
    ...mapState(['userInfo', 'isWaiting', 'homePage']),
    ...mapGetters(['getUserTotalBetChips']),
    totalBetChips() {
      return this.getUserTotalBetChips();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./variables.scss";

.user-info {
  position: relative;
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chip-balance-section {
  display: flex;

  .text-total-bet-chips {
    margin-left: 16px;
    color: $berry-red;
  }
}

.user-info-section {
  width: 220px;
  margin-right: 120px;

  .user-account {
    text-align: right;
  }
}

.button-login, .button-logout {
  position: absolute;
  top: calc(50% - 18px);
  right: 0;
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: white;
  border-radius: 6px;
  background: $button-background-normal;
  transition: .3s background;

  &:hover {
    background: $button-background-hover;
  }
}
</style>
