(function() {
    'use strict';
    angular.module('kappGlobal.newsLetterOptIn')
        .factory('newsLetterOptInService', newsLetterOptInService);

    function newsLetterOptInService($http, ENV) {
        return {
            'getData': getData,
            'submitForm': submitForm
        };

        function getData() {
            return $http.get(`/content/${ENV.locale}/home-security/news-letter-opt-in.json`, {'cache': true});
        }

        function submitForm(email) {
            return $http.post(getLocaleUrl(email));
        }

        function getLocaleUrl(email) {
            let envLocale = ENV.locale.toLowerCase(),
                isArabicEnglish = envLocale === 'en-ae',
                locale = isArabicEnglish ? envLocale : envLocale.split('-')[1],
                url = ``;
            switch (locale) {
            case 'global':
                url = constructTreUrl('780400033B882D61', 'fdc-gcTrj6k3_hxVsQ4D9b__UD7FccOamf1sNogyDNHRNhRVW0PorKWbewDMUX5s/ErocOmL9732ckHzumMNTaw', email, 'en_Global');
                break;
            case 'us':
                url = constructTreUrl('2AEBC020000C2EDE', 'FA7nTt85nq56Vwh7pdgIA_lMfDELGn9gHwBBo6cOzLsPH_7pCsbnISBAA7tG2H4o/TImyzLu8tvgKR1j7kHsUKQ', email, 'en_US');
                break;
            case 'gb':
                url = constructTreUrl('44516178040000B9', '5MogkJtmuUTTydpjh5YrzhyN8v44N7o25lBK0aXmVTdDM3eA1FPErDoXoXLbQVDN/_vbfLVw14vPo-DO_Ue8BVw', email, 'en_GB');
                break;
            case 'ie':
                url = constructTreUrl('44516178040000B9', '5MogkJtmuUTTydpjh5YrzhyN8v44N7o25lBK0aXmVTdDM3eA1FPErDoXoXLbQVDN/_vbfLVw14vPo-DO_Ue8BVw', email, 'en_GB');
                break;
            case 'au':
                url = constructP8Url('AC2F0080007EA98C', '14xYXmD7amAdedoEAwCadznCBfouX92TY66h99goXAQRRu9EiAURX7FF2-lfwvw7/V7_BhRO71A5kz1iDvBZU2A', email, 'en_AU');
                break;
            case 'nz':
                url = constructP8Url('AC2F0080007EA98C', '14xYXmD7amAdedoEAwCadznCBfouX92TY66h99goXAQRRu9EiAURX7FF2-lfwvw7/V7_BhRO71A5kz1iDvBZU2A', email, 'en_AU');
                break;
            case 'in':
                url = constructP9Url('8000448D0E2C2F00', '3YdbwyBvqBVd5fJ5mJYvima0yO8Drb6v09E7sAiDixWFqCgSUukecu0lLqH4Jbvh/qf5C_6YyrgrwzcEoVqsVAg', email, 'en_IN');
                break;
            case 'ae':
                url = constructP8Url('80003CD312AC2F80', 'EAvoTP3HMGu5e5fMijvvxLpBez-AvBO1uAO03TSP9p1t4NS8m1B9gbxMO2-RZJgV/mm0HB4RPL15PeEzC0Jxjvg', email, 'ar_AE');
                break;
            case 'en-ae':
                url = constructP8Url('40001729D4E8D780', 'UCvJiEZdG7OvaqTww-ZZ8RevTseZ-7OlKojAjcOE-zCzcgaieSJ9IqNcWZsFxZ6v/H7q55uNQMRb5Aq9zAMscBQ', email, 'en_AE');
                break;
            case 'es':
                url = constructP8Url('2C2F00800058D598', 'rqA84m1WnPEPNCdneyk_0umilFcl7AbY2MIOVRyLixvHKaBND-XthC2wnb3T0-Qk/Vk1rivWcC-qJwlX4kqDO3w', email, 'es_ES');
                break;
            case 'br':
                url = constructP8Url('2C2F00800058D598', 'rqA84m1WnPEPNCdneyk_0umilFcl7AbY2MIOVRyLixvHKaBND-XthC2wnb3T0-Qk/Vk1rivWcC-qJwlX4kqDO3w', email, 'pt_BR');
                break;
            case 'fr':
                url = constructP8Url('E01000000732E585', 'f7Kl9J4aJ_iBZjsNoRLTmSGpV5jD2VZhlOq3iEamrzrhyU2yDcdRKZC_Y7mNgur-/KV0itLyVbc_VJ8vcyLAIjQ', email, 'fr_FR');
                break;
            case 'it':
                url = constructP8Url('41E66B0BC020041E', 'Yj9zfqjQuP-oezav8ODulooprlsnF384aPuA6BuhqduhI-4cHNgaFZol_Scqk0nv/GI4XjXV8Nmx_yKLotkF4qA', email, 'it_IT');
                break;
            case 'de':
                url = constructTreUrl('1AAC2F0080000A4A', 'PUzO3oTxzn1b24JSdAdcNlVNdYsNY7YYUtbGrYAPQsZ4g1gaK3QfxwIhfJkcNYw1/TRHLsk6_yw9Tm15ya1H5VQ', email, 'de_DE');
                break;
            case 'cn':
                url = constructP8Url('3197D09617804031', 'gj6hEgHFcz_nNEwW7TFAPG6Pmfp_NGUc7peg63FIyLDpykAWxAhfR0a1qnpYjU5U/xYDwageJipmO1tIupzJAxQ', email, 'zh_CN');
                break;
            case 'ru':
                url = constructP8Url('2C2F00800007F922', '3x6ZYBMx25Voa5LRbupJoy-5HRXxQ1ytOI5SGrGF0H_p7xc48nrjutRyYmmATHJT/fexKE90kGqu_7j-fADsuNQ', email, 'ru_RU');
                break;
            case 'jp':
                url = constructP8Url('12AFD2161780412A', 'buqmlbpa2KSOrPpX7UPMgcyt9LRbKWsvHvSgQsb2VZa59TKnTA_WZXz04ImeVinA/OlS1FKc_yOtaDcdW0HHj5Q', email, 'ja_JP');
                break;
            case 'za':
                url = constructP8Url('80003CD312AC2F80', 'pRqDrK1tqjOW1G9T77iX4WeA333qCfmQqNUiUjcIZJnBjIslwqKzOr4Ify8arwvt/D3pGwqqAysOj8_XBwN9PRQ', email, 'en_ZA');
                break;
            case 'nl':
                url = constructTreUrl('D7804000055959A7', 'bhvlEBXhdR6GWsT5Z8pUV86nRwMi5oki-X9NLZJJp4aXwg6KYaTdjKXqL70Qp_Mu/YF572UoVXFxklUM3UxwAqg', email, 'nl_NL');
                break;
            case 'tr':
                url = constructP8Url('5627D78040001405', 'GhG2K6oRAHhgxo89n2xuJomdKpwrmYB015xAyfyMTNQiloSKGvNKaNN9K9RzQwL8/pz06Mvubk1r_buipm3z4BA', email, 'tr_TR');
                break;
            case 'mx':
                url = constructTreUrl('58304FAF0080005B', '-fQEORkP21MbpHxr6uQ2RZk1j00hH93Wz7Yxbldn165awVIhvDSlzuXMWOETlvgk/dbEyrXEcK1zAx5kr2FYH3w', email, 'es_MX');
                break;
            case 'se':
                url = constructTreUrl('5E010000410B4F58', 'qltB4yJ0UhNt6sfs1A6wkVcNU_vVOWfX3g934i7-nAHbPXIWOgppqEjR_WEX2Kn7/aFERbCTo7Ed72_fWW3yw1g', email, 'sv_SE');
                break;
            case 'dk':
                url = constructTreUrl('BD42927D78040BD4', '2zvGgsFkSrF0l_-0DL3K7hu5od0WiA-k50jwKiSUrS8-Ln8JeVPQtmBTXnf8pc61/nCwETjOskFbks0omp6UTsQ', email, 'da_DK');
                break;
            case 'no':
                url = constructTreUrl('3EBC020001C38F4F', 'cMW52FuwL_4c6vBKqiXvEZiqBLReu-nly1R5-W6PzdVerrvtkIo4YCMEjh2eTpqv/9N6uetd4SXprxZQG5PGfXQ', email, 'nb_NO');
                break;
            case 'ny':
            case 'fi':
            case 'is':
                url = constructTreUrl('5E010000410B4F58', '3-o5mXMqcnpwqIrbvfwvK-km7QwQRHTJSMYwFLNrpzyG2qtjx0hyO4TX7H5_aiF6/xYvjj_gw2DcD6NDKQj2Smg', email, 'Nordics');
                break;
            }
            return url;
        }

        function constructTreUrl(emvTag, emvRef, email, locale) {
            return `//tre.emv3.com/D2UTF8?emv_tag=${emvTag}&emv_ref=${emvRef}&EMAIL_FIELD=${email}&LOCALE_FIELD=${locale}&SEGMENT_FIELD=NEWSLETTER&OPT_IN_EMAIL_IND_FIELD=1`;
        }

        function constructP9Url(emvTag, emvRef, email, locale) {
            return `//p9tre.emv3.com/D2UTF8?emv_tag=${emvTag}&emv_ref=${emvRef}&EMAIL_FIELD=${email}&LOCALE_FIELD=${locale}&SEGMENT_FIELD=NEWSLETTER&OPT_IN_EMAIL_IND_FIELD=1`;
        }

        function constructP8Url(emvTag, emvRef, email, locale) {
            return `//p8tre.emv3.com/D2UTF8?emv_tag=${emvTag}&emv_ref=${emvRef}&EMAIL_FIELD=${email}&LOCALE_FIELD=${locale}&SEGMENT_FIELD=NEWSLETTER&OPT_IN_EMAIL_IND_FIELD=1`;
        }
    }
})();
