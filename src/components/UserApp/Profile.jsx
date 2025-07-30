import React, { useEffect, useState } from 'react';
import './Profile.css';
import { faUserAlt, faEnvelope, faPhone, faEdit, faKey, faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const FloatingProfile = ({ onClose, onChangePassword }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user/me');
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleEditProfile = () => {
    if (!user) return;
    onClose?.();
    navigate('/edit-profile', { state: { user } });
  };

  return (
    <div className="floating-card shadow rounded">
      <div className="card-body position-relative">
        <button className="btn-close position-absolute top-0 end-0 mt-2 me-2" onClick={onClose}></button>
        
        <div className="text-center mb-3">
          <FontAwesomeIcon icon={faUserAlt} size="2x" className="mb-2 text-primary" />
          <h5 className="mb-0">{user?.username}</h5>
          <small className="text-muted">{user?.name}</small>
        </div>
        <hr />

        <div className="text-start">
          <p className="mb-2">
            <FontAwesomeIcon icon={faEnvelope} className="me-2 text-secondary" />
            <span>{user?.email}</span>
          </p>
          <p className="mb-3">
            <FontAwesomeIcon icon={faPhone} className="me-2 text-secondary" />
            <span>{user?.contactnumber}</span>
          </p>
          <p className="mb-3">
            <FontAwesomeIcon icon={faIdBadge} className="me-2 text-secondary" />
            <span className="me-2">{user?.referralId}</span>
          </p>

          <button className="btn btn-outline-primary w-100 mb-2 d-flex align-items-center justify-content-center"
                  onClick={handleEditProfile}>
            <FontAwesomeIcon icon={faEdit} className="me-2" />
            Edit Profile
          </button>

          <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center" onClick={onChangePassword}>
            <FontAwesomeIcon icon={faKey} className="me-2" />
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingProfile;
