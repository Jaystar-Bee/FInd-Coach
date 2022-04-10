<template>
  <form action="" @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        placeholder="Firstname"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">
        This field is required. Please input the right data
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        placeholder="Lastname"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">
        This field is required. Please input the right data
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Decription</label>
      <textarea
        name="decription"
        id="description"
        rows="10"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">
        This field is required. Please input the right data
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        placeholder="Rate"
        id="rate"
        v-model.trim="rate.val"
        @blur="clearValidity('rate')"
      />$/hour
      <p v-if="!rate.isValid">
        This field is required. Please input the right data
      </p>
    </div>
    <div class="form-control">
      <h2>Area of Expertise</h2>
      <div :class="{ invalid: !areas.isValid }">
        <label for="backend">Backend Development</label>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model.trim="areas.val"
          @blur="clearValidity('areas')"
        />
      </div>
      <div :class="{ invalid: !areas.isValid }">
        <label for="frontend">Frontend Development</label>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model.trim="areas.val"
          @blur="clearValidity('areas')"
        />
      </div>
      <div :class="{ invalid: !areas.isValid }">
        <label for="career">Career Advisory</label>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model.trim="areas.val"
          @blur="clearValidity('areas')"
        />
      </div>
      <p v-if="!areas.isValid">
        This field is required. Please input the right data
      </p>
    </div>

    <base-button>Register Coach</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: { val: '', isValid: true },
      lastName: { val: '', isValid: true },
      description: { val: '', isValid: true },
      rate: { val: null, isValid: true },
      areas: { val: [], isValid: true },
      inputInvalid: false,
    };
  },
  methods: {
    validityCheck() {
      this.inputInvalid = false;
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.inputInvalid = true;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.inputInvalid = true;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.inputInvalid = true;
      }
      if (this.rate.val === null) {
        this.rate.isValid = false;
        this.inputInvalid = true;
      }
      if (this.areas.val.length <= 0) {
        this.areas.isValid = false;
        this.inputInvalid = true;
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    submitForm() {
      this.validityCheck();
      if (this.inputInvalid) {
        return;
      }
      this.$store.dispatch('coaches/addCoach', {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        description: this.description.val,
        hourlyRate: this.rate.val,
        areas: this.areas.val,
      });
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
.invalid p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>