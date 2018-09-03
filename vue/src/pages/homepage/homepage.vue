<template>
    <homepage>
        <homepage-banner></homepage-banner>

        <div class="main no-bg">
            <div>!!!</div>
            <promo-section resource="promo-above-hmc"></promo-section>
        </div>
    </homepage>
</template>

<script>
    import homepageBanner from '../components/homepage-banner/homepage-banner.vue';
    import footer from '../components/footer/footer.vue';

    export default {
        components: {
            homepageBanner,
            footer,
        }
    }
</script>
