<template>
  <section>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input
            type="email"
            placeholder="Email..."
            id="email"
            v-model.trim="email"
          />
        </div>
        <div class="form-control">
          <label for="message">Message</label>
          <textarea
            name="message"
            id="message"
            rows="10"
            v-model.trim="message"
          ></textarea>
        </div>
        <p v-if="!formIsValid" class="errors">
          Please fill the right data into the email field and the message area!.
        </p>
        <p v-if="error" class="errors">{{ error }}</p>
        <p v-else>{{ success }}</p>
        <div class="actions">
          <base-button>Submit</base-button>
        </div>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      email: '',
      formIsValid: true,
      error: null,
      success: null,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.formIsValid = false;
        return;
      }
      try {
        await this.$store.dispatch('requests/addRequest', {
          coachId: this.$route.params.id,
          email: this.email,
          message: this.message,
        });
        this.success = 'Request sent successfully!';
      } catch (error) {
        this.error = error.message || 'Unable to send the Request.';
      }
      this.email = '';
      this.message = '';
    },
  },
};
</script>
<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}
.success {
  color: green;
}

.actions {
  text-align: center;
}
</style>