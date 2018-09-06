<template>
    <section class="notification-bar" v-bind:class="data.colour" v-if="data.active === 'Yes'">
        <div class="container">
            <div class="notification-bar-content" v-html="data.desc"></div>
            <div class="close" v-on:click="greet('NUXT')">&#10006;&#xFE0E;</div>
        </div>
    </section>
</template>

<script>
    export default {
        props: ['data'],
        methods: {
            greet: function (name) {
                if (alert) {
                    alert(`Hello! ${name}`);
                }
                this.data.active = 'no';
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import './site-bar.scss';
</style>