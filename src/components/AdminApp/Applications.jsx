// src/pages/Applications.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { Container, Table, Button, Spinner, Badge, ButtonGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../../api';
import ReferralDetailsModal from './ReferralDetailsModal';

const STATUS_TABS = ['Pending', 'Approved', 'Rejected'];

const Applications = () => {
  const [activeStatus, setActiveStatus] = useState('Pending');
  const [loading, setLoading] = useState(false);
  const [referrals, setReferrals] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  const total = referrals.length;

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

  const loadReferrals = async (status) => {
    setLoading(true);
    try {
        const res = await api.get('/admin/referrals', { params: { status } });
        const data = res.data || [];

        const sorted = [...data].sort((a, b) => {
        const da = parseCreatedAt(a?.created_at);
        const db = parseCreatedAt(b?.created_at);
        if (!da && !db) return 0;
        if (!da) return 1;
        if (!db) return -1;
        return db - da;
        });

        setReferrals(sorted);
    } catch (err) {
        console.error(err);
        toast.error(`Failed to load ${status.toLowerCase()} referrals`);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadReferrals(activeStatus);
  }, [activeStatus]);

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
    <Container className="mt-4">
      <div className="d-flex align-items-center mb-3">
        <h3 className="mb-0">Applications</h3>
      </div>

      {/* Tabs */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <ButtonGroup>
          {STATUS_TABS.map((s) => (
            <Button
              key={s}
              variant={activeStatus === s ? 'primary' : 'outline-primary'}
              onClick={() => setActiveStatus(s)}
            >
              {s}
            </Button>
          ))}
        </ButtonGroup>

        <Badge bg="secondary" pill>
          Total: {total}
        </Badge>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </div>
      ) : referrals.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: 60 }}>#</th>
              <th>Referral Id</th>
              <th>Referrer Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((r, idx) => (
              <tr 
                key={r._id}
                onClick={() => openDetails(r)}
                style={{ cursor: 'pointer' }}
                title="Click to view & change status"
              >
                <td>{idx + 1}</td>
                <td>{r.referralId}</td>
                <td>{r.referrerName}</td>
                <td>{r.firstName} {r.lastName}</td>
                <td>{r.referralEmail}</td>
                <td>{r.purpose || '—'}</td>
                <td>
                  <Badge
                    bg={
                      r.status === 'Approved'
                        ? 'success'
                        : r.status === 'Rejected'
                        ? 'danger'
                        : 'secondary'
                    }
                  >
                    {r.status}
                  </Badge>
                </td>
                <td>{formatCreatedAtUK(r.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="mt-3">No {activeStatus.toLowerCase()} referrals found.</p>
      )}

      <ReferralDetailsModal
        show={show}
        onHide={closeDetails}
        referral={selected}
        onSaveStatus={handleSaveStatus}
        formatCreatedAt={formatCreatedAtUK}
      />
    </Container>
  );
};

export default Applications;
