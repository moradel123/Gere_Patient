import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import './IconMenu.css'; // Import the CSS file

const IconMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isResized, setIsResized] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHomeClick = () => {
    setIsResized(true);
    handleClose();
  };

  return (
    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1000 }}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={`menu-icon-button ${isResized ? 'resized' : ''}`}
      >
        <div className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleHomeClick}>
          <Link to="/" className="menu-item-link">Accueille</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/Horaire" className="menu-item-link">Nos horaire</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/Medecin" className="menu-item-link">Nos medecins</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/Propos" className="menu-item-link">A propos</Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default IconMenu;