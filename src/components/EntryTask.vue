<template>
  <div class="entry-task">
    <div class="user-info-container">
      <UserInfo />
    </div>
    <div class="content-container">
      <div class="nav-button-section">
        <NavButton v-for="navSite in navBtnList" :key="navSite" :navSite="navSite" />
      </div>
      <div class="content-section">
          <transition name="fade">
            <HomePage v-show="site === 'Home Page'"/>
          </transition>
          <transition name="fade">
            <EventRules v-show="site === 'Event Rules'"/>
          </transition>
          <transition name="fade">
            <BettingHistory v-show="site === 'Betting History'"/>
          </transition>
          <transition name="fade">
            <PopupMsg v-show="popupMsg.isShow"/>
          </transition>
          <PopupLoading v-show="popupLoading.isShow"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UserInfo from './UserInfo.vue';
import NavButton from './NavButton.vue';
import HomePage from './HomePage/HomePage.vue';
import EventRules from './EventRules/EventRules.vue';
import BettingHistory from './BettingHistory/BettingHistory.vue';
import PopupMsg from './PopupMsg.vue';
import PopupLoading from './PopupLoading.vue';

export default {
  name: 'EntryTask',
  computed: {
    ...mapState(['site', 'navBtnList', 'popupMsg', 'popupLoading']),
  },
  components: {
    UserInfo,
    NavButton,
    HomePage,
    EventRules,
    BettingHistory,
    PopupMsg,
    PopupLoading,
  },
};
</script>

<style lang="scss" scoped>
@import "./variables.scss";

.entry-task {
  width: 100%;
  height: 100%;
}

.user-info-container {
  width: 100%;
  height: 80px;
}

.content-container {
  position: relative;
  width: 80%;
  margin: 20px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .nav-button-section {
    width: 100%;
    height: 40px;
    display: flex;
    z-index: 1;
  }

  .content-section {
    position: absolute;
    top: 38px;
    width: 100%;
    margin-bottom: 40px;
    min-height: 650px;
    border: 2px solid $border-color;
    box-sizing: border-box;
    overflow: auto;
  }
}

.fade-enter-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
