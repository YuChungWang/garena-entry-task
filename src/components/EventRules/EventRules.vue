<template>
  <div class="event-rules">
    <h3 class="title">{{ eventRules.title }}</h3>
    <p class="content">{{ eventRules.content }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'EventRules',
  computed: {
    ...mapState(['eventRules']),
  },
};
</script>

<style scoped>
.event-rules {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.title {
  margin: 40px auto 36px;
}

.content {
  text-align: left;
}
</style>
