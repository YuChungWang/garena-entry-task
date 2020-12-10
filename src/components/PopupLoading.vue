<template>
  <div class="popup-loading">
    <div class="content-secion">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupLoading',
};
</script>

<style lang="scss" scoped>
@import "./variables.scss";

.popup-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba($popup-msg-background, 0.7);
  color: $deep-gray;

  .content-secion {
    display: flex;
    align-items: center;
    font-size: 18px;

    .lds-ring {
      display: inline-block;
      position: relative;
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }

    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 20px;
      height: 20px;
      margin: 2px;
      border: 2px solid $dim-gold;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: $dim-gold transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
