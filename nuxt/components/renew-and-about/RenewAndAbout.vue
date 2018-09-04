<template>
    <section class="homepage-main">
       id: {{JSON.stringify(data.id)}}
    </section>
</template>

<script>
    export default {
        props: ['data']
    }
</script>

<style lang="scss" scoped>
    @import './renew-and-about.scss';
</style>