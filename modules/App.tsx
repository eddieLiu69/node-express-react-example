
import * as React from 'react';
import Home from './Home'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Ghettohub Issues</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li>
          <li><NavLink to="/comments">Comments</NavLink></li>
        </ul>

        {/* add this */}
        {this.props.children}

      </div>
    )
  }
})