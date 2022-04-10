<template>
  <div>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog
      :show="!!success"
      title="Authentication Successful"
      @close="closeDialog('success')"
    >
      <p>{{ success }}</p>
    </base-dialog>
    <base-dialog
      :show="!!error"
      title="Authentication failed"
      @close="closeDialog('error')"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <form action="" @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please check your email and password must me greater than 6
          characters.
        </p>
        <base-button>{{ outputAuthMode }}</base-button>
        <base-button mode="flat" type="button" @click="switchAuthMode">{{
          outputSwitchMode
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
      success: null,
    };
  },
  computed: {
    outputAuthMode() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Sign Up';
      }
    },
    outputSwitchMode() {
      if (this.mode === 'login') {
        return 'Signup Instead';
      } else {
        return 'Login Instead';
      }
    },
  },
  methods: {
    async submitForm() {
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        return (this.formIsValid = false);
      }
      const dataAction = {
        email: this.email,
        password: this.password,
      };

      this.isLoading = true;
      try {
        if (this.mode === 'login') {
          //Login code
          await this.$store.dispatch('login', dataAction);
          const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
          this.$router.replace(redirectUrl);
        } else {
          await this.$store.dispatch('signup', dataAction);
          this.success = 'Your detail is successfully saved!';
        }
      } catch (err) {
        this.error = err.message || 'Authntication Failed';
        console.log(err.message);
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    closeDialog(type) {
      if (type === 'success') {
        this.success = null;
      } else {
        this.error = null;
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
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
  margin-bottom: 10px;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>