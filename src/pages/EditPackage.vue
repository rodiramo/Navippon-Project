
<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';

export default {
  name: 'EditPackage',
  components: { BaseButton, BaseLabel, BaseInput },
  data() {
    return {
      editedPackage: {
        id: null,
        name: '',
        description: '',
        price: 0,
      },
      error: null,
      successMessage: null,
    };
  },
  methods: {
    async saveChanges() {
      if (!this.validateForm()) {
        this.error = 'Please fill out all required fields.';
        return;
      }

      const packageId = this.$route.params.id;
      const apiUrl = `/api/packages/${packageId}`;

      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.editedPackage),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update the package');
          }
          return response.json();
        })
        .then((data) => {
          this.error = null;
          this.successMessage = 'Package updated successfully';
        })
        .catch((error) => {
          this.error = 'An error occurred while updating the package';
        });
    },
    validateForm() {
      return (
        this.editedPackage.name.trim() !== '' &&
        this.editedPackage.description.trim() !== '' &&
        this.editedPackage.price > 0
      );
    },
  },
  created() {
    const packageId = this.$route.params.id;
    const apiUrl = `/api/packages/${packageId}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Package not found');
        }
        return response.json();
      })
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
        <h1 class="mb-4 text-3xl">Edit Package {{ editedPackage.name }}</h1>
      </section>
  
      <form class="form d-flex flex-column container" @submit.prevent="saveChanges">
        <BaseLabel for="name">Name*:</BaseLabel>
        <BaseInput type="text" id="name" v-model="editedPackage.name" required></BaseInput>
  
        <BaseLabel for="description">Description*:</BaseLabel>
        <textarea id="description" v-model="editedPackage.description" required></textarea>
  
        <BaseLabel for="price">Price*:</BaseLabel>
        <BaseInput class="mb-4" type="number" id="price" v-model="editedPackage.price" required></BaseInput>
  
        <BaseButton>Save Changes</BaseButton>
      </form>
    </div>
  </template>
  