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
            <img src="/avion.png" alt="icono" width="50" height="50">
            <h3>Kyoto Serenity</h3>
            <p>Personaliza tu aventura</p>
        </div>
        <div class="destination">
            <img src="/avion.png" alt="icono" width="50" height="50">
            <h3> Knkaku-ji </h3>
            <p>Viajes super económicos</p>
        </div>
        <div class="destination">
            <img src="/avion.png" alt="icono" width="50" height="50">
            <h3>Tokyo Tower</h3>
            <p>Vivi tu propia aventura</p>
        </div>
    </section>

    <section class="destinations">
        <h2 class="mb-4"><strong>Why choose Navippon?</strong></h2>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quasi nobis deserunt, quae non quod nulla vero dolore ducimus sapiente! Unde, illum. Porro sunt, repellendus aspernatur possimus adipisci fugiat placeat.</p>
    </section>
 
</template>