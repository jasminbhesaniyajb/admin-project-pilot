import { Card, Divider } from "antd";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { useParams } from "react-router-dom";
import { estimateFormSchema, type EstimateFormSchema } from "../../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionField from "./section-field";
import BaseButton from "../form/base-button";
import { useMemo, useState } from "react";

function EstimationForm() {
  const { id } = useParams<{ id?: string }>();
  const [estimationForm, setEstimationForm] = useState();

  const methods = useForm<EstimateFormSchema>({
    resolver: zodResolver(estimateFormSchema),
    defaultValues: {
      sections: [
        {
          sectionTitle: "",
          items: [
            { title: "", unit: "", quantity: "1", price: "10", margin: "0" },
          ],
        },
      ],
    },
  });

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const sections = useWatch({ control, name: "sections" });

  const { subTotal, totalMargin, totalAmount } = useMemo(() => {
    let subTotal = 0;
    let totalMargin = 0;

    sections?.forEach((section) => {
      section?.items?.forEach((item) => {
        const qty = parseFloat(item.quantity || "0");
        const price = parseFloat(item.price || "0");
        const margin = parseFloat(item.margin || "0");

        const base = qty * price;
        const marginAmount = (base * margin) / 100;

        subTotal += base;
        totalMargin += marginAmount;
      });
    });

    return {
      subTotal,
      totalMargin,
      totalAmount: subTotal + totalMargin,
    };
  }, [sections]);

  const onSubmit = (data: EstimateFormSchema) => {
    setEstimationForm(data);
  };

  return (
    <FormProvider {...methods}>
      <Card
        title={id ? "Edit Project" : "Add New Project"}
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          {fields.map((section, index) => (
            <SectionField
              key={section.id}
              control={control}
              sectionIndex={index}
              removeSection={() => remove(index)}
            />
          ))}

          <Divider />

          {/* Totals */}
          <div style={{ textAlign: "right", paddingRight: 20 }}>
            <p>
              <strong>Sub Total:</strong> {subTotal.toFixed(2)}
            </p>
            <p>
              <strong>Total Margin:</strong> {totalMargin.toFixed(2)}
            </p>
            <p>
              <strong>Total Amount:</strong> {totalAmount.toFixed(2)}
            </p>
          </div>

          <BaseButton
            label="+ Add Section"
            style={{ marginRight: 16 }}
            onClick={() =>
              append({
                sectionTitle: "",
                items: [
                  {
                    title: "",
                    unit: "",
                    quantity: "1",
                    price: "10",
                    margin: "0",
                  },
                ],
              })
            }
            type="dashed"
          />

          <BaseButton
            label="Submit Estimate"
            htmlType="submit"
            type="primary"
            style={{ marginTop: 16 }}
          />
        </form>

        {estimationForm && (
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "1rem",
              borderRadius: "4px",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
            }}
          >
            <h3>Submitted Form</h3>
            {JSON.stringify(estimationForm, null, 2)}
          </div>
        )}
      </Card>
    </FormProvider>
  );
}

export default EstimationForm;
