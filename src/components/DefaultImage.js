// @flow

import React from 'react';

type DefaultImageProps = {
  /**
   * The address of the image you want to display.
   */
  src: string;
  /**
   * The address of a default image to display if there's an issue displaying
   * the preferred image address. Optional.
   */
  defaultSrc?: string;
};

type DefaultImageState = {
  src: string | null;
};

/**
 * Display a backup image if there is some error with the desired image source.
 * If neither provided source is successfully displayed, then display nothing.
 * You can pass in any props that work for a standard <img> tag and they'll be added to the inserted image.
 */
export default class DefaultImage extends React.Component<DefaultImageProps, DefaultImageState> {
  static defaultProps = {
    defaultSrc: undefined,
  }

  constructor(props: DefaultImageProps) {
    super(props);
    this.state = {
      src: props.src,
    };
    (this: any).onError = this.onError.bind(this);
  }

  state: DefaultImageState;

  onError() {
    let src = null;
    if (this.props.defaultSrc && this.state.src !== this.props.defaultSrc) {
      // If the defaultSrc prop is set and we're not already using it, try it.
      src = this.props.defaultSrc;
    }
    this.setState({
      src,
    });
  }

  render() {
    const src = this.state.src;

    const otherProps = Object.assign({}, this.props);
    delete otherProps.defaultSrc;
    delete otherProps.src;
    if (src !== null) {
      return <img src={this.state.src} onError={this.onError} {...otherProps} />; // eslint-disable-line jsx-a11y/alt-text
    }
    return null;
  }
}
