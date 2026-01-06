import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useFormStore from "../../../../MortgageApp/store";

const mortgageNav = [
    { path: "/mortgage/application-type", label: "Application Type" },
    { path: "/mortgage/early-repayment", label: "Early Repayment/Moving Home/Product Types" },
    { path: "/mortgage/prioritise-your-needs", label: "Prioritise Your Needs" },
    { path: "/mortgage/establishing-budget", label: "Establishing a Budget" },
    { path: "/mortgage/mortgage-details", label: "Mortgage Details" },
    { path: "/mortgage/repaying-mortgage", label: "Repaying Mortgage" },
    { path: "/mortgage/solicitor-estate-agent", label: "Solicitor/Estate Agent Details" },
    { path: "/mortgage/declaration", label: "Declaration" }
  ]
  
  const NavItem = ({ path, label }) => (
    <li style={{ paddingLeft: "20px" }}>
      <NavLink to={path} className={({ isActive }) => (isActive ? "active-link" : "")}>
        {label}
      </NavLink>
    </li>
  );
  
  const Navbar = () => {
    const { formData, fetchFormData } = useFormStore();
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleNavbar = () => setIsOpen((prev) => !prev);
  
    useEffect(()=>{
      fetchFormData("occupationData")
    },[fetchFormData])
  
    const baseNav = [
      { path: "/mortgage/personal-details", label: "Main Details" },
      { path: "/mortgage/residential", label: "Residential Details" },
      { path: "/mortgage/occupation", label: "Occupation Details" },
      { path: "/mortgage/employer-benefit", label: "Employer Benefit" },
      { path: "/mortgage/secondary-occupation", label: "Secondary Occupation Details" },
      { path: "/mortgage/other-monthly-income", label: "Other Monthly Income" },
      { path: "/mortgage/non-working-income", label: "Non-Working - Other Income Source" },
      { path: "/mortgage/total-income", label: "Total Income Details" },
      { path: "/mortgage/existing-credit-commits", label: "Liabilities - Credit Commitments" },
      { path: "/mortgage/existing-mortgage", label: "Liabilities - Existing Mortgage" },
      { path: "/mortgage/monthly-expenditure", label: "Monthly Expenditure Details" },
      { path: "/mortgage/emergency-fund", label: "Emergency Fund/Health & Will Detail" },
    ];
  
    const employerBenefitIndex = baseNav.findIndex(
      (item) => item.label === "Employer Benefit"
    );
  
    const mainDetails = [
      { path: "/mortgage/main-details", label: "Main Details" },
    ]
  
    const personalNav = [
      ...baseNav.slice(0, employerBenefitIndex + 1),
      ...(formData.occupationData?.client?.status === "Self-Employed" || 
          formData.occupationData?.partner?.status === "Self-Employed"
        ? [
            { path: "/mortgage/self-employed-details", label: "Self Employed Details" },
            { path: "/mortgage/self-employed-income-details", label: "Self Employed Income Details" },
          ]
        : []),
      ...baseNav.slice(employerBenefitIndex + 1),
    ];
  
    return (
      <>
        {/* Toggle Button */}
        <button
          className="nav-toggle"
          onClick={toggleNavbar}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? "←" : "→"}
        </button>
  
        {/* Left Fixed Navbar */}
        <nav className={`mortgage-navbar ${isOpen ? "open" : ""}`}>
          <details open>
            <summary>Main Details</summary>
            <ul className="mort-nav-links">
              {mainDetails.map((item) => (
                <NavItem key={item.path} path={item.path} label={item.label} />
              ))}
            </ul>
          </details>
          <details open>
            <summary>Personal Details</summary>
            <ul className="mort-nav-links">
              {personalNav.map((item) => (
                <NavItem key={item.path} path={item.path} label={item.label} />
              ))}
            </ul>
          </details>
          <details open>
            <summary>Mortage</summary>
            <ul className="mort-nav-links">
              {mortgageNav.map((item) => (
                <NavItem key={item.path} path={item.path} label={item.label} />
              ))}
            </ul>
          </details>
        </nav>
      </>
    );
}

export default Navbar;