<template>
    <div>
      <h2>Edit Package</h2>
      <form @submit.prevent="saveChanges">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="editedPackage.name" required>
  
        <label for="description">Description:</label>
        <textarea id="description" v-model="editedPackage.description" required></textarea>
  
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="editedPackage.price" required>
  
        <!-- Other form fields for location, activities, etc. -->
  
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
export default {
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

      // Prepare the package data for the update
      const updatedPackage = {
        id: this.editedPackage.id, // Include the package ID if needed.
        name: this.editedPackage.name,
        description: this.editedPackage.description,
        price: this.editedPackage.price,
        // Include other fields here.
      };

      // Example API URL, replace with your own
      const apiUrl = `/api/packages/${updatedPackage.id}`;

      // Send a PATCH request to update the package
      try {
        const response = await fetch(apiUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPackage),
        });

        if (response.ok) {
          // Update was successful
          this.successMessage = "Package updated successfully!";
          this.error = null;
        } else {
          // Handle errors from the server
          this.error = "Failed to update the package. Please try again later.";
        }
      } catch (error) {
        // Handle network or other errors
        this.error = "An error occurred while updating the package.";
      }
    },
    validateForm() {
      // Implement your validation logic here
      if (!this.editedPackage.name || !this.editedPackage.description || this.editedPackage.price <= 0) {
        return false;
      }
      return true;
    },
  },
  created() {
    // Fetch the package data from your backend and initialize editedPackage.
    // Example fetch operation to get package data by ID (replace with your own API logic)
    const packageId = this.$route.params.id;

    // Example API URL to fetch the package data by ID (replace with your own)
    const apiUrl = `/api/packages/${packageId}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          // Handle errors, e.g., package not found
          throw new Error("Package not found");
        }
        return response.json();
      })
      .then((data) => {
        // Set the retrieved package data in editedPackage
        this.editedPackage = data;
      })
      .catch((error) => {
        // Handle errors (package not found, network issues, etc.)
        this.error = "An error occurred while fetching the package data.";
      });
  },
};
</script>
