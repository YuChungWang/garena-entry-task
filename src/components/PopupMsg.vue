<template>
  <div class="popup-msg">
    <div class="popup-msg-container">
      <h4 class="title">{{ popupMsg.title }}</h4>
      <p>{{ popupMsg.content }}</p>
      <div class="btn-section">
        <Button
          v-for="button in popupMsg.buttons"
          :key="button.type"
          class="popup-msg-btn"
          @click="handleBtnClick(button.type)"
        >
          {{button.text}}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PopupMsg',
  computed: {
    ...mapState(['popupMsg']),
  },
  methods: {
    ...mapActions(['closePopupMsg', 'formSubmit']),
    handleBtnClick(type) {
      switch (type) {
        case 'cancel':
          this.closePopupMsg();
          break;
        case 'submit':
          this.formSubmit();
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./variables.scss";

.popup-msg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba($popup-msg-background, 0.7);
}

.popup-msg-container {
  position: relative;
  width: 400px;
  height: 260px;
  border-radius: 6px;
  background: white;
  box-shadow: 0px 2px 6px $popup-msg-background;

  .title {
    margin: 40px auto 20px;
  }

  .btn-section {
    position: absolute;
    bottom: 20px;
    width: 100%;

    .popup-msg-btn {
      width: 100px;
      height: 36px;
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

    .popup-msg-btn:not(:first-of-type) {
      margin-left: 24px;
    }
  }
}
</style>
