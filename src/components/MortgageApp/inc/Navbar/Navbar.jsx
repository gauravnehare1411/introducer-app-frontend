import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import useFormStore from "../../store";

const mortgageNav = [
  { path: "/admin/factfind/application-type", label: "Application Type" },
  { path: "/admin/factfind/early-repayment", label: "Early Repayment/Moving Home/Product Types" },
  { path: "/admin/factfind/prioritise-your-needs", label: "Prioritise Your Needs" },
  { path: "/admin/factfind/establish-budget", label: "Establishing a Budget" },
  { path: "/admin/factfind/mortgage-details", label: "Mortgage Details" },
  { path: "/admin/factfind/repaying-mortgage", label: "Repaying Mortgage" },
  { path: "/admin/factfind/solicitor-estate-agent", label: "Solicitor/Estate Agent Details" },
  { path: "/admin/factfind/declaration", label: "Declaration" }
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
    { path: "/admin/factfind/personal-details", label: "Main Details" },
    { path: "/admin/factfind/residential", label: "Residential Details" },
    { path: "/admin/factfind/occupation", label: "Occupation Details" },
    { path: "/admin/factfind/employer-benefit", label: "Employer Benefit" },
    { path: "/admin/factfind/secondary-occupation", label: "Secondary Occupation Details" },
    { path: "/admin/factfind/other-monthly-income", label: "Other Monthly Income" },
    { path: "/admin/factfind/other-income-source", label: "Non-Working - Other Income Source" },
    { path: "/admin/factfind/total-income", label: "Total Income Details" },
    { path: "/admin/factfind/existing-credit-commits", label: "Liabilities - Credit Commitments" },
    { path: "/admin/factfind/existing-mortgage", label: "Liabilities - Existing Mortgage" },
    { path: "/admin/factfind/monthly-expenditure", label: "Monthly Expenditure Details" },
    { path: "/admin/factfind/emergency-fund", label: "Emergency Fund/Health & Will Detail" },
  ];

  const employerBenefitIndex = baseNav.findIndex(
    (item) => item.label === "Employer Benefit"
  );

  const mainDetails = [
    { path: "/admin/factfind/main-details", label: "Main Details" },
  ]

  const personalNav = [
    ...baseNav.slice(0, employerBenefitIndex + 1),
    ...(formData.occupationData?.status === "Self-Employed"
      ? [
          { path: "/admin/factfind/self-employed-details", label: "Self Employed Details" },
          { path: "/admin/factfind/self-employed-income-details", label: "Self Employed Income Details" },
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
};

export default Navbar;
