// @flow

import * as React from 'react';

type ClickableDivProps = {
  /** The callback used when the div is clicked. */
  onClick: (event: SyntheticEvent<HTMLDivElement>) => void;
  /** The contents of the div. */
  children: React.Node;
  /** An optional CSS style for the div. */
  style?: any;
  /** An optional class name for the div. */
  className?: string;
};

/**
 * Div which allows the user to click it. Also has a key-event
 * handler to let the user trigger it with a key. Automatically
 * handles blurring itself.
 */
export default class ClickableDiv extends React.Component<ClickableDivProps, void> {
  static defaultProps = {
    style: {},
    className: '',
  };

  constructor(props: ClickableDivProps) {
    super(props);
    (this: any).onClick = this.onClick.bind(this);
    (this: any).onKeyPress = this.onKeyPress.bind(this);
  }

  onClick(event: SyntheticEvent<HTMLDivElement>) {
    if (this.button) {
      this.button.blur();
    }
    this.props.onClick(event);
  }

  onKeyPress(event: SyntheticKeyboardEvent<HTMLDivElement>) {
    if (event.keyCode === 'Enter') {
      this.onClick(event);
    }
  }

  button: ?HTMLDivElement;

  render() {
    return (
      <div
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
        className={this.props.className}
        style={this.props.style}
        role="button"
        tabIndex="0"
        ref={(c) => {
          this.button = c;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
