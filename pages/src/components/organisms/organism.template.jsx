import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';

import { } from '@actions';

const ContentRepository = ({ }) => (
    <section>
        ContentRepository
    </section>
);

export default connect(
    (state) => ({
        
    }),
    (dispatch) => ({
        ACTION_HANDLER() {
            dispatch(ACTION());
        }
    })
)(ContentRepository)

// export const CountrySelectorQuery = graphql`
//     fragment localizationFooterCountrySelectorFragment on LocalizationFooterCountrySelectorJson {
//         _fields {
//             Body
//         }
//     }
// `;