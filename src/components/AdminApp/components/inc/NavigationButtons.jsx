import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NavigationButtons({ onSelect, selectedView }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
      <ButtonGroup>
        <Button
          variant={selectedView === 'introducers' ? 'primary' : 'outline-primary'}
          onClick={() => onSelect('introducers')}
        >
          Introducers
        </Button>

        <Button
          variant={selectedView === 'customers' ? 'primary' : 'outline-primary'}
          onClick={() => onSelect('customers')}
        >
          Customers
        </Button>

        <Button
          variant="outline-primary"
          onClick={() => navigate('/admin/my-applications')}
        >
          My Applications
        </Button>

        <Button
          variant="outline-primary"
          onClick={() => navigate('/factfind')}
        >
          FactFind
        </Button>
      </ButtonGroup>
    </div>
  );
}
