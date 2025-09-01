import React, { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import aai_logo from '../../assets/aai_logo.png';
import { toast } from 'react-toastify';
import FloatingProfile from '../UserApp/Profile';
import PasswordResetModal from '../UserApp/PasswordResetModal/PasswordResetModal';

const AppNavbar = ({ isLoggedIn, setIsLoggedIn, userRoles, setUserRoles }) => {
  const [expanded, setExpanded] = React.useState(false);
  const closeNavbar = () => setExpanded(false);
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('roles');
    setIsLoggedIn(false);
    setUserRoles([]);
    toast.success("Logout successful!");
    navigate('/sign-in');
  };

  const hasRole = (role) => {
    if (!userRoles) return false;
    if (Array.isArray(userRoles)) {
      return userRoles.map(r => r.toLowerCase()).includes(role.toLowerCase());
    }
    return userRoles.toLowerCase() === role.toLowerCase();
  };

  return (
    <>
      <Navbar 
        expanded={expanded} 
        onToggle={setExpanded} 
        expand="lg" 
        className="mb-4" 
        style={{borderBottom: "1px solid #FF6210"}}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" onClick={closeNavbar}>
            <img
              src={aai_logo}
              alt="Logo"
              height="50"
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
                  {hasRole("customer") && (
                    <Nav.Link as={Link} to="/mortgage" onClick={closeNavbar}>
                      Customer Area
                    </Nav.Link>
                  )}

                  {hasRole("user") && (
                    <Nav.Link as={Link} to="/introducer" onClick={closeNavbar}>
                      Introducer/Refer
                    </Nav.Link>
                  )}

                  {hasRole("admin") && (
                    <Nav.Link as={Link} to="/admin" onClick={closeNavbar}>
                      Admin
                    </Nav.Link>
                  )}

                  <Nav.Link
                    onClick={() => setShowProfileCard(!showProfileCard)}
                    style={{ color: '#000000ff' }}
                  >
                    <i className="bi bi-person-circle"></i> Profile
                  </Nav.Link>

                  <Button
                    style={{
                      color: 'red',
                      backgroundColor: 'white',
                      border:'1px solid #FF6210'
                    }}
                    onClick={() => { closeNavbar(); handleLogout(); }}
                    className="ms-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/sign-in" onClick={closeNavbar}>
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/introducer/sign-up" onClick={closeNavbar}>
                    Introducer
                  </Nav.Link>
                  <Nav.Link as={Link} to="/customer/sign-up" onClick={closeNavbar}>
                    Customer
                  </Nav.Link>
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
        />
      }
      <PasswordResetModal 
        show={showResetModal} 
        onHide={() => setShowResetModal(false)} 
      />
    </>
  );
};

export default AppNavbar;
