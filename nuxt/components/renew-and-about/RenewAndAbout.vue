<template>
    <section class="homepage-main" v-if="data">
        <section class="hmc-section variant-2 no-margin">
            <div class="container">
                <div class="row">
                    <div class="hmc-desc col-l-5">
                        <h4>{{data.hmcTitle}}</h4>
                        <div class="row">
                            <div class="col-l-5">
                                <img class="thumbnail" 
                                    :src="`/${data.hmcImg}`" :alt="data.hmcImg">
                            </div>
                            <div class="col-l-7">
                                <h5 class="text-green">{{data.hmcSubTitle}}</h5>
                                <p>{{data.hmcDesc}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- <hmc-homepage component="hmc-component" class="hmc-selector col-l-7 hmc-embedded"></hmc-homepage> -->
                </div>
            </div>
        </section>
         <!-- <trustpilot-reviews></trustpilot-reviews> -->

        <div class="renew-license mobile">
            <div class="container">
                <h4>{{data.protectMobileTitle}}</h4>
                <img class="photo" :src="`/${data.protectMobileImage}`">
                <div v-html="data.protectMobileTextBlock"></div>
                <a v-for="(protectMobileButton, i) in data.protectMobileButtons"
                    class="button"
                    :key="i"
                    :class="protectMobileButton.class"
                    :href="protectMobileButton.link">
                    {{protectMobileButton.text}}
                </a>
            </div>
        </div>

        <div class="renew-license divider">
            <div class="container">
                <h4>{{data.renewTitle}}</h4>
                <div v-html="data.renewTextBlock"></div>
                <a v-for="(renewButton, i) in data.renewButtons" 
                    :key="i"
                    :href="renewButton.link" 
                    :class="renewButton.class"
                    class="button">
                    {{renewButton.text}}</a>
            </div>
        </div>

         <div class="renew-license divider">
            <div class="container">
                <h4>{{data.renewTitle}}</h4>
                <div v-html="data.renewTextBlock"></div>
                <a v-for="(renewButton, i) in data.renewButtons" 
                    :key="i"
                    :href="renewButton.link" 
                    :class="renewButton.class"
                    class="button">
                    {{renewButton.text}}</a>
            </div>
        </div>

        <div class="renew-and-about">
            <div class="container">
                <div class="col renew-col">
                    <h4>{{data.renewTitle}}</h4>
                    <div v-html="data.renewTextBlock"></div>
                    <a v-for="(renewButton, i) in data.renewButtons" 
                        :href="renewButton.link"
                        :key="i"
                        class="button"
                        :class="renewButton.class"
                        :data-test="`homepage-cta--lrc-${i}`">
                        {{renewButton.text}}</a>
                </div>
                <div class="col about-col">
                    <div class="quote-section">
                        <blockquote>
                            <p>“{{data.aboutQuoteText}}”</p>
                            <cite>
                                <strong>- {{data.aboutQuoteAuthor}}</strong>
                                <span>{{data.aboutQuoteAuthorTitle}}</span>
                            </cite>
                        </blockquote>
                        <div class="footer-wrap">
                            <img class="photo" :src="`/${data.aboutQuoteImage}`">
                            <a v-for="(aboutButton, i) in data.aboutButtons"
                                :key="i"
                                :href="aboutButton.link"
                                :class="aboutButton.class"
                                class="button"
                                :data-test="`homepage-cta--about-${i}`">
                                {{aboutButton.text}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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