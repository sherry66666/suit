// @flow

import * as React from 'react';

type CodeProps = {
  /** The contents of the Code tag can be whatever you like. */
  children: React.Node;
};

/**
 * Component to show source code in a traditional, monospaced font etc.
 */
export default class Code extends React.Component<CodeProps, void> {
  static displayName = 'Code';

  render() {
    return (
      <code className="attivio-code" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <pre>
          {this.props.children}
        </pre>
      </code>
    );
  }
}
