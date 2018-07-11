// @flow
import React from 'react';

import SearchDocument from '../api/SearchDocument';
import StringUtils from '../util/StringUtils';

import Card from './Card';
import DocumentType from './DocumentType';
import Configurable from './Configurable';
import SearchResultTitle from './SearchResultTitle';
import Signals from '../api/Signals';

type SimpleSearchResultProps = {
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration.
   */
  baseUri: string;
  /** The document to be displayed. */
  document: SearchDocument;
  /** The document’s position in the search results. */
  position: number,
}

type SimpleSearchResultDefaultProps = {
  baseUri: string;
}

/**
 * An individual Simple search result.
 */
class SimpleSearchResult extends React.Component<SimpleSearchResultDefaultProps, SimpleSearchResultProps, void> {
  static defaultProps = {
    baseUri: '',
  };

  static displayName = 'SimpleSearchResult';

  static getFirstDocumentType(list: Array<SearchDocument>): string {
    let result = '';
    if (list && list.length > 0) {
      result = list[0].getFirstValue('table');
    }
    return result;
  }

  static forDocument(document: SearchDocument, position: number, key: string): ?React$Element<any> {
    return (
      <SimpleSearchResult
        document={document}
        position={position}
        key={key}
      />
    );
  }

  constructor(props: SimpleSearchResultProps) {
    super(props);
    (this: any).rateDocument = this.rateDocument.bind(this);
  }

  rateDocument(doc: SearchDocument, rating: number) {
    if (doc.signal) {
      new Signals(this.props.baseUri).addSignal(doc, 'like', rating);
    }
  }

  render() {
    const doc = this.props.document;
    const docId = doc.getFirstValue('.id');
    const table = doc.getFirstValue('table');
    const text = doc.getFirstValue('teaser');

    return (
      <Card key={docId} style={{ marginBottom: '5px' }}>
        <div className="row" style={{ width: '100%', margin: 0 }} >
          <div className="col-sm-3 col-xs-4 col-md-3 col-lg-3" style={{ padding: 0 }}>
            <DocumentType docType={table} position={this.props.position} />
          </div>
          <div className="col-sm-9 col-xs-8 col-md-9 col-lg-9">
            <SearchResultTitle doc={doc} baseUri={this.props.baseUri} />
          </div>
        </div>
        <div className="row" style={{ width: '100%', margin: 0 }} >
          <div
            className="col-sm-12 col-xs-12 col-md-12 col-lg-12"
            style={{
              padding: 0,
            }}
          >
            {StringUtils.stripSimpleHtml(text)}
          </div>
        </div>
      </Card>
    );
  }
}

export default Configurable(SimpleSearchResult);
