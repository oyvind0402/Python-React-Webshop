import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";
import { ErrorNoPrivileges } from "./ErrorNoPrivileges";

const AdminPage = () => {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("admin")) {
      setAdmin(true);
    }
  }, []);

  if (admin) {
    return (
      <>
        <Header />
        <main id="main">
          <div className="adminpage">
            <h1>Admin Page</h1>
            <div>
              <Link to="/new" className="btn btn-primary">
                Add a product
              </Link>
            </div>
            <div>
              <Link to="/delete" className="btn btn-primary">
                Delete a product
              </Link>
            </div>
            <div>
              <Link to="/update" className="btn btn-primary">
                Update a product
              </Link>
            </div>
            <div>
              <Link to="/deleted" className="btn btn-primary">
                Show all deleted products
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <ErrorNoPrivileges />
      </>
    );
  }
};

export default AdminPage;
