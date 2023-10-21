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
        location: '',
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
      const packageData = {
        name: this.createPackage.name,
        price: this.createPackage.price,
        location: this.createPackage.location,
        description: this.createPackage.description,
        activities: this.createPackage.activities.split(',').map(activity => activity.trim()),
        categories: this.createPackage.categories.split(',').map(category => category.trim()),
      };

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
   
    <BaseLabel for="location">Location*:</BaseLabel>
    <BaseInput id="location" v-model="createPackage.location" required></BaseInput>

    <BaseLabel for="price">Price*:</BaseLabel>
    <BaseInput class="mb-4" type="number" id="price" v-model="createPackage.price" required></BaseInput>

    <BaseLabel for="activities">Activities* (Comma-separated):</BaseLabel>
    <BaseInput type="text" id="activities" v-model="createPackage.activities" required></BaseInput>

    <BaseLabel for="categories">Categories* (Comma-separated):</BaseLabel>
    <BaseInput type="text" id="categories" v-model="createPackage.categories" required></BaseInput>

    <BaseButton>Save Changes</BaseButton>
  </form>
</template>
