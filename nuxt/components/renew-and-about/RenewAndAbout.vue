<template>
    <section class="homepage-main" v-if="loaded">
         ???
    </section>
</template>

<script>
    export default {
        async data() {
             debugger;
            let { data } = await axios.get(`content/com/site-header/site-bar.json`);
            debugger;
            return data;
            return { loaded: true };
        },
        async asyncData ({ params }) {
            debugger;
            let { data } = await axios.get(`content/com/site-header/site-bar.json`);
            debugger;
            return data;
        },
        // asyncData ({ params }) {
        //     debugger;
        //     return axios.get(`content/com/site-header/site-bar.json`)
        //         .then((res) => {
        //             return { title: res.data.title }
        //         })
        // }
    };
</script>

<style lang="scss" scoped>
    @import './renew-and-about.scss';
</style>