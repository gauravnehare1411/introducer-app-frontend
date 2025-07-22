import React, { useEffect, useState } from 'react';
import { Table, Card, Spinner } from 'react-bootstrap';
import api from '../api';

const MyReferrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const res = await api.get('/my-referrals');
        console.log(res.data);
        setReferrals(res.data);
      } catch (err) {
        console.error('Failed to fetch referrals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  return (
    <Card className="mx-auto mt-4 shadow" style={{ maxWidth: '800px' }}>
      <Card.Body>
        <h4 className="mb-4 text-center">My Referrals</h4>
        {loading ? (
          <div className="text-center"><Spinner animation="border" /></div>
        ) : referrals.length === 0 ? (
          <p className="text-center">No referrals found.</p>
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Purpose</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r, index) => (
                <tr key={r.id || index}>
                  <td>{index + 1}</td>
                  <td>{r.firstName} {r.lastName}</td>
                  <td>{r.referralEmail}</td>
                  <td>{r.referralPhone}</td>
                  <td>{r.purpose}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default MyReferrals;
