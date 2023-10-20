
<script>
import { getPackages, getAllPackageIds } from "../services/packages";
import { fetchUserData } from '../services/auth';
import BaseLoader from '../components/BaseLoader.vue';

export default {
  name: 'Packages',
  components: { BaseLoader },
  data() {
    return {
      packageData: [],
      isAdmin: true, 
    };
  },
  
    async created() {
    try {
      const packageIds = await getAllPackageIds();
      this.checkAdminStatus();
      const packagePromises = packageIds.map((id) => getPackages(id));
      this.packageData = await Promise.all(packagePromises);
    } catch (error) {
      console.error("Error fetching packages", error);
      this.packageData = []; 
    }
  },
  
  methods: {
    async checkAdminStatus() {
      const userData = await fetchUserData(); 
      if (userData && userData.role === 'admin') {
        this.isAdmin = true;
      }
      },
      async createPackage(pkg) {
      if (this.isAdmin) {
      this.$router.push(`/create-package/${pkg.id}`);
      }
    },
      async editPackage(pkg) {
      if (this.isAdmin) {
      this.$router.push(`/edit-package/${pkg.id}`);
      }
    },
  },

};
</script>

<template>

        <section class="hero hero-home">
            
            <h1><span>Our Packages</span></h1>

            <p>Check our destination packages, with activities that suit only you!</p>
           
            <router-link class="btn" v-if="isAdmin" :to="`/create-package/${pkg.id}`">Create</router-link>

        </section>

    <div class="container">
      <div class="d-flex justify-center text-center" v-if="packageData.length > 0">
        <div v-for="pkg in packageData" :key="pkg.id"  class="package-card">
          <div class="package-image">
          <img :src="pkg.img" :alt="pkg.imgDescription">
        </div>
        <div class="package-details">
          <h2>{{ pkg.name }}</h2>
          <dl>
  <div class="price">
    <dt>Price</dt>
    <dd>${{ pkg.price }}</dd>
  </div>
  
  <div class="location">
    <dt>Location</dt>
    <dd>{{ pkg.location }}</dd>
  </div>
  
  <div class="description">
    <dt>Description</dt>
    <dd>{{ pkg.description }}</dd>
  </div>
  
  <div class="package-activities">
    <dt>Activities</dt>
    <dd>
      <ul>
        <li v-for="activity in pkg.activities" :key="activity">{{ activity }}</li>
      </ul>
    </dd>
  </div>
</dl>

       <ul class="package-categories">
       <li class="category" v-for="category in pkg.categories" :key="category">{{ category }}</li>
      </ul>
        </div>

    <div class="package-actions">
      <router-link class="mr-2 link" v-if="isAdmin" :to="`/edit-package/${pkg.id}`">Edit</router-link>
   
    </div>

        </div>

      </div>
      <div v-else>   
         <BaseLoader />
      </div>
    </div>
</template>
  