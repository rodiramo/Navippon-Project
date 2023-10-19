<template>
    <div class=" container width">
      <div v-if="packageData.length > 0">
        <div v-for="pkg in packageData" :key="pkg.id" class="package">
        <h2>{{ pkg.name }}</h2>
        <p>Price: ${{ pkg.price }}</p>
        <p>Location: {{ pkg.location }}</p>
        <p>Description: {{ pkg.description }}</p>
        <img :src="pkg.img" :alt="pkg.imgDescription" >
        <ul>
          <li v-for="activity in pkg.activities" :key="activity">{{ activity }}</li>
        </ul>
        <ul>
          <li v-for="category in pkg.categories" :key="category">{{ category }}</li>
        </ul>
        </div>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </template>
  
  <script>
  import { getPackages, getAllPackageIds } from "../services/packages";
  
  export default {
    name: 'Packages',
    data() {
      return {
        packageData: [], // Initialize packageData as an empty array
      };
    },
    async created() {
      try {
        const packageIds = await getAllPackageIds();
  
        const packagePromises = packageIds.map((id) => getPackages(id));
        this.packageData = await Promise.all(packagePromises);
      } catch (error) {
        console.error("Error fetching packages", error);
        this.packageData = []; 
      }
    },
  };
  </script>
  