(function() {
    angular.module('kappGlobal.popup')
        .factory('popup', popup);
    function popup() {
        return {
            'popupGallery': function(el) {
                el.find('.popup-gallery div, .image-gallery').magnificPopup({
                    'delegate': 'a',
                    'type': 'image',
                    'closeOnContentClick': false,
                    'closeBtnInside': false,
                    'mainClass': 'mfp-with-zoom mfp-img-mobile',
                    'image': {
                        'verticalFit': true
                    },
                    'gallery': {
                        'enabled': true
                    },
                    'zoom': {
                        'enabled': true,
                        'duration': 300,
                        'opener': function(element) {
                            return element.find('img');
                        }
                    }
                });
            },
            'imageGallery': function(el) {
                el.find('.popup-image').magnificPopup({
                    'type': 'image',
                    'closeOnContentClick': false,
                    'closeBtnInside': false,
                    'fixedContentPos': true,
                    'mainClass': 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                    'image': {
                        'verticalFit': true
                    },
                    'zoom': {
                        'enabled': true,
                        'duration': 300

                    }
                });
            }
        };
    }
})();
