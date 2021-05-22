import React from "react";

export const ErrorNoPrivileges = () => {
  return (
    <main id="main">
      <h1>You are not admin</h1>
      <p>You are not logged in as an admin and do not have admin privileges.</p>
    </main>
  );
};
