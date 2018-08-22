// @flow

import QueryResponse from '../api/QueryResponse';
import SearchDocument from '../api/SearchDocument';
import SearchFacet from '../api/SearchFacet';

/**
 * Convert the response from a call to the Solr engine
 * into an Attivio QueryResponse so that it can be
 * processed by the Search UI.
 */
export default class SolrToQueryResponse {
  /**
   * Do the conversion.
   *
   * @param json          the JSON returned from the call to Solr
   * @param customOptions the custom options defined in the configuration
   */
  static convert(json: any, customOptions: any): QueryResponse {
    const result = new QueryResponse();

    if (json.responseHeader) {
      result.totalTime = json.responseHeader.QTime;
    }

    if (json.response) {
      result.totalHits = json.response.numFound;
    }
    if (json.response.docs.length > 0) {
      result.documents = SolrToQueryResponse.convertSolrDocuments(json.response.docs, customOptions);
    }
    if (json.facets) {
      result.facets = SolrToQueryResponse.convertSolrFacets(json.facets, customOptions);
    }

    return result;
  }

  /**
   * Turn non-array field values into arrays.
   */
  static wrapIfNotArray(v: any) {
    return Array.isArray(v) ? v : [v];
  }

  static convertSolrDocuments(documents: any, customOptions: any): Array<SearchDocument> {
    return documents.map((doc) => {
      const mapp = customOptions.mappings;
      const fields = {};

      Object.keys(mapp).forEach((k) => {
        if (mapp[k] && doc[mapp[k]]) {
          fields[k] = SolrToQueryResponse.wrapIfNotArray(doc[mapp[k]]);
        }
      });

      if (customOptions.customId && customOptions.customId.length > 0) {
        fields['.id'] = [doc[customOptions.customId]];
      } else {
        fields['.id'] = [doc.id];
      }

      fields['.score'] = [''];

      return SearchDocument.fromJson({ fields });
    });
  }

  static convertSolrFacets(facets: any, customOptions: any): Array<SearchFacet> {
    // Copy the facets
    const countlessFacets = Object.assign({}, facets);
    // If there is a count, delete it
    if (countlessFacets.count) {
      delete countlessFacets.count;
    }

    // Get the keys in the facets, each of which is a facet name
    const facetNames = Object.keys(countlessFacets);

    const attivioFacets = facetNames.map((facetName: string) => {
      // Get the facet configuration information based on its name
      const facetConfig = customOptions.facets.find((f) => {
        return f.field === facetName;
      }) || {};

      const jsonModel = {
        name: facetConfig.field || facetName,
        field: facetConfig.field || facetName,
        label: facetConfig.displayName || facetName,
        buckets: facets[facetName].buckets.map((b) => {
          return ({
            value: b.val,
            count: b.count,
            filter: `${facetConfig.field}:'${b.val}'`,
          });
        }),
      };

      return SearchFacet.fromJson(jsonModel);
    });

    return attivioFacets;
  }
}
