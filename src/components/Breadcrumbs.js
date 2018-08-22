// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import StringUtils from '../util/StringUtils';

export class BreadcrumbInfo {
  label: string;
  location: any;

  constructor(label: string, location: any) {
    this.label = label;
    this.location = location;
  }
}

type BreadcrumbsProps = {
  history: PropTypes.object.isRequired;
  /** The breadcrumbs to display; their locations must all be unique. */
  crumbs: Array<BreadcrumbInfo>;
  /**
   * The callback to use when a breadcrumb link is clicked. Defaults to
   * just pushing the breadcrumb's location onto the router.
   */
  onClick?: (location: any) => void;
};

class Breadcrumbs extends React.Component<BreadcrumbsProps, void> {
  static BreadcrumbInfo;

  static defaultProps = {
    onClick: undefined,
  };

  static displayName = 'Breadcrumbs';

  constructor(props: BreadcrumbsProps) {
    super(props);
    (this: any).handleClick = this.handleClick.bind(this);
  }

  links: Array<HTMLAnchorElement | null>;

  handleClick(location: any, index: number) {
    if (this.links && this.links[index]) {
      this.links[index].blur();
    }
    if (this.props.onClick) {
      this.props.onClick(location);
    } else {
      this.props.history.push(location);
    }
  }

  render() {
    const crumbs = this.props.crumbs.map((crumb, index) => {
      const label = StringUtils.smartTruncate(crumb.label, 40);
      if (index < (this.props.crumbs.length - 1)) {
        // We're at a prior level... show the link and the separator icon
        if (crumb.location) {
          return (
            <li key={JSON.stringify(crumb.location)}>
              <a
                onClick={() => { this.handleClick(crumb.location, index); }}
                role="button"
                tabIndex={0}
                ref={(c) => {
                  if (!this.links) {
                    this.links = [];
                  }
                  this.links[index] = c;
                }}
              >
                {label}
                <span className="attivio-icon-arrow-right" />
              </a>
            </li>
          );
        }
        // Simple breadcrumbs without links
        const key = `${crumb.label}-${index}`;
        return (
          <li key={key}>
            {label}
            <span className="attivio-icon-arrow-right" />
          </li>
        );
      }
      return <li key={JSON.stringify(crumb.location)} className="active">{label}</li>;
    });
    return (
      <ol className="list-inline attivio-360-breadcrumb" style={{ margin: 0 }}>
        {crumbs}
      </ol>
    );
  }
}

Breadcrumbs.BreadcrumbInfo = BreadcrumbInfo;

export default withRouter(Breadcrumbs);
