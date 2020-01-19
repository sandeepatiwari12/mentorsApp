import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import { ListAltOutlined, AccountBoxOutlined } from '@material-ui/icons';

const menuItems = [
  {
    id: 1,
    name: 'Task List',
    path: '/dashboard'
  },
  {
    id: 4,
    name: 'About',
    path: '/about'
  }
];

export default function Sidebar() {
  return (
    <Fragment>
      <List>
        {menuItems.map((nav, index) => (
          <Link
            to={nav.path}
            key={String(`${nav.id}_${index}`)}
            className="menu-link"
          >
            <ListItem button key={nav.id}>
              <ListItemIcon>
                {index % 2 === 0 ? <ListAltOutlined /> : <AccountBoxOutlined />}
              </ListItemIcon>
              <ListItemText primary={nav.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Fragment>
  );
}
