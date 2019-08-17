import React from 'react';
import Icon from './Icon';

const IconLink = ({ name, href, children }) => (
  <a href={href} className="flex ml2">
    <Icon name={name} />
    {children && <span className="dn di-l ml2 lh-title">{children}</span>}
  </a>
);

const Nav = () => (
  <header className="flex flex-column flex-row-ns justify-between items-center">
    <h1 className="tc tl-ns ma0 mb4 mb0-ns mr4-ns f2 fw2 normal ttl">Euan Marten</h1>
    <ul className="list pa0 ma0 f5 ttl flex flex-row">
      <li><IconLink href="https://www.instagram.com/e.seilide/" name="INSTAGRAM" /></li>
      <li><IconLink href="https://e-seilide.tumblr.com" name="TUMBLR" /></li>
      <li><IconLink href="http://twitter.com/e_seilide" name="TWITTER" /></li>
      <li><IconLink href="mailto:euansmarten@gmail.com" name="EMAIL">euansmarten@gmail.com</IconLink></li>
    </ul>
  </header>
);

export default Nav;
