// @flow
import * as React from 'react';

type SeparatedListProps = {
  /** The contents of the SeparatedList component to be rendered. */
  children: React.Node;
};

/**
 * Render a list of items with a separator bar in between them.
 */
export default class SeparatedList extends React.Component<SeparatedListProps, void> {
  static displayName = 'SeparatedList';

  render() {
    return (
      <ul className="attivio-list-inline list-inline">
        {this.props.children}
      </ul>
    );
  }
}
