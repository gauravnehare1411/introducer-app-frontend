import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../../../../api";

export default function UploadDocuments() {
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    id_proof: null,
    address_proof: null,
    bank_statement: null,
    payslip: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("mortgageFormData");
    if (!savedData) {
      toast.error("No form data found. Please fill out the form first.");
      navigate("/admin/my-applications/form");
    }
  }, [navigate]);

  const handleFileChange = (e, key) => {
    setFiles({ ...files, [key]: e.target.files[0] });
  };

  const handleSubmitAll = async () => {
    const savedData = JSON.parse(localStorage.getItem("mortgageFormData"));
    if (!savedData) {
        toast.error("No form data found.");
        return;
    }

    const formData = new FormData();
    Object.entries(savedData).forEach(([key, value]) => {
        formData.append(key, value);
    });

    Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
    });

    try {
        setLoading(true);     
        await api.post("/submit_mortgage_with_docs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Application submitted successfully!");
        localStorage.removeItem("mortgageFormData");
        navigate('/admin/my-applications');
    } catch (error) {
        console.error(error);
        toast.error("Error submitting application!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("mortgageFormData");
    toast.warn("Application canceled.");
    navigate("/admin/my-applications");
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow p-4 rounded-4">
        <h3 className="text-center mb-4">Upload Required Documents</h3>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">ID Proof</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, "id_proof")}
              disabled={loading}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Address Proof</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, "address_proof")}
              disabled={loading}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Bank Statement</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, "bank_statement")}
              disabled={loading}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Payslip</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, "payslip")}
              disabled={loading}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between mt-5">
          <button className="btn btn-outline-danger" onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
          <div>
            <button
              className="btn btn-primary"
              onClick={handleSubmitAll}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
