<template>
    <section class="notification-bar">
        <div class="container">
            <div class="notification-bar-content">
                ctrl.data.desc
            </div>
            <div class="close">&#10006;&#xFE0E;</div>
        </div>
    </section>
</template>

<script>
    export default {
        async asyncData ({ params }) {
            debugger;
            let { data } = await axios.get(`content/com/site-header/site-bar.json`);
            debugger;
            return data;
        }
    };
</script>

<style lang="scss" scoped>
    @import './site-bar.scss';
</style>