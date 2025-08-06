import React, { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import aai_logo from '../../assets/aai_logo.png';
import { toast } from 'react-toastify';
import FloatingProfile from '../UserApp/Profile';
import PasswordResetModal from '../UserApp/PasswordResetModal/PasswordResetModal';

const AppNavbar = ({ isLoggedIn, setIsLoggedIn, userRole, setUserRole }) => {
  const [expanded, setExpanded] = React.useState(false);
  const closeNavbar = () => setExpanded(false);
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole(null);
    toast.success("Logout successful!");
    navigate('/');
  };

  return (
    <>
    <Navbar expanded={expanded} onToggle={setExpanded} variant="dark" expand="lg" className="mb-4" style={{backgroundColor: '#2a3d94ff'}}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={closeNavbar}>
          <img
            src={aai_logo}
            alt="Logo"
            height="40"
            style={{ objectFit: "contain" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar" className="justify-content-end">
          <Nav 
            className="
              d-flex
              flex-column flex-lg-row
              align-items-center
              text-center
              gap-2 gap-lg-0
            "
          >
            {isLoggedIn ? (
              <>
                { userRole?.toLowerCase() === 'admin' &&
                  <Nav.Link as={Link} to="/admin-dashboard" onClick={closeNavbar}>Dashboard</Nav.Link>
                }

                <Nav.Link onClick={() => {
                    setShowProfileCard(!showProfileCard);
                  }} style={{ color: '#fff' }}>
                  <i className="bi bi-person-circle"></i> Profile
                </Nav.Link>
                
                <Button variant="outline-light" onClick={() => { closeNavbar(); handleLogout(); }} className="ms-2">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={closeNavbar}>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={closeNavbar}>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {showProfileCard && 
    <FloatingProfile 
      onClose={() => setShowProfileCard(false)} 
      onChangePassword={() => setShowResetModal(true)}
      />}
    <PasswordResetModal show={showResetModal} onHide={() => setShowResetModal(false)} />
    </>
  );
};

export default AppNavbar;
