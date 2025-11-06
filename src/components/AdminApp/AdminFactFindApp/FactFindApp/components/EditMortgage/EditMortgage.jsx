import { useLocation, useNavigate } from 'react-router-dom';
import "./EditMortgage.css";
import ExistingMortgageForm from './inc/ExistingMortgageForm';
import NewMortgageForm from './inc/NewMortgageForm';

export default function EditMortgage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { applicationId, applicationData, applicationType } = location.state || {};

    const handleCancel = () => {
        navigate('/admin/my-applications');
    };

    if (!applicationData) {
        return <div className="user-details-container">No application data found</div>;
    }

    return (
        <div className="user-details-container">
            <h2 className="mortgage-details-title" style={{ "marginTop": "50px" }}>
                Edit {applicationType === 'existing' ? 'Existing' : 'New'} Mortgage Application
            </h2>

            {applicationType === 'existing' ? (
                <ExistingMortgageForm
                    applicationId={applicationId}
                    applicationType={applicationType}
                    applicationData={applicationData}
                    handleCancel={handleCancel}
                />
            ) : (
                <NewMortgageForm 
                    applicationId={applicationId}
                    applicationType={applicationType}
                    applicationData={applicationData}
                    handleCancel={handleCancel}
                />
            )}
        </div>
    );
}