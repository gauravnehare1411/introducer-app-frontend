import React, { useEffect, useState } from 'react';
import { Table, Badge, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ReferralDetailsModal from './ReferralDetailsModal';

const UserDetails = () => {
  const { referralId } = useParams();
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/admin/referrals/${referralId}`);
        setReferrals(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [referralId]);

  const totalReferrals = referrals.length;

  const parseCreatedAt = (v) => {
    if (!v) return null;
    if (typeof v === 'string') {
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d;
    }
    if (typeof v === 'object' && v.$date) {
      const d = new Date(v.$date);
      return isNaN(d.getTime()) ? null : d;
    }
    try {
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d;
    } catch {
      return null;
    }
  };

  const formatCreatedAtUK = (v) => {
    const d = parseCreatedAt(v);
    if (!d) return '—';
    return new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/London',
    }).format(d);
  };

  const openDetails = (ref) => {
    setSelected(ref);
    setShow(true);
  };

  const closeDetails = () => {
    setShow(false);
    setSelected(null);
  };

  const handleSaveStatus = async (newStatus) => {
    if (!selected?._id) return;
    try {
      await api.patch(`/admin/referrals/${selected._id}/status`, { status: newStatus });

      setReferrals((prev) =>
        prev.map((r) => (r._id === selected._id ? { ...r, status: newStatus } : r))
      );

      setSelected((prev) => (prev ? { ...prev, status: newStatus } : prev));
    } catch (error) {
      console.error('Failed to update status:', error);
      throw error; 
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Referrals for ID: {referralId}</h4>
      <Badge className="m-2 p-2" bg="primary" pill title="Total referrals">
        Total Referrals - {totalReferrals}
      </Badge>

      {loading ? (
        <div className="py-4 d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : referrals.length > 0 ? (
        <Table striped bordered responsive hover>
          <thead>
            <tr>
              <th style={{ width: 60 }}>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((ref, idx) => (
              <tr
                key={ref._id}
                onClick={() => openDetails(ref)}
                style={{ cursor: 'pointer' }}
                title="Click to view & change status"
              >
                <td>{idx + 1}</td>
                <td>{ref.firstName} {ref.lastName}</td>
                <td>{ref.referralEmail}</td>
                <td>{ref.purpose}</td>
                <td>
                  <Badge
                    bg={
                      ref.status === 'Approved' ? 'success' :
                      ref.status === 'Rejected' ? 'danger' : 'secondary'
                    }
                  >
                    {ref.status}
                  </Badge>
                </td>
                <td>{formatCreatedAtUK(ref.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No referrals found.</p>
      )}

      <ReferralDetailsModal
        show={show}
        onHide={closeDetails}
        referral={selected}
        onSaveStatus={handleSaveStatus}
        formatCreatedAt={formatCreatedAtUK}
      />
    </div>
  );
};

export default UserDetails;
