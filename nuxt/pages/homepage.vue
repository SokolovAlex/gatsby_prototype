<template>
    <section>
        <site-bar></site-bar>
        
        <div class="main no-bg">
            <renew-and-about></renew-and-about>
        </div>

        <div>!!!</div>
        <nuxt-link to="/">
            HomePage
        </nuxt-link>
    </section>
</template>

<script>
    import SiteBar from "~/components/site-bar/SiteBar.vue";
    import RenewAndAbout from "~/components/renew-and-about/RenewAndAbout.vue";

    export default {
        layout: 'kl',
        components: {
            SiteBar,
            RenewAndAbout
        }
    };
</script>
