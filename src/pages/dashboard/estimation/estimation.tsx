import { Card } from "antd";
import React from "react";
import BaseButton from "../../../components/form/base-button";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux-hooks";

function Estimation() {
  const navigate = useNavigate();
  const { sections } = useAppSelector((state) => state.estimate);

  console.log("sections", sections);

  return (
    <Card title="Estimates Management">
      <BaseButton
        label="Add Estimate"
        type="primary"
        onClick={() => navigate("/estimates/add")}
      />

      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "1rem",
          borderRadius: "4px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          marginTop: "1rem",
        }}
      >
        <h3>Submitted Estimate List</h3>
        {JSON.stringify(sections, null, 2)}
      </div>
    </Card>
  );
}

export default Estimation;
