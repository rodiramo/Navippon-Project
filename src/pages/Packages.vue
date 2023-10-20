
<script>
import { getPackages, getAllPackageIds } from "../services/packages";

import BaseLoader from '../components/BaseLoader.vue';

export default {
  name: 'Packages',
  components: { BaseLoader },
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

<template>

        <section class="hero hero-home">
            
            <h1><span>Our Packages</span></h1>

            <p>Check our destination packages, with activities that suit only you!</p>
           

        </section>

    <div class="container">
      <div class="d-flex justify-center text-center" v-if="packageData.length > 0">
        <div v-for="pkg in packageData" :key="pkg.id"  class="package-card">
          <div class="package-image">
          <img :src="pkg.img" :alt="pkg.imgDescription">
        </div>
        <div class="package-details">
          <h2>{{ pkg.name }}</h2>
          <p class="price">${{ pkg.price }}</p>
          <p>Location: {{ pkg.location }}</p>
          <p>Description: {{ pkg.description }}</p>
          <ul class="package-activities">
            <li v-for="activity in pkg.activities" :key="activity">{{ activity }}</li>
          </ul>
          <ul class="package-categories">
            <li class="category" v-for="category in pkg.categories" :key="category">{{ category }}</li>
          </ul>
        </div>
        </div>
      </div>
      <div v-else>   
         <BaseLoader />
      </div>
    </div>
</template>
  