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
    import { getFooterData, getSiteBarData } from '~/helpers/api'
    import SiteBar from "~/components/site-bar/SiteBar.vue";
    import RenewAndAbout from "~/components/renew-and-about/RenewAndAbout.vue";

    export default {
        layout: 'kl',
        components: {
            SiteBar,
            RenewAndAbout
        },
        data() {
            return { data: null };
        },
        async asyncData ({ params }) {
            const [responseFooter, responseSiteBar] = [ await getFooterData(), await getSiteBarData() ];
            return { 
                loaded: true,
                data: {
                    footer: responseFooter.data._fields,
                    siteBar: responseSiteBar.data._fields
                }
            }
        }
    };
</script>
