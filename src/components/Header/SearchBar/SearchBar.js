import React, { Component } from 'react';

import { ReactComponent as SearchIcon } from '../../../assets/SVG/search.svg';

class SearchBar extends Component {
  render() {
    return (
      <React.Fragment>
        <form className="header__form">
          <input
            className="header__form-input"
            type="text"
            placeholder="Tim khoa hoc"
          />
          <button className="header__form-button">
            <SearchIcon className="header__form-icon" />
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default SearchBar;
