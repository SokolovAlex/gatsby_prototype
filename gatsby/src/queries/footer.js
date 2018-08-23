const footerQuery = `
    query FooterTemplate {
    footerJson {
        title
        pubdate
        schemaName
        _fields {
        footerTop
        leftSetOfBlocks {
            title
            description
        }
        contactUsBlock {
            title
            description
        }
        socialBlockHeading
        socialIcons {
            link
            icon
        }
        copyright
        mobileLabel
        shortViewLinks {
            text
            link
        }
        rssLink {
            hide
        }
        countrySelector
        Body
        footerRightSideBlock {
            title
            description
        }
        copyright_smb
        copyright_vsb
        copyright_ent
        }
    }
    }
`;

export { footerQuery };