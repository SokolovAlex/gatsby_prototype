const { GraphQLString, GraphQLObjectType, GraphQLList } = require('gatsby/graphql');

const createSchema = (node) => {
  switch (node.schemaName) {
    case 'Main navigation': {
      // eslint-disable-next-line prefer-destructuring
      const type = node.internal.type;
      console.log(`transform: ${type}`);
      const linkItem = new GraphQLObjectType({
        name: `menuItem_${type}`,
        fields: {
          text: { type: GraphQLString },
          link: { type: GraphQLString },
          class: { type: GraphQLString },
          isExternal: { type: GraphQLList(GraphQLString) },
        },
      });

      const rightMenuItem = new GraphQLObjectType({
        name: `rightMenuItem_${type}`,
        fields: {
          menuItems: { type: GraphQLList(linkItem) },
          menuLink: { type: GraphQLString },
          menuText: { type: GraphQLString },
          cartLink: { type: GraphQLString },
        },
      });

      const productFeature = new GraphQLObjectType({
        name: `productFeatures_${type}`,
        fields: {
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          image: { type: GraphQLString },
        },
      });

      const ProductFields = new GraphQLObjectType({
        name: `productsField_${type}`,
        fields: {
          title: { type: GraphQLString },
          prodKasperskyTitle: { type: GraphQLString },
          prodMainTitle: { type: GraphQLString },
          prodPageLink: { type: GraphQLString },
          shortName: { type: GraphQLString },
          promoM: { type: GraphQLList(GraphQLString) },
          new: { type: GraphQLString },
          summary: { type: GraphQLString },
          description: { type: GraphQLString },
          shortDesc: { type: GraphQLString },
          overrideProductDesc: { type: GraphQLString },
          fullSizeImage: { type: GraphQLString },
          smallSizeImage: { type: GraphQLString },
          bg: { type: GraphQLString },
          productFeatures: { type: GraphQLList(productFeature) },
          freeTrialText: { type: GraphQLString },
          freeTrialLink: { type: GraphQLString },
          learnMoreText: { type: GraphQLString },
          learnMoreLink: { type: GraphQLString },
          updateText: { type: GraphQLString },
          updateLink: { type: GraphQLString },
        },
      });

      const Product = new GraphQLObjectType({
        name: `products_${type}`,
        fields: {
          fields: { type: ProductFields },
        },
      });

      const LinkItem = new GraphQLObjectType({
        name: `customLinks_${type}`,
        fields: {
          text: { type: GraphQLString },
          link: { type: GraphQLString },
          class: { type: GraphQLString },
        },
      });

      const SecondaryLinkItem = new GraphQLObjectType({
        name: `secondary_nav_side_links_${type}`,
        fields: {
          text: { type: GraphQLString },
          link: { type: GraphQLString },
          class: { type: GraphQLString },
        },
      });

      const MegaMenuItem = new GraphQLObjectType({
        name: `mega_menu_secondary_nav_${type}`,
        fields: {
          secondary_nav_side_title: { type: GraphQLString },
          secondary_nav_side_links: {
            type: GraphQLList(SecondaryLinkItem),
          },
        },
      });

      const megaMenuItemFields = new GraphQLObjectType({
        name: `megaMenuItemFields_${type}`,
        fields: {
          menuType: { type: GraphQLString },
          product: { type: GraphQLList(Product) },
          mega_menu_secondary_nav: { type: MegaMenuItem },
          customLinks: { type: GraphQLList(LinkItem) },
          megaSideBlock2: { type: GraphQLString },
        },
      });

      const megaMenuItem = new GraphQLObjectType({
        name: `megaMenuItem_${type}`,
        fields: {
          fields: { type: megaMenuItemFields },
        },
      });

      const mainNavItem = new GraphQLObjectType({
        name: `mainNavItem_${type}`,
        fields: {
          text: { type: GraphQLString },
          link: { type: GraphQLString },
          megaMenuItem: { type: megaMenuItem },
        },
      });

      const FieldsItem = new GraphQLObjectType({
        name: `mainNavigation_${type}`,
        fields: () => ({
          mainNavItem: { type: GraphQLList(mainNavItem) },
          rightMenuItem: { type: rightMenuItem },
        }),
      });

      return {
        _fields: { type: FieldsItem },
      };
    }
    case 'Main Footer': {
      // eslint-disable-next-line prefer-destructuring
      const type = node.internal.type;
      console.log(`transform: ${type}`);
      const block = new GraphQLObjectType({
        name: `block_${type}`,
        fields: {
          title: { type: GraphQLString },
          description: { type: GraphQLString },
        },
      });
      const socialIcon = new GraphQLObjectType({
        name: `socialIcon_${type}`,
        fields: {
          link: { type: GraphQLString },
          icon: { type: GraphQLString },
        },
      });

      const linkItem = new GraphQLObjectType({
        name: `shortViewLink_${type}`,
        fields: {
          text: { type: GraphQLString },
          link: { type: GraphQLString },
          class: { type: GraphQLString },
        },
      });
      const rssLinkItem = new GraphQLObjectType({
        name: `rssLink_${type}`,
        fields: {
          hide: { type: GraphQLList(GraphQLString) },
        },
      });

      const FieldsItem = new GraphQLObjectType({
        name: `mainFooter_${type}`,
        fields: () => ({
          leftSetOfBlocks: { type: GraphQLList(block) },
          contactUsBlock: { type: block },
          footerRightSideBlock: { type: block },
          socialBlockHeading: { type: GraphQLString },
          socialIcons: { type: GraphQLList(socialIcon) },
          copyright: { type: GraphQLString },
          copyright_smb: { type: GraphQLString },
          copyright_vsb: { type: GraphQLString },
          copyright_ent: { type: GraphQLString },
          shortViewLinks: { type: GraphQLList(linkItem) },
          rssLink: { type: rssLinkItem },
        }),
      });

      return {
        _fields: { type: FieldsItem },
      };
    }
    case 'General Localization Translation': {
      // eslint-disable-next-line prefer-destructuring
      const type = node.internal.type;
      console.log(`transform: ${type}`);
      const FieldsItem = new GraphQLObjectType({
        name: 'GeneralTranslationsJsonFields',
        fields: () => ({
          pageTitleAppendix: { type: GraphQLString },
          bvLocReviews: { type: GraphQLString },
          bvLocReviewsFor: { type: GraphQLString },
          bvLocRating: { type: GraphQLString },
          bvLocSortedBy: { type: GraphQLString },
          bvLocDate: { type: GraphQLString },
          bvLocBy: { type: GraphQLString },
          bvLocFrom: { type: GraphQLString },
          socialShareLikeThis: { type: GraphQLString },
          socialShareRecommendText: { type: GraphQLString },
          XSPMSP: { type: GraphQLString },
          XSPMSP_BESTBUY: { type: GraphQLString },
          ECOMM: { type: GraphQLString },
          ECOMM_MYKASPERSKY: { type: GraphQLString },
          NO_PRICING_OPTIONS: { type: GraphQLString },
          KSC_FAM_UNKNOWN: { type: GraphQLString },
          KFA_ACTIVE: { type: GraphQLString },
          searchResultsText: { type: GraphQLString },
          searchTypeEnterText: { type: GraphQLString },
          searchPressEnterText: { type: GraphQLString },
          searchResultsForText: { type: GraphQLString },
          searchOfText: { type: GraphQLString },
          searchRelevanceText: { type: GraphQLString },
          lrcAnchorText: { type: GraphQLString },
          lrcUsingText: { type: GraphQLString },
          lrcFieldCannotBeEmpty: { type: GraphQLString },
          lrcInvalidFormat: { type: GraphQLString },
          lrcInvalidSerial: { type: GraphQLString },
          dlDocsText: { type: GraphQLString },
          dlApplicationControlPluginsText: { type: GraphQLString },
          dlAdditionalDistributives: { type: GraphQLString },
          dlReleaseNotesText: { type: GraphQLString },
          dlLatestVersionsText: { type: GraphQLString },
          dlTrialText: { type: GraphQLString },
          dlForText: { type: GraphQLString },
          prDate: { type: GraphQLString },
          prSortBy: { type: GraphQLString },
          prReadMore: { type: GraphQLString },
          readMore: { type: GraphQLString },
          filterCertificates: { type: GraphQLString },
          certificatesAllTypes: { type: GraphQLString },
          certificatesAllDates: { type: GraphQLString },
          certificatesTotal: { type: GraphQLString },
          resouceNotAvailable: { type: GraphQLString },
          relatedArticles: { type: GraphQLString },
          latestArticles: { type: GraphQLString },
          featuredArticles: { type: GraphQLString },
          cookieDesc: { type: GraphQLString },
          cookieBtn: { type: GraphQLString },
        }),
      });

      return {
        _fields: { type: FieldsItem },
      };
    }
    default:
      return {};
  }
};

module.exports = {
  createSchema,
};
