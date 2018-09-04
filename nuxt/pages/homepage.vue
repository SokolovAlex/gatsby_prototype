<template>
    <section>
        <site-bar v-bind:data="data.siteBar"></site-bar>
        
        <div class="main no-bg">
            <renew-and-about v-bind:data="data.footer"></renew-and-about>
        </div>

        <nuxt-link to="/">
            HomePage
        </nuxt-link>
    </section>
</template>

<script>
    import { footer, siteBar } from '~/helpers/api'
    import SiteBar from "~/components/site-bar/SiteBar.vue";
    import RenewAndAbout from "~/components/renew-and-about/RenewAndAbout.vue";

    export default {
        layout: 'kl',
        components: {
            SiteBar,
            RenewAndAbout
        },
        data() {
            return { data: '' };
        },
        async asyncData ({ params }) {
            const [responseFooter, responseSiteBar] = [await footer(), await siteBar()];
            console.log(responseFooter.data.id, responseSiteBar.data.id);
            return { loaded: true, data: {
                footer: responseFooter.data,
                siteBar: responseSiteBar.data
            }}
        }
    };
</script>
