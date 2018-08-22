// @flow

import React from 'react';

import SearchFacetBucket from '../api/SearchFacetBucket';

import MoreList from './MoreList';

type MoreListFacetContentsProps = {
  /** The facet's buckets. */
  buckets: Array<SearchFacetBucket>;
  /** Callback to add a filter for this facet. */
  addFacetFilter: (bucket: SearchFacetBucket) => void;
  /** boolean condition to remove hyperlinks from tags and show them as plain text */
  noLink?: boolean;
};

/** Display a facet's bucket values in a MoreList component. */
export default class MoreListFacetContents extends React.Component<MoreListFacetContentsProps, void> {
  static displayName = 'MoreListFacetContents';

  static defaultProps = {
    noLink: false,
  };

  constructor(props: MoreListFacetContentsProps) {
    super(props);
    (this: any).addFilter = this.addFilter.bind(this);
  }

  addFilter(event: SyntheticEvent<HTMLAnchorElement>) {
    this.props.addFacetFilter(this.props.buckets[event.currentTarget.tabIndex]);
    event.currentTarget.blur();
  }

  render() {
    const rows = this.props.buckets.map((bucket, index) => {
      if (this.props.noLink) {
        return (
          <li key={bucket.bucketKey()}>
            <span>
              {bucket.displayLabel()}
            </span>
            {' '}
            {'('}
            {bucket.count}
            {')'}
          </li>
        );
      }
      return (
        <li key={bucket.bucketKey()}>
          <a onClick={this.addFilter} role="button" tabIndex={index}>
            {bucket.displayLabel()}
          </a>
          {' '}
          {'('}
          {bucket.count}
          {')'}
        </li>
      );
    });
    return <MoreList shortSize={6}>{rows}</MoreList>;
  }
}
