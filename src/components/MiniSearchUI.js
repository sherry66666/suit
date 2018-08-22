// @flow

import React from 'react';
import PropTypes from 'prop-types';

import NavbarSearch from './NavbarSearch';
import SearchResults from './SearchResults';
import Scrollable from './Scrollable';
import SearchResultsCount from './SearchResultsCount';
import ObjectUtils from '../util/ObjectUtils';
import Searcher from './Searcher';

type MiniSearchUIProps = {
  /**
   * A scale (1.0 = 100%) to use when rendering the search results part of
   * the MiniSearchUI. Optional—defaults to 100%.
   */
  scale?: number;
};

/**
 * A miniature, self-contained component that presentds super simple search UI including a text field for the
 * query, an indication of the number or results or error from the wuery, and a small, scrollable results area
 * showing the resulting documents. It must be nested inside a Searcher component and will use that parent
 * Searcher to manage its state.
 */
export default class MiniSearchUI extends React.Component<MiniSearchUIProps, void> {
  static defaultProps = {
    scale: 1.0,
  };

  static contextTypes = {
    searcher: PropTypes.instanceOf(Searcher),
  };

  static displayName = 'MiniSearchUI';

  constructor(props: MiniSearchUIProps) {
    super(props);
    (this: any).doSearch = this.doSearch.bind(this);
    (this: any).updateSearchQuery = this.updateSearchQuery.bind(this);
  }

  doSearch() {
    const searcher = this.context.searcher;
    searcher.doSearch();
  }

  updateSearchQuery(query: string) {
    const searcher = this.context.searcher;
    searcher.updateQuery(query);
  }

  render() {
    const scale = this.props.scale ? this.props.scale : 1.0;

    return (
      <div style={{ minHeight: '50vh' }}>
        <NavbarSearch
          onSearch={this.doSearch}
          updateSearchString={this.updateSearchQuery}
          value={this.context.searcher.state.query}
          style={{
            marginLeft: '8px',
          }}
        />
        <SearchResultsCount style={{ marginLeft: '20px', paddingBottom: '8px' }} />
        <Scrollable
          style={{
            height: '428px',
            width: '100%',
            borderTop: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            borderLeft: '1px solid #ccc',
          }}
        >
          <SearchResults
            format="simple"
            entityFields={ObjectUtils.toMap([])}
            style={{
              transform: `scale(${scale}, ${scale})`,
            }}
          />
        </Scrollable>
      </div>
    );
  }
}
