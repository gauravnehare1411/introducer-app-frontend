import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import { toast } from 'react-toastify';
import NavigationButtons from './inc/NavigationButtons';
import Introducers from './inc/Introducers';
import EditModal from './inc/EditModal';
import Customers from './inc/Customers';

const AdminDashboard = () => {
  const [selectedView, setSelectedView] = useState('introducers');
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
    if (selectedView !== 'introducers') return;
    const load = async () => {
      try {
        setLoadingList(true);
        const res = await api.get(`/admin/users/${'user'}`);
        setUsers(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load users');
      } finally {
        setLoadingList(false);
      }
    };
    load();
  }, [selectedView]);

  const handleRowClick = (referralId) => {
    navigate(`/admin/user/${referralId}`);
  };

  // --- Edit ---
  const openEditModal = (e, user) => {
    e.stopPropagation();
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
    e.stopPropagation();
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

  const renderView = () => {
    switch (selectedView) {
      case 'introducers':
        return (
          <>
            <Introducers
              totalUsers={totalUsers}
              users={users}
              openEditModal={openEditModal}
              handleRowClick={handleRowClick}
              handleDelete={handleDelete}
              loadingList={loadingList}
            />
            <EditModal
              showEdit={showEdit}
              closeEditModal={closeEditModal}
              handleEditChange={handleEditChange}
              editForm={editForm}
              saveUser={saveUser}
              saving={saving}
              hasChanges={hasChanges}
            />
          </>
        );
      case 'customers':
        return <Customers />;
      default:
        return null;
    }
  };
  return (
    <>
      <NavigationButtons onSelect={setSelectedView} selectedView={selectedView} />
      {renderView()}
    </>
  );
};

export default AdminDashboard;
