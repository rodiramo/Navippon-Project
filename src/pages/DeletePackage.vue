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


    <div class="d-flex justify-content-center">
      <div style="width: 18rem;">
        <section class="hero-login">
          <h1 class="mb-4 h1">Delete Package</h1>
        </section>
        <div class="container border rounded mt-4 mb-4 pb-4">
          <h2 class="text-center h2">Confirm Deletion</h2>
          <p class="mb-3">Are you sure you want to <strong>delete this package?</strong></p>
          <button class="btn mx-2 mt-3" @click="deletePackage">Yes, Delete</button>
          <button class="btn" @click="cancelDelete">Cancel</button>
        </div>
      </div>
    </div>


  
</template>
