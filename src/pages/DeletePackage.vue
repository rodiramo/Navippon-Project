<script>
import { deletePackage } from '../services/edit-create.js';

export default {
  name: 'DeletePackage',
  methods: {
    async deletePackage() {
      try {
        const packageId = this.$route.params.id;
        await deletePackage(packageId);
        this.$router.push('/packages');
      } catch (error) {
        console.error('Error deleting package:', error);
      }
    },
    cancelDelete() {
      this.$router.go(-1);
    },
  },
};

</script>

<template>
  <div>
    <section class="hero-login">
      <h1 class="mb-4 text-3xl">Delete Package</h1>
    </section>
    <div>
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this package?</p>
      <button @click="deletePackage">Yes, Delete</button>
      <button @click="cancelDelete">Cancel</button>
    </div>
  </div>
</template>
