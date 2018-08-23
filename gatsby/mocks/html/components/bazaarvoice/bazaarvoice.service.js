(function() {
    angular.module('kappGlobal.bazaarVoice')
        .factory('bazaarVoiceDataService', bazaarVoiceDataFactory);
    function bazaarVoiceDataFactory($http, ENV, $q, sessionStorageService, errorService) {
        return {
            'getProductReviews': getProductReviews
        };

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getProductReviews(productId, popupActive) {
            let locale = ENV.locale,
                apiV = '5.4',
                localKey = '',
                deferred = $q.defer(),
                bvKeys = {
                    'en\-global': {'stg': 'caBst7vBCtRNgQQxEC2CbwjvR9FIUDcFAHFyXwAkT3QH0', 'prd': 'cabJKCehLpQRAwz4AQUDff1880AIrgtbGbjDrFVT1Qgs8'},
                    'en-gb': {'stg': 'ca5wj0Tkb40EOYwllxyc9U5IvvUg0aovEPmu0UKRkpgag', 'prd': 'cagV1QmIQoFe5NhiyJuyVz7xoGVOhfP36bBLzgHRCgtPo'},
                    'en-us': {'stg': 'caeTW2Wz0IbCIZ7K6zy8xSORfsqwl2D7NE8eKfRkp6mR4', 'prd': 'caYZsgm68NlkyOqbr62JVKBBK8tD5FCdNT4ituKNXI41o'},
                    'de-de': {'stg': 'caMegpfHc9aR33Ln2JNhR1qMcbndtTTu5EOwSV9QtU4es', 'prd': 'cajftwLXWFM8sYn7yOGMVbQNZNCgXM2GsIyFwz0haYiVw'},
                    'es-mx': {'stg': 'caVzLNrPC7eWB6N7AQgAuQSjAe61k0SJ2oafIteSeaZD0', 'prd': 'cafnPwOl2IIDldcJvB4tDc1Z6PaPqDHmJJmCRmUvSG0R8'},
                    'es-es': {'stg': 'caZN8puAQoLqqbyliP0GfuXPWpyD2YK493IhomwXUuvR8', 'prd': 'caR41nBZDUA6LBHdjF9ohmTqfpgS5clRdKPdr8PzRMd9U'},
                    'fr-fr': {'stg': 'carrESPmA1PYggPmmtAiG7breXZOtZR8cJHbxPXaC0hac', 'prd': 'caDH2cy3YQ50l546Dve3X7nzQcpoyaPCBLFOYuduXRQl4'},
                    'it-it': {'stg': 'caOSimTdXgLnHCUxWBMdWfLM9Bx1j1klnWLfSukPvbA4U', 'prd': 'caGLMm2RN1rAoh3hAqk0eOvdKwc9IhvL9n9ZqPFVVLFZk'},
                    'nl-nl': {'stg': 'ca4Mjoe43f8W4pVp9xPF5MxKBRjPnVkGwmanu4PTsVLvw', 'prd': 'ca64EsK207d8BinQOBC4iCMbnBgNkiCH7DKvacyh646Q4'},
                    'pt-br': {'stg': 'carZBTVHWSjpR7Q78tZBRBlPR4fBL4PVYaXFLXLtjlZKc', 'prd': 'caLRzkLjo4rihnkHgTWC2bhVnPDRRUZce22LWrTYkiNVI'},
                    'tr-tr': {'stg': 'cavvd0H7106fUgPru6O7s2pfr8IEIRgZ96FQO5LV8qa0k', 'prd': 'cae2S95bo6T4Lq3wrHHErcYHeei1tFw0QYBeOXQ3c3O6Y'},
                    'en-au': {'stg': 'caUSqmUjIpDHoOQbF0G5mCIFvHIeMAvhlZwMyHXPWNe6s', 'prd': 'caSUUvnBQmvtAPQPwHEqEnnfZf9ERIXoQ0UlFfRPqQHHQ'},
                    'en-za': {'stg': 'caBm5x4OK07BqVsseBH1FsfMeVk5lc9udBiy9xxqdGJPw', 'prd': 'casbMFdQGWNjfjUeHpX7Y9OtSJuRtzSIDT3KTxBn732Z4'},
                    'en-in': {'stg': 'cavuw4tFdeIF3Rqn4Omimh8itmYE2De0Czn3WV35k52xY', 'prd': 'caLr4CuEo0J4a41iZCH7jHxcTTPjQli440aeYDn09j00I'},
                    'en-ae': {'stg': 'caNc9CZFhryR9rrgZfO63kcVg0rpqaBYSA8pdXY3LMZ2E', 'prd': 'caHiBA7TUC4PqdYnIHi627VKRNkqfSSBdid1m4Av4i7xA'},
                    'ar-ae': {'stg': 'caZfrlcJUk9SRYAopLzHQkxxrFk2SJpKU6IsJeD1OcFMA', 'prd': 'caD4YMV0HkPEbHKQ9QMC68W1nmS78gIhuqLRXhmuKdHD0'},
                    'sv-se': {'stg': 'cawERHSSqaHLSJmSw4axAFypWGlOFU8IPEKlcURjFb08A', 'prd': 'ca16JDB1ehqf8kHmC0cBqT1sdGnYYiPeTLWiFHAwDU64M'},
                    'da-dk': {'stg': 'caHPJwtg2jhjGKzhlPecgUfduBrDlqlZpiTmlOIdRarMY', 'prd': 'caFvvPPqgu1NqAGnpghLzHPGTkMtqIJtG1Ra8ZZE5OaxQ'},
                    'nb-no': {'stg': 'cawkB2CPhbOZok4H8gu8yZKNLMp7E3ct97Dj2ERZi86D0', 'prd': 'caR1efEJ3uUnQCrIVRuMXxCXBAsnICKqWL6Z7AdiWqWwA'},
                    'zh-cn': {'stg': 'cajtZIfFT7ZPsjo0yfCRB4RdU1pEvL08Q7bQ8oNSvSUbI', 'prd': 'caNIOX4FfLa2RwCzgodRNrZKquZB66LVVr5Y792jIr1nc'},
                    'ja-jp': {'stg': 'caPuv3LCkvwbAermx7Un9qFRIsZyhuA1WwEPCv2U5HrPo', 'prd': 'caSk15kP4lHLzcnGHpQfHn4RKaOkCtZ8gvIO6XMfLlNMQ'}
                };

            if (!productId) {
                errorService.warn('BazaarVoice: Product ID empty');
                deferred.reject();
                return deferred.promise;
            }

            if (locale in bvKeys) {
                localKey = bvKeys[locale]['prd'];
            } else {
                errorService.warn('BazaarVoice: No key for this locale');
                deferred.reject();
                return deferred.promise;
            }

            let cachedData = sessionStorageService.get(popupActive ? 'bazaarvoiceReviews' + productId : 'bazaarvoiceStatistics' + productId);

            if (cachedData) {
                deferred.resolve(cachedData);
                return deferred.promise.then((cachedData) => {
                    return {'data': cachedData};
                }, function(error) {
                    return deferred.reject(error);
                });
            }

            if (popupActive) {
                let getUrl = 'https://api.bazaarvoice.com/data/reviews.json';
                return $http.jsonp(`${getUrl}?apiversion=${apiV}&passkey=${localKey}&Filter=ProductId:${productId}&HasComments:true&Include=Products&Stats=Reviews&Limit=100`, {'jsonpCallbackParam': 'callback'}).then(response => {
                    sessionStorageService.set('bazaarvoiceReviews' + productId, response.data);
                    return response;
                }, handleRejection);
            } else {
                let getUrl = 'https://api.bazaarvoice.com/data/statistics.json';
                return $http.jsonp(`${getUrl}?apiversion=${apiV}&passkey=${localKey}&Filter=ProductId:${productId}&Stats=Reviews`, {'jsonpCallbackParam': 'callback'}).then(response => {
                    sessionStorageService.set('bazaarvoiceStatistics' + productId, response.data);
                    return response;
                }, handleRejection);
            }
        }
    }
})();
