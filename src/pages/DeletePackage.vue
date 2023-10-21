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
      <h1 class="mb-4 text-4xl">Delete Package</h1>
    </section>
    <div class="d-flex flex-column align-items-center" >
      <h2 class="h3">Confirm Deletion</h2>
      <p>Are you sure you want to delete this package?</p>
      <div class="m-4">
      <button class="btn m-4" @click="deletePackage">Yes, Delete</button>
      <button class="btn m-4" @click="cancelDelete">Cancel</button>

      </div>
    </div>
</div>s

  
</template>
