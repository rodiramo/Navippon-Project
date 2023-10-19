<script>
export default {
    name: 'Home',
}
</script>

<template>

        <section class="hero hero-home">
            
            <h1><span>Navipon</span></h1>

            <p>Explora nuevos destinos con nosotros</p>
           
            <router-link to="/packages" class="btn">Packages</router-link>

        </section>

    <section class="destinations">
        <h2 class="mb-4"><strong>Destinos Populares</strong></h2>
        <div class="destination">
            <img src="avion.png" alt="icono" width="50" height="50">
            <h3>Kyoto Serenity</h3>
            <p>Personaliza tu aventura</p>
        </div>
        <div class="destination">
            <img src="avion.png" alt="icono" width="50" height="50">
            <h3> Knkaku-ji </h3>
            <p>Viajes super económicos</p>
        </div>
        <div class="destination">
            <img src="avion.png" alt="icono" width="50" height="50">
            <h3>Tokyo Tower</h3>
            <p>Vivi tu propia aventura</p>
        </div>
    </section>
    <section class="newsletter">
        <h2>Suscríbete a nuestro boletín</h2>
        <p>Recibe ofertas especiales y actualizaciones de viajes en tu bandeja de entrada.</p>
        <form action="#" class="mt-4 mx-4" method="post">
            <input type="email" name="email" placeholder="Tu correo electrónico">
            <button type="submit" class="btn">Suscribirse</button>
        </form>
    </section>

</template>