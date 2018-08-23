(function() {
    'use strict';
    angular.module('kappGlobal.productScriptsInjector')
        .factory('productScriptsInjectorService', productScriptsInjectorService);

    function productScriptsInjectorService($location, $document) {
        return {
            'performInjection': performInjection,
            'mapSchema': mapSchema
        };

        function performInjection(object) {
            let s = $document[0].createElement('script');
            s.type = 'application/ld+json';
            s.setAttribute('id', 'product-generated');

            $('#product-generated').remove();

            s.text = JSON.stringify(mapSchema(object));
            $('head').append(s);
        }

        function mapSchema(value) {
            let vp = value.productData || {},
                vc = value.cutPrice || [],
                vcv = (vc.length) ? vc[vc.length - 1] : {},
                vcvp = (vcv.price) ? vcv.price.toString() : '0',
                vpv = value.priceValue || {},
                vpvp = (vpv.price) ? vpv.price.toString() : '0';

            return {
                '@context': 'http://schema.org/',
                '@type': 'Product',
                'brand': {
                    '@type': 'Organization',
                    'logo': 'https://cdn.press.kaspersky.com/files/2013/06/Kaspersky_png.png',
                    'name': 'Kaspersky Lab'
                },
                'description': value.description,
                'image': vp.fullSizeImage,
                'name': getProductTitle(vp),
                'aggregateRating': getBvStats(value),
                'offers': {
                    '@type': 'Offer',
                    'availability': 'http://schema.org/InStock',
                    'priceSpecification': {
                        'maxPrice': value.max || vcvp,
                        'minPrice': value.min || vpvp,
                        'price': vpvp,
                        'priceCurrency': vpv.currency
                    },
                    'seller': {
                        '@type': 'Organization',
                        'name': 'Kaspersky Lab'
                    }
                },
                'url': $location.path() || vp.prodPageLink
            };
        }

        function getBvStats(ctrl) {
            let bv = ctrl.bv;
            if (bv && bv.Includes && bv.Includes.Products && bv.Includes.Products[ctrl.productData.bvId]) {
                let reviewStats = bv.Includes.Products[ctrl.productData.bvId].ReviewStatistics;
                return {
                    '@type': 'AggregateRating',
                    'ratingValue': reviewStats.AverageOverallRating.toString(),
                    'reviewCount': reviewStats.TotalReviewCount.toString()
                };
            }
        }

        function getProductTitle(vp) {
            return vp.prodAddTitle ? `${vp.prodKasperskyTitle} ${vp.prodMainTitle} ${vp.prodAddTitle}` : `${vp.prodKasperskyTitle} ${vp.prodMainTitle}`;
        }
    }
})();
