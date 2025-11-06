import { Modal, Form, Row, Col, Button } from "react-bootstrap";

export default function EditModel({showEdit, closeEditModal, handleEditChange, editForm, saveUser, saving, hasChanges }) {
  return (
    <div>
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
    </div>
  );
}
