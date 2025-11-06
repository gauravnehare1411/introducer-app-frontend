import { Container, Table, Button, Spinner, Badge } from 'react-bootstrap';

export default function Introducers({
    totalUsers,
    users,
    openEditModal,
    handleRowClick,
    handleDelete,
    loadingList
}) {
  return (
    <div>
      <Container className="mt-4">
      <h2 className="mb-4">Introducers</h2>
      <Badge className="m-2 p-2" bg="primary" pill title="Total users">Total Introducers - {totalUsers}</Badge>
      
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
    </Container>
    </div>
  );
}
