/*
 * StubPage
 */
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export default class StubPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet
          title="Stub"
          meta={[
            { name: 'description', content: 'A simple stub page to demonstrate the functional SPA.' },
          ]}
        />
        <h1><FormattedMessage {...messages.greeting} /></h1>
        <p><FormattedMessage {...messages.text} /></p>
      </div>
    );
  }
}
