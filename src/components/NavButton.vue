<template>
  <Button
    :class="['nav-button', {'selected': site === navSite}]"
    @click="handleNavBtnClick"
  >
    {{ navSite }}
  </Button>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'NavButton',
  props: {
    navSite: String,
  },
  computed: {
    ...mapState(['site', 'navBtnList']),
    classObject() {
      return {
        selected: this.site === this.navSite,
      };
    },
  },
  methods: {
    ...mapActions(['updateSite']),
    handleNavBtnClick() {
      this.updateSite(this.navSite);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./variables.scss";

.nav-button {
  position: relative;
  width: 130px;
  height: 100%;
  border: 2px solid white;
  border-bottom: 2px solid $border-color;
  box-sizing: border-box;
  font-size: 14px;

  &::before, &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 2px;
    height: 2px;
    background: $border-color;
  }

  &::before {
    left: -2px;
  }

  &::after {
    right: -2px;
  }
}

.selected {
  border: 2px solid $border-color;
  border-bottom: 2px solid white;
}
</style>
