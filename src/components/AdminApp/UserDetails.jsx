import React, { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../../api';

const UserDetails = () => {
  const { referralId } = useParams();
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    api.get(`/admin/referrals/${referralId}`)
      .then(res => setReferrals(res.data))
      .catch(err => console.error(err));
  }, [referralId]);

  const handleStatusChange = async (referralId, newStatus) => {
    try {
      await api.patch(`admin/referrals/${referralId}/status`, { status: newStatus });
      setReferrals(prev =>
        prev.map(ref => ref._id === referralId ? { ...ref, status: newStatus } : ref)
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Referrals for ID: {referralId}</h4>
      {referrals.length > 0 ? (
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Purpose</th>
              <th>Comment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map(ref => (
              <tr key={ref._id}>
                <td>{ref.firstName} {ref.lastName}</td>
                <td>{ref.referralEmail}</td>
                <td>{ref.referralPhone}</td>
                <td>{ref.purpose}</td>
                <td>{ref.comment}</td>
                <td>
                  <Form.Select
                    value={ref.status}
                    onChange={(e) => handleStatusChange(ref._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No referrals found.</p>
      )}
    </div>
  );
};

export default UserDetails;
