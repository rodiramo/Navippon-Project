<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { createPackage } from '../services/edit-create.js';

export default {
  name: 'CreatePackage',
  components: { BaseButton, BaseLabel, BaseInput },
  data() {
    return {
      createPackage: {
        name: '',
        description: '',
        price: 0,
        activities: [],
        categories: [],
      },
      error: null,
      successMessage: null,
    };
  },
  methods: {
    async saveChanges() {
      // Prepare the package data
      const packageData = {
        name: this.createPackage.name,
        price: this.createPackage.price,
        description: this.createPackage.description,
        activities: this.createPackage.activities,
        categories: this.createPackage.categories,
      };

      // Call the createPackage function without an ID
      createPackage(packageData)
        .then(() => {
          this.$router.push({ path: '/packages' });
        })
        .catch((error) => {
          this.error = 'An error occurred while creating the package: ' + error.message;
        });
    },
  },
}
</script>

<template>
  <section class="hero-login">
    <h1 class="mb-4 text-3xl">Create Package</h1>
  </section>

  <form class="form d-flex flex-column container" @submit.prevent="saveChanges">
    <BaseLabel for="name">Name*:</BaseLabel>
    <BaseInput type="text" id="name" v-model="createPackage.name" required></BaseInput>

    <BaseLabel for="description">Description*:</BaseLabel>
    <textarea id="description" v-model="createPackage.description" required></textarea>

    <BaseLabel for="price">Price*:</BaseLabel>
    <BaseInput class="mb-4" type="number" id="price" v-model="createPackage.price" required></BaseInput>

    <BaseButton>Save Changes</BaseButton>
  </form>
</template>
