import { Card } from "antd";
import React from "react";
import BaseButton from "../../../components/form/base-button";
import { useNavigate } from "react-router-dom";

function Estimation() {
  const navigate = useNavigate();

  return (
    <Card title="Estimates Management">
      <BaseButton
        label="Add Estimate"
        type="primary"
        onClick={() => navigate("/estimates/add")}
      />
    </Card>
  );
}

export default Estimation;
