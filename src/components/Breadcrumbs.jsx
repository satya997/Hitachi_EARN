import React from "react";
import { useLocation, Link } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav style={{ padding: "10px", backgroundColor: "#f5f5f5" }}>
      <ol style={{ display: "flex", listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/" style={{ marginRight: "8px" }}>
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} style={{ marginRight: "8px" }}>
              {isLast ? (
                <span>{value}</span>
              ) : (
                <Link to={to} style={{ marginRight: "8px" }}>
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
