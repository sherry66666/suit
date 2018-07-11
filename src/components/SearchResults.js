// @flow
import React from 'react';
import PropTypes from 'prop-types';

import FieldNames from '../api/FieldNames';
import SearchDocument from '../api/SearchDocument';

import DebugSearchResult from './DebugSearchResult';
import SimpleSearchResult from './SimpleSearchResult';

type SearchResultRenderer = (doc: SearchDocument, position: number, key: string) => ?React$Element<any>;

type SearchResultsProps = {
  /**
   * The format to use for displaying the individual documents. Leave as the default
   * (null) to use a simple search result. Otherwise, can be set to either a single function
   * or an array of functions which will render the result for a given document given
   * the document, its position in the list, and a unique key to use in the outermost component
   * for React's sake. If this property is an array of functions, then they will be called, in
   * turn, until one returns a non-null value or they have all been called. The first non-null
   * value will be rendered.
  */
  format: null | SearchResultRenderer | Array<SearchResultRenderer>;
  /**
   * If this is set, then the debug view of the documents is shown instead of the specified format.
   * The debug flag takes precedence.
  */
  debug: boolean;
  /** An optional CSS style to apply to the results list as a whole */
  style: ?any;
};

type SearchResultsDefaultProps = {
  format: null | SearchResultRenderer | Array<SearchResultRenderer>;
  debug: boolean;
};

/**
 * A container for showing a list of documents from the search results.
 * This comes from the parent Searcher component.
 */
export default class SearchResults extends React.Component<SearchResultsDefaultProps, SearchResultsProps, void> {
  static defaultProps = {
    format: null,
    debug: false,
  };

  static contextTypes = {
    searcher: PropTypes.any,
  };

  static displayName = 'SearchResults';

  renderIndividualResult(document: SearchDocument, position: number) {
    let result = null;
    // Document IDs are unique, so we use them as the keys
    const key = document.getFirstValue(FieldNames.ID);

    // Debug trumps other stuff
    if (this.props.debug) {
      result = DebugSearchResult.forDocument(document, position, key);
    } else if (typeof this.props.format === 'function') {
      result = this.props.format(document, position, key);
    } else if (Array.isArray(this.props.format)) {
      this.props.format.forEach((renderFunction) => {
        if (!result) {
          result = renderFunction(document, position, key);
        }
      });
    } else {
      result = SimpleSearchResult.forDocument(document, position, key);
    }
    if (!result) {
      console.log(`No result created for document with ID ${key}; it won't be shown.`);
    }

    return result;
  }

  renderResults() {
    const searcher = this.context.searcher;
    const response = searcher.state.response;
    const offset = searcher.state.resultsOffset;
    if (response && response.documents && response.documents.length > 0) {
      const documents = response.documents;
      const results = [];
      documents.forEach((document: SearchDocument, index: number) => {
        const position = offset + index + 1;
        const result = this.renderIndividualResult(document, position);
        if (result) {
          results.push(result);
        }
      });
      return results;
    }
    return null;
  }

  render() {
    const baseStyle = this.props.style ? this.props.style : {};
    const s = Object.assign({}, baseStyle, {
      listStyle: 'none',
      paddingLeft: 0,
    });

    return (
      <ul style={s}>
        {this.renderResults()}
      </ul>
    );
  }
}
