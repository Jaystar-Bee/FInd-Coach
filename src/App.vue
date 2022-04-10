<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="router" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/THeHeader';
export default {
  components: {
    TheHeader,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(curVal, oldVal) {
      if (curVal && curVal !== oldVal) {
        this.$router.replace('/coaches');
      }
    },
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
.router-enter-from {
  transform: translateX(-50rem);
  opacity: 0;
}
.router-leave-to {
  transform: translateX(40rem);
  opacity: 0;
}
.router-enter-active {
  transition: all 0.4s ease-in-out;
}
.router-leave-active {
  transition: all 0.4s ease-in-out;
}
.router-enter-to,
.router-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>