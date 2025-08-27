import React, { useEffect, useState, useMemo } from 'react';
import { Container, Table, Button, Modal, Form, Row, Col, Spinner, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    contactnumber: '',
    referralId: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoadingList(true);
        const res = await api.get('/admin/users');
        setUsers(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load users');
      } finally {
        setLoadingList(false);
      }
    };
    load();
  }, []);

  const handleRowClick = (referralId) => {
    navigate(`/admin/user/${referralId}`);
  };

  // --- Edit ---
  const openEditModal = (e, user) => {
    e.stopPropagation(); // don't trigger row navigation
    setSelectedUser(user);
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      contactnumber: (user?.contactnumber ?? '').toString(),
      referralId: user?.referralId || '',
    });
    setShowEdit(true);
  };

  const closeEditModal = () => {
    setShowEdit(false);
    setSelectedUser(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const hasChanges = useMemo(() => {
    if (!selectedUser) return false;
    return (
      editForm.name !== (selectedUser.name || '') ||
      editForm.contactnumber !== ((selectedUser.contactnumber ?? '').toString())
    );
  }, [editForm, selectedUser]);

  const saveUser = async () => {
    if (!selectedUser?._id) return;
    if (!editForm.name.trim()) {
      toast.error('Name is required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: editForm.name,
        contactnumber: editForm.contactnumber,
      };
      await api.put(`/admin/users/${selectedUser._id}`, payload);

      // Update local list
      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUser._id
            ? { ...u, name: editForm.name, contactnumber: editForm.contactnumber }
            : u
        )
      );
      toast.success('User updated');
      closeEditModal();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.detail || 'Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  // --- Delete ---
  const handleDelete = async (e, userId) => {
    e.stopPropagation(); // don't trigger row navigation
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success('User deleted');
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.detail || 'Failed to delete user');
    }
  };

  const totalUsers = users.length;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Registered Users</h2>
      <Badge className="m-2 p-2" bg="primary" pill title="Total users">Total User - {totalUsers}</Badge>
      <Button
        variant="outline-secondary"
        className='m-2'
        onClick={() => navigate('/admin/applications')}
      >
        Applications
      </Button>
      <Button
        variant="outline-secondary"
        onClick={() => navigate('/admin/registrations')}
      >
        Registrations
      </Button>
      {loadingList ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th style={{ width: 60 }}>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Referral ID</th>
              <th style={{ width: 170 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleRowClick(user.referralId)}
              >
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contactnumber}</td>
                <td>{user.referralId}</td>
                <td className="d-flex gap-2">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={(e) => openEditModal(e, user)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={(e) => handleDelete(e, user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Edit User Modal */}
      <Modal show={showEdit} onHide={closeEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              {/* Editable */}
              <Col md={6} className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  placeholder="Enter full name"
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactnumber"
                  value={editForm.contactnumber}
                  onChange={handleEditChange}
                  placeholder="e.g. +44 7522 405709"
                />
              </Col>

              {/* Read-only */}
              <Col md={6} className="mb-3">
                <Form.Label>Email (read-only)</Form.Label>
                <Form.Control type="email" name="email" value={editForm.email} disabled />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Referral ID (read-only)</Form.Label>
                <Form.Control type="text" name="referralId" value={editForm.referralId} disabled />
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal} disabled={saving}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveUser} disabled={saving || !hasChanges}>
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
