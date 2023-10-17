<script>

import { getPackages } from "../services/packages"; 
  
  export default {
    name: 'Packages',
    data() {
      return {
        package: {},
      };
    },
    async created() {
      try {
        const id = "your-package-id"; 
        this.package = await getPackages(id);
      } catch (error) {
        console.error("Error fetching package data", error);
      }
    },
  };
</script>
<template>
    <div class="width">
      <h1>{{ package.name }}</h1>
      <p>Price: {{ package.price }}</p>
      <p>Location: {{ package.location }}</p>
      <p>Description: {{ package.description }}</p>
      <ul>
        <li v-for="activity in package.activities" :key="activity">{{ activity }}</li>
      </ul>
      <ul>
        <li v-for="category in package.categories" :key="category">{{ category }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  
  </script>
  