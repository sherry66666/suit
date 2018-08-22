// @flow
import React from 'react';

type NavbarPagerProps = {
  /** The currently displayed page number (0-based). */
  currentPage: number;
  /** The total number of pages. Defaults to the max integer value (essentially unbounded). */
  maxPage?: number;
  /**
   * A callback that is called with a new page number when
   * the user clicks the forward or back button.
   */
  onChange: (newPage: number) => void;
}

/**
 * Display a page control which lets the user go forward and
 * backward in the search results. The currently displayed
 * page is also displayed. If at the beginning or end of the
 * pages, then the forward and back arrow buttons are disabled.
 */
export default class NavbarPager extends React.Component<NavbarPagerProps, void> {
  static defaultProps = {
    maxPage: Number.MAX_SAFE_INTEGER,
  };

  static displayName = 'NavbarPager';

  constructor(props: NavbarPagerProps) {
    super(props);
    (this: any).navBack = this.navBack.bind(this);
    (this: any).navNext = this.navNext.bind(this);
  }

  navBack() {
    if (this.props.currentPage > 0) {
      this.props.onChange(this.props.currentPage - 1);
    }
  }

  navNext() {
    if (this.props.maxPage && this.props.currentPage < this.props.maxPage) {
      this.props.onChange(this.props.currentPage + 1);
    }
  }

  render() {
    const canPageBack = this.props.currentPage > 0;
    const canPageNext = this.props.maxPage && this.props.currentPage < this.props.maxPage;
    const baseButtonClass = 'attivio-globalmastnavbar-btn';
    const previousButtonClass = `${baseButtonClass} attivio-globalmastnavbar-pagination-previous attivio-icon-arrow-left-gray ${canPageBack ? '' : 'disabled'}`; // eslint-disable-line max-len
    const nextButtonClass = `${baseButtonClass} attivio-globalmastnavbar-pagination-next attivio-icon-arrow-right-gray ${canPageNext ? '' : 'disabled'}`; // eslint-disable-line max-len

    return (
      <div className="attivio-globalmastnavbar-pagination">
        <a className={previousButtonClass}>
          Previous
        </a>
        <div className="attivio-globalmastnavbar-pagination-page">
          Page
          {' '}
          {this.props.currentPage + 1}
        </div>
        <a className={nextButtonClass}>
          Next
        </a>
      </div>
    );
  }
}
