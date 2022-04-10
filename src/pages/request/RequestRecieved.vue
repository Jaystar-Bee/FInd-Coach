<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Recieved</h2>
      </header>
      <base-dialog :show="!!error" title="An Error Occured!" @close="closeError"
        >{{ error }}
      </base-dialog>
      <base-spinner v-if="isLoading"></base-spinner>
      <h3 v-else-if="!hasRequest && !isLoading">
        You haven't recieved any request yet.
      </h3>
      <ul v-else>
        <request-item
          v-for="request in requests"
          :key="request.id"
          :message="request.message"
          :email="request.email"
        ></request-item>
      </ul>
    </base-card>
  </section>
</template>


<script>
import RequestItem from '../../components/requests/RequestItem.vue';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    RequestItem,
  },
  computed: {
    ...mapGetters('requests', ['requests', 'hasRequest']),
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/loadRequest');
      } catch (error) {
        console.log('at catch');
        this.error = error.message || 'Unable to get the Requests!';
      }
      this.isLoading = false;
    },
    closeError() {
      this.error = null;
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>