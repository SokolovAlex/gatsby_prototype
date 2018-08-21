import React from 'react'  
import Link from 'gatsby-link'

const FooterTemplate = ({ data }) => (  
  <footer>

  </footer>
)

export default FooterTemplate

export const footerQuery = graphql`
  query FooterTemplate($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      articles {
        id
        title
        content
      }
    }
  }
  `