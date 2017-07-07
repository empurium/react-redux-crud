import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';

import messages from '../messages';
import StubPage from '../index';

describe('<StubPage />', () => {
  it('should always return false on shouldComponentUpdate()', () => {
    const renderedComponent = shallow(
      <StubPage />
    );

    expect(renderedComponent.instance().shouldComponentUpdate()).toBe(false);
  });

  it('should render with a Helmet', () => {
    const renderedComponent = shallow(
      <StubPage />
    );

    expect(renderedComponent.find(Helmet)).toHaveLength(1);
    expect(renderedComponent.find(Helmet).prop('title')).toBeTruthy();
    expect(renderedComponent.find(Helmet).prop('meta')).toBeTruthy();
  });

  it('should render its heading and sub-text', () => {
    const renderedComponent = shallow(
      <StubPage />
    );

    expect(renderedComponent.contains(
      <h1>
        <FormattedMessage {...messages.greeting} />
      </h1>
    )).toBe(true);

    expect(renderedComponent.contains(
      <p>
        <FormattedMessage {...messages.text} />
      </p>
    )).toBe(true);
  });
});
