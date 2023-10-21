<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { editPackage } from '../services/edit-create.js';
import { getPackages } from '../services/packages.js';

export default {
  name: 'EditPackage',
  components: { BaseButton, BaseLabel, BaseInput },
  data() {
    return {
      editedPackage: {
        id: null,
        name: '',
        location: '',
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
      const updateData = {
        name: this.editedPackage.name,
        price: this.editedPackage.price,        
        location: this.editedPackage.location,
        description: this.editedPackage.description,
        activities: this.editedPackage.activities.split(',').map(activity => activity.trim()),
        categories: this.editedPackage.categories.split(',').map(category => category.trim()),
      };

      editPackage(this.editedPackage.id, updateData)
        .then(() => {
          this.$router.push({ path: '/packages' });
        })
        .catch((error) => {
          this.error = 'An error occurred while updating the package: ' + error.message;
        });
    },
  },
  created() {
  const packageId = this.$route.params.id;
  console.log('packageId:', packageId); 
  getPackages(packageId) 
    .then((data) => {
      this.editedPackage = data;
    })
    .catch((error) => {
      this.error = 'An error occurred while fetching the package data.';
    });
},

};
</script>

<template>
  <div>
    <section class="hero-login">
      <h1 class="mb-4 text-3xl">Edit Package "{{ editedPackage.name }}"</h1>
    </section>

    <form class="form d-flex flex-column container" @submit.prevent="saveChanges">
      <BaseLabel for="name">Name*:</BaseLabel>
      <BaseInput type="text" id="name" v-model="editedPackage.name" required></BaseInput>

      <BaseLabel for="description">Description*:</BaseLabel>
      <textarea id="description" v-model="editedPackage.description" required></textarea>

      <BaseLabel for="location">Location*:</BaseLabel>
        <BaseInput id="location" v-model="editedPackage.location" required></BaseInput>

      <BaseLabel for="price">Price*:</BaseLabel>
      <BaseInput class="mb-4" type="number" id="price" v-model="editedPackage.price" required></BaseInput>

      <BaseLabel for="activities">Activities* (Comma-separated):</BaseLabel>
    <BaseInput type="text" id="activities" v-model="editedPackage.activities" required></BaseInput>

    <BaseLabel for="categories">Categories* (Comma-separated):</BaseLabel>
    <BaseInput type="text" id="categories" v-model="editedPackage.categories" required></BaseInput>

      <BaseButton>Save Changes</BaseButton>
    </form>
  </div>
</template>
