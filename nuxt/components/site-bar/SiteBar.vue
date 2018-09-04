<template>
    <section class="notification-bar">
        <div class="container">
            <div class="notification-bar-content">
                 id: {{JSON.stringify(data.id)}}
            </div>
            <div class="close">&#10006;&#xFE0E;</div>
        </div>
    </section>
</template>

<script>
    export default {
        props: ['data']
    };
</script>

<style lang="scss" scoped>
    @import './site-bar.scss';
</style>