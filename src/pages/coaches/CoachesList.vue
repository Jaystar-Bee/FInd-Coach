<template>
  <section>
    <section>
      <base-dialog
        :show="!!errorMessage"
        title="An error Occured"
        @close="closeDialog"
      >
        <p>{{ errorMessage }}</p>
      </base-dialog>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches(true)"
          >Refresh</base-button
        >
        <base-button link v-if="!isLoggedIn" to="/auth?redirect=register"
          >Login to register as a coach</base-button
        >
        <base-button
          link
          to="/register"
          v-if="isLoggedIn && !isCoach && !isLoading"
          >Register as coach</base-button
        >
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches && !isLoading">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        >
        </coach-item>
      </ul>
      <h3 v-else>No Coach is Found.</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from './../../components/coaches/CoachItem.vue';
import CoachFilter from './../../components/coaches/CoachFilter.vue';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      errorMessage: null,
      isLoading: false,
      activeFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: {
    CoachItem,
    CoachFilter,
  },
  computed: {
    ...mapGetters('coaches', ['coaches', 'hasCoaches', 'isCoach']),

    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },

    filteredCoaches() {
      const coaches = this.coaches;
      return coaches.filter((coach) => {
        if (this.activeFilter.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    setFilter(updatedFilter) {
      this.activeFilter = updatedFilter;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.errorMessage = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    closeDialog() {
      this.errorMessage = null;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>