import React from "react";

const PageContainer = ({ children }) => {
  return (
    <div className="page-container">
      {children}
      <style jsx>{`
        .page-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default PageContainer;
