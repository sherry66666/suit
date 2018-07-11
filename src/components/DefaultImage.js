// @flow

import React from 'react';

type DefaultImageProps = {
  /**
   * The address of the image you want to display.
   */
  src: string;
  /**
   * The address of a default image to display if there's an issue displaying the prefered image address. Optional.
   */
  defaultSrc: string | null;
};

type DefaultImageDefaultProps = {
  defaultSrc: string | null;
}

type DefaultImageState = {
  src: string | null;
};

/**
 * Display a backup image if there is some error with the desired image source.
 * If neither provided source is successfully displayed, then display nothing.
 * You can pass in any props that work for a standard <img> tag and they'll be added to the inserted image.
 */
export default class DefaultImage extends React.Component<DefaultImageDefaultProps, DefaultImageProps, DefaultImageState> {
  static defaultProps = {
    defaultSrc: null,
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
    if (this.state.src !== this.props.defaultSrc) {
      src = this.props.defaultSrc;
    }
    this.setState({
      src,
    });
  }

  render() {
    if (this.state.src !== null) {
      const { src, defaultSrc, ...otherProps } = this.props; // We only want to pass the remaining props to avoid an unknown prop warning
      // Note: the alt value should be in otherProps
      return <img src={this.state.src} onError={this.onError} {...otherProps} />; // eslint-disable-line jsx-a11y/alt-text
    }
    return null;
  }
}
