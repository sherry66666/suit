// @flow
import * as React from 'react';

type NavbarProps = {
  /**
   * Any children can live inside the Navbar but those components whose
   * names start with "Navbar" are designed explicitly to be there.
   */
  children: React.Node;
};

/** A navigation bar that's under the main Masthead. */
export default class Navbar extends React.Component<NavbarProps, void> {
  static displayName = 'Navbar';

  render() {
    return (
      <div className="attivio-navbar navbar">
        {this.props.children}
      </div>
    );
  }
}
