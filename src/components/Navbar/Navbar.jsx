import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import aai_logo from '../../assets/aai_logo.png';

const AppNavbar = ({ isLoggedIn, handleLogout }) => {
  const [expanded, setExpanded] = React.useState(false);
  const closeNavbar = () => setExpanded(false);
  const navigate = useNavigate();

  return (
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
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="#" disabled style={{ color: '#fff' }}>
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
  );
};

export default AppNavbar;
