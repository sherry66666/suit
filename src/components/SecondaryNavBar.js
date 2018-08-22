// @flow
import * as React from 'react';

type SecondaryNavBarProps = {
  /** The items to display in the nav bar. */
  children: React.Node;
}

/**
 * A row of subordinate navigation and/or controls under the masthead.
 */
export default class SecondaryNavBar extends React.Component<SecondaryNavBarProps, void> {
  static displayName = 'SecondaryNavBar';

  render() {
    return (
      <div className="attivio-globalmastnavbar attivio-minwidth">
        {this.props.children}
      </div>
    );
  }
}
