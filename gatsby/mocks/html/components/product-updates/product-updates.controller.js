(function() {
    //TODO: refactor the entire monstorus component
    'use strict';
    angular.module('kappGlobal.productUpdates')
        .controller('productUpdatesController', productUpdatesController);

    function productUpdatesController($q, directiveData, downloadLinks, $log, productData, productDownloadHelper, $element, validationHelper, ENV, errorService) {
        let ctrl = this;
        let hideAlphabets = [];
        ctrl.data = {};

        ctrl.section = '';
        ctrl.downloadLocales = productDownloadHelper.getDownloadLocales();
        ctrl.languageLocalNameDefault = 'en';
        ctrl.changeRegion = changeRegion;
        ctrl.displayDropdownOption = displayDropdownOption;
        ctrl.displayDropdownDefault = displayDropdownDefault;
        ctrl.isGlobalLocale = isGlobalLocale;
        ctrl.isCNLocale = isCNLocale;
        ctrl.geoIPOverrideForProductUpdates = geoIPOverrideForProductUpdates;
        ctrl.$onInit = activate;
        ctrl.translations = {};

        function activate() {
            ctrl.showDownloadLocale = ctrl.showDownloadLocale || false;

            $q.all([
                getGeneralTranslations(),
                getGeneralSettings(),
                getProductDownloadData()
            ]).catch(handleRejection);

            setRegionDefault();
            setLanguageLocalDefault();
        }

        function handleRejection(rejection) {
            errorService.warn(rejection);
        }

        function getGeneralTranslations() {
            return directiveData.getLocal('general-translations').then((response) => {
                ctrl.translations = response.data.fields;
            });
        }

        function getGeneralSettings() {
            return directiveData.getLocal('general-settings').then((response) => {
                let res = response.data.fields;
                if (res && res.hideAlphabets) return hideAlphabets = res.hideAlphabets;
            });
        }

        function getProductDownloadData(docsSettingsToUpdate) {
            return directiveData.getByUrl(ctrl.resource || 'product-updates').then((response) => {
                ctrl.data = response.data.fields;
                ctrl.section = location.pathname.split('/');

                const application = ctrl.data.productsTaxonomy.length === 0 ? '' : ctrl.data.productsTaxonomy.map(item => item.key);

                if (ctrl.data.linksType) {
                    if (!angular.isString(ctrl.data.selectedLanguagesCodes)) {
                        ctrl.data.selectedLanguagesCodes = ctrl.data.selectedLanguagesCodes.reduce((prev, cur, index) => index !== 0 ? prev + ',' + cur.key : prev + cur.key, '');
                    }
                    if (!angular.isString(ctrl.data.fallbackLanguageCode)) {
                        ctrl.data.fallbackLanguageCode = ctrl.data.fallbackLanguageCode.reduce((prev, cur, index) => index !== 0 ? prev + ',' + cur.key : prev + cur.key, '');
                    }

                    let updateFields = productDownloadHelper.constructUpdateFields(ctrl.data.localeSelectionType, ctrl.data.selectedLanguagesCodes, ctrl.data.websiteCountryCode || 'Global', 'en'),
                        globalDefault = productDownloadHelper.getFieldsToUpdate(updateFields);

                    docsSettingsToUpdate = docsSettingsToUpdate || globalDefault;
                    docsSettingsToUpdate = (angular.isDefined(docsSettingsToUpdate) && docsSettingsToUpdate.website_country_code !== 'global')
                        ? docsSettingsToUpdate
                        : globalDefault;

                    return $q.all([
                        productData.getcusjsonb2b(ctrl.section[1], ctrl.data.packName).then(response => ctrl.productInfo = response.data.fields),
                        getDownloadLinks(application, docsSettingsToUpdate).then(handleDownloadResponse)
                    ]);
                }
            });
        }

        function isGlobalLocale() {
            return ENV.locale.substr(3, 6) === 'global';
        }

        function isCNLocale() {
            return ENV.locale.substr(3, 6) === 'cn';
        }

        function geoIPOverrideForProductUpdates(obj, product, link, event) {
            let res = link,
                geoIPLinkOverride = ctrl.data.geoipLinkOverride,
                selectedLanguage;

            event.target.tagName === 'A' ? selectedLanguage = $element.find(event.target).parent().siblings('div').find('option:selected').text() : selectedLanguage = $element.find(event.target).parent().parent().siblings('div').find('option:selected').text();

            if (angular.isUndefined(geoIPLinkOverride)) {
                angular.element(event.currentTarget).attr('href', res);
                return false;
            }

            if (product === 'Kaspersky Internet Security for Android' && ctrl.data.KISAndroidBuildUrl) {
                res = ctrl.data.KISAndroidBuildUrl;
            }
            else {
                for (let i = 0, length = geoIPLinkOverride.length; i < length; i++) {
                    let item = geoIPLinkOverride[i];
                    if (item.product === product && item.language === selectedLanguage) {
                        res = item.overrideLink;
                        break;
                    }
                }
            }

            angular.element(event.currentTarget).attr('href', res);
        }

        function setRegionDefault() {
            ctrl.downloadLocale = ctrl.downloadLocale || ctrl.downloadLocales[0];
        }

        function setLanguageLocalDefault() {
            ctrl.languageLocalNameDefault = ctrl.downloadLocale.locale.split('-')[1];
        }

        function displayDropdownDefault(downloads) {
            let download = _.find(downloads, d => angular.isArray(hideAlphabets) ? hideAlphabets.indexOf(d.alphabet) === -1 : true);
            return download ? download.download_url : undefined;
        }

        function displayDropdownOption(local) {
            let result = true;
            if (!validationHelper.isNullOrUndefined(hideAlphabets)) {
                hideAlphabets.forEach((item) => {
                    if (item === local.alphabet) {
                        result = false;
                    }
                });
            }

            if (isCNLocale() && local.alphabet_loc_name === 'Traditional') {
                result = false;
            }

            return result;
        }

        function changeRegion(region) {
            if (region.name === 'Global') {
                return getProductDownloadData();
            }

            const regionLocale = productDownloadHelper.getRegionLocale(region),
                fields = productDownloadHelper.constructUpdateFields('', region.selectedLanguages, region.selectedCountryCode, regionLocale.languageCode),
                docsSettingsToUpdate = productDownloadHelper.getFieldsToUpdate(fields);

            return getProductDownloadData(docsSettingsToUpdate);
        }

        // Private methods
        function getDownloadLinks(application, docsSettingsToUpdate) {
            ctrl.downloadData = [];

            let appsQuery = application || ctrl.data.products.split(',');
            if (ctrl.data.productDownloadRequestRedefinition) convertRedefinitionToRequestFormat();
            // We make calls for each product separately, extending docSettings in case of request redefinition
            return $q.all(appsQuery.map((app) => {
                let docSettings = {
                    'applications': [app],
                    'options': {
                        'links_type': ctrl.data.linksType.toString(),
                        'locale_selection_type': docsSettingsToUpdate.locale_selection_type,
                        'selected_languages_codes': docsSettingsToUpdate.selected_languages_codes,
                        'fallback_language_code': docsSettingsToUpdate.fallback_language_code || ctrl.data.fallbackLanguageCode,
                        'website_country_code': docsSettingsToUpdate.website_country_code,
                        'website_language_code': docsSettingsToUpdate.website_language_code,
                        'website_fallback_language': 'en',
                        'lang_locale_link_selection_amount': null,
                        'show_release_version_type': null,
                        'use_aux_lang_for_app_plugins': null,
                        'cpp_id': ctrl.data.cppid
                    }
                };

                return downloadLinks.getByApp('', modifyRequest(app, docSettings));
            }));
        }

        /**
         * Merge the request responses into a single object already grouped by product.
         * @param  {Object} response API Responses
         */
        function handleDownloadResponse(response) {
            let arrayOfApps = response.map((productDownloadRequest) => {
                return productDownloadRequest.data.filter(productData => productData.applications.length !== 0);

            });

            ctrl.downloadData = arrayOfApps.map(app =>
                app.map(linksPack => {
                    return angular.extend(linksPack.applications[0], {
                        'linkType': linksPack.link_type,
                        'linkLabel': assignLinkLabel(linksPack.link_type) || linksPack.link_type,
                        'display_omniture': displayOmnitureTags(linksPack.link_type)
                    });
                }));
        }

        /**
         * Validates the set of link types, so that we don't get a broken request by mistake
         * @param {string} links_type contains a set of link types comma separated
         * @returns {string} validated string with incorrect types excluded
         */
        function checkLinksType(links_type) {
            return links_type && links_type.split(',')
                .map((type) => type.trim())
                .filter((type) => {
                    let match = type.match(/^(UpdateBuilds|Docs|OnlineHelp|ApplicationControlPlugins|AdditionalDistributives|ReleaseNotes|Downloaders)$/);
                    if (!match) {
                        $log.warn('Incorrect link type', links_type);
                    }
                    return match;
                }).join(',');
        }

        /**
         * Converts the redifinition data that comes from Tridion into format usable by the donwloads service
         */
        function convertRedefinitionToRequestFormat() {
            ctrl.data.productDownloadRequestRedefinition.forEach((item) => {
                Object.keys(item).forEach((key) => (angular.isArray(item[key]) && !item[key].length) || !item[key] ? delete item[key] : false);
                if (item.selected_languages_codes && !angular.isString(item.selected_languages_codes)) {
                    item.selected_languages_codes = item.selected_languages_codes.reduce((prev, cur, index) => index !== 0 ? prev + ',' + cur.key : prev + cur.key, '');
                }
                if (item.fallback_language_code && !angular.isString(item.fallback_language_code)) {
                    item.fallback_language_code = item.fallback_language_code.reduce((prev, cur, index) => index !== 0 ? prev + ',' + cur.key : prev + cur.key, '');
                }
                item.links_type = checkLinksType(item.links_type);
                if (!item.links_type) delete item.links_type;
            });
            // Determine which product request has to be redefined
            ctrl.appPositionSearchArray = ctrl.data.productDownloadRequestRedefinition.map((item) => item.productTaxonomy.key );
            // We don't need the product name anymore, cleaning it up so that we can extend docSettings object
            ctrl.data.productDownloadRequestRedefinition.forEach((item) => delete item.productTaxonomy );
        }

        /**
         * Modifies the request to downloads service based on Tridion redefinition data
         * @param app {string}
         * @param docSettings {object} request settings object
         * @returns {object} modified settings
         */
        function modifyRequest(app, docSettings) {
            if (ctrl.data.productDownloadRequestRedefinition) {
                let pos = ctrl.appPositionSearchArray.indexOf(app);
                if (pos !== -1) angular.extend(docSettings.options, ctrl.data.productDownloadRequestRedefinition[pos]);
            }
            return docSettings;
        }

        /**
         * Assign a label to each type
         * @param  {String} type Download type
         * @return {String}      Label for download type
         */
        function assignLinkLabel(type) {
            switch (type) {
            case 'UpdateBuilds':
                return ctrl.data.latestVersionText;
            case 'Downloaders':
                return ctrl.data.latestVersionText;
            case 'TrialBuilds':
                return ctrl.data.trialText;
            case 'Docs':
                return ctrl.data.docsText;
            case 'ApplicationControlPlugins':
                return ctrl.data.applicationControlPluginsText;
            case 'AdditionalDistributives':
                return ctrl.data.additionalDistributivesText;
            case 'ReleaseNotes':
                return ctrl.data.releaseNotesText;
            case 'OnlineHelp':
                return ctrl.data.onlineHelpLabel;
            default:
                return type;
            }
        }

        /**
         * Determine whether to show or hide omniture tags
         * @param  {String} linkType The download link type
         * @return {Boolean}
         */
        function displayOmnitureTags(linkType) {
            let array = ['UpdateBuilds', 'TrialBuilds', 'Downloaders'];
            return array.indexOf(linkType) > -1;
        }
    }
})();
