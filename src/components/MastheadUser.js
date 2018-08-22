// @flow
import React from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

// LJV TODO Move help link to configuration and don't show if not set.

type MastheadUserProps = {
  /** The name of the user to display, if logged in. Optional. */
  username?: string;
  /** The function to call to log the user out. If not set, the user cannot log out. */
  logoutFunction?: () => void;
  /** The URI to use for global on-line help. If not set, the help button won't be shown. */
  helpUri?: string;
};

/**
 * Displays the currently logged-in user inside the masthead.
 * The user can click on the name to pop-up a menu with a log-out command.
 */
export default class MastheadUser extends React.Component<MastheadUserProps, void> {
  static defaultProps = {
    username: undefined,
    logoutFunction: undefined,
    helpUri: undefined,
  };

  static displayName = 'MastheadUser';

  constructor(props: MastheadUserProps) {
    super(props);
    (this: any).handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
    if (this.props.logoutFunction) {
      this.props.logoutFunction();
    }
  }

  render() {
    const dropdown = this.props.logoutFunction ? (
      <Dropdown id="attivio-globalmast-user-dropdown" pullRight>
        <Dropdown.Toggle
          noCaret
          useAnchor
          style={{
            background: 'transparent',
            color: '#fff',
          }}
        >
          <span className="attivio-globalmast-icon attivio-icon-arrow-down-blue" />
        </Dropdown.Toggle>
        <Dropdown.Menu onSelect={this.handleSelect}>
          <MenuItem>Log Out</MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    ) : null;

    const helpButton = this.props.helpUri ? (
      <a href={this.props.helpUri} target="_blank" style={{ marginLeft: '8px' }} rel="noopener noreferrer">
        <img src="img/vector/help.svg" title="On-line Help" alt="On-line Help" />
      </a>
    ) : null;

    const contents = dropdown || helpButton ? (
      <span>
        {' '}
        {dropdown}
        {helpButton}
      </span>
    ) : null;
    if (this.props.username && this.props.username.length > 0) {
      return (
        <div className="attivio-globalmast-user attivio-globalmast-separator before">
          {this.props.username}
          {contents}
        </div>
      );
    }
    return null;
  }
}
