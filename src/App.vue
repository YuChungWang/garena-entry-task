<template>
  <div id="app">
    <EntryTask />
  </div>
</template>

<script>
import EntryTask from './components/EntryTask.vue';

export default {
  name: 'App',
  components: {
    EntryTask,
  },
};
</script>

<style lang="scss">
@import "./components/variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  min-width: 400px;
  height: 100vh;
}

body {
  margin: 0;
}

button {
  border: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
}

input, select {
  outline: none;
  padding: 0;
  border: 1px solid $border-color;
  box-sizing: border-box;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

input[type="radio"] {
  display: none;
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}
</style>
