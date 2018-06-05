import React from 'react';

export default class SearchBar extends React.Component {
    render() {
      return (
        <nav className="green accent-2">
          <div className="nav-wrapper">
            <form>
              <div className="input-field">
                <input onChange={(e) => this.props.handleSearch(e)} ref={this.props.searchRef} id="search" placeholder="search postname" type="search" required/>
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
      )
  }
};
