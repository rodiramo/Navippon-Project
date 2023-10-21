<script>
export default {
    name: 'Home',
}
</script>

<template>

        <section class="hero hero-home">
            
            <h1><span>Navippon</span></h1>

            <p>Explore Japan in a way that fits you</p>
            <p>Check out all our packages for making your trip perfect!</p>
           
            <router-link to="/packages" class="btn">Packages</router-link>

        </section>

    <section class="destinations">
        <h2 class="mb-4"><strong>Popular Cities in Japan</strong></h2>
        <div class="destination">
            <img src="/avion.png" alt="icon of an airplane" width="50" height="50">
            <h3>Kyoto Serenity</h3>
            <p>Personaliza tu aventura</p>
        </div>
        <div class="destination">
            <img src="/avion.png" alt="icon of an airplane" width="50" height="50">
            <h3> Knkaku-ji </h3>
            <p>Viajes super económicos</p>
        </div>
        <div class="destination">
            <img src="/avion.png" alt="icon of an airplane" width="50" height="50">
            <h3>Tokyo Tower</h3>
            <p>Vivi tu propia aventura</p>
        </div>
    </section>

    <section class="container mb-4 w-80">

        <h2 class="mb-4 text-center"><strong>Why choose Navippon?</strong></h2>
        
       <p class="mb-2">There are several compelling reasons to choose Navippon:</p>

       <ul>
          <li><strong>Expertise</strong>: We have a deep understanding of Japan, its culture, and its many attractions. Our team consists of travel experts who are passionate about sharing their knowledge and ensuring you have a fulfilling experience.</li>
          <li><strong>Customization</strong>: We recognize that each traveler is unique. We offer tailor-made itineraries and services that cater to your specific interests and needs. This means your journey through Japan is personalized just for you.</li>
          <li><strong>Authentic Experiences</strong>: We focus on providing authentic cultural experiences that allow you to immerse yourself in the true essence of Japan. From traditional ryokans to cultural events, you'll get an authentic taste of the country.</li>
          <li><strong>Diverse Accommodations</strong>: Whether you prefer luxury hotels in the heart of the city or the charm of traditional ryokans in serene rural settings, we have a wide range of accommodation options to suit your preferences.</li>
          <li><strong>Memorable Adventures</strong>: Our goal is to provide you with unforgettable adventures. With years of experience in the tourism industry, we are committed to delivering hassle-free, meaningful, and memorable journeys.</li>
        
       </ul>
    </section>
 
</template>