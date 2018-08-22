// @flow

import * as React from 'react';

type ToggleProps = {
  /** The callback to run when the element is clicked */
  onClick: (e: Event) => void;
  /** The child components */
  children: React.Node;
};

/**
 * A toggle component for use in DropdownButtons
 */
export default class Toggle extends React.Component<ToggleProps, void> {
  static displayName = 'Toggle';

  constructor(props: ToggleProps) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
  }

  handleClick(e: Event) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <a href className="attivio-smalltoolbar-btn" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}
