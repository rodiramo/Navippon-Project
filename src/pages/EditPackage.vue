
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
        name: "",
        description: "",
        price: 0,
      },
      error: null,
      successMessage: null,
    };
  },
  methods: {
    async saveChanges() {
      // Basic validation
      if (!this.validateForm()) {
        this.error = "Please fill out all required fields.";
        return;
      }

      const updatedPackage = {
        id: this.editedPackage.id, // Include the package ID if needed.
        name: this.editedPackage.name,
        description: this.editedPackage.description,
        price: this.editedPackage.price,
        // Include other fields here.
      };

      const apiUrl = `/api/packages/${updatedPackage.id}`;

      try {
        const response = await fetch(apiUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPackage),
        });

        if (response.ok) {
          this.successMessage = "Package updated successfully!";
          this.error = null;
        } else {
          this.error = "Failed to update the package. Please try again later.";
        }
      } catch (error) {
        this.error = "An error occurred while updating the package.";
      }
    },
    validateForm() {
      if (!this.editedPackage.name || !this.editedPackage.description || this.editedPackage.price <= 0) {
        return false;
      }
      return true;
    },
  },
  created() {
    const packageId = this.$route.params.id;

    const apiUrl = `/api/packages/${packageId}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Package not found");
        }
        return response.json();
      })
      .then((data) => {
        this.editedPackage = data;
      })
      .catch((error) => {
        this.error = "An error occurred while fetching the package data.";
      });
  },
};
</script>


<template>
    <section class="hero-login">
        <h1 class="mb-4 text-3xl">Edit Package</h1>

    </section>
    <div>
      <form class="form d-flex flex-column container" @submit.prevent="saveChanges">
        <BaseLabel for="name">Name:</BaseLabel>
        <BaseInput type="text" id="name" v-model="editedPackage.name" required>
        </BaseInput>
        <BaseLabel for="description">Description:</BaseLabel>
        <textarea id="description" v-model="editedPackage.description" required></textarea>
  
        <BaseLabel for="price">Price:</BaseLabel>
        <BaseInput type="number" id="price" v-model="editedPackage.price" required>
        </BaseInput>
        <button class="btn w-50" type="submit">Save Changes</button>
      </form>
    </div>
  </template>
  