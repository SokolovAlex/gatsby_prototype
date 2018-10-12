import { graphql } from 'gatsby';

export const query = graphql`
  fragment homeSecurityMainNavMainNavFragment on HomeSecurityMainNavMainNavJson {
    _fields {
      mainNavItem {
        text
        link
        megaMenuItem {
          fields {
            menuType
            mega_menu_secondary_nav {
              secondary_nav_side_title
              secondary_nav_side_links {
                text
                link
                class
              }
            }
            customLinks {
              text
              link
              class
            }
            megaSideBlock2
            product {
              fields {
                prodKasperskyTitle
                title
                prodMainTitle
                prodPageLink
                shortName
                promoM
                new
                summary
                description
                shortDesc
                overrideProductDesc
                productFeatures {
                  description
                  image
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
