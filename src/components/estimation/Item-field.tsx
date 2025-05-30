import { Row, Col, Flex } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import FormInput from "../form/form-input";
import BaseButton from "../form/base-button";

interface ItemFieldProps {
  sectionIndex: number;
  itemIndex: number;
  removeItem: () => void;
  addItem: () => void;
}

export default function ItemField({
  sectionIndex,
  itemIndex,
  removeItem,
  addItem,
}: ItemFieldProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const quantity =
    watch(`sections.${sectionIndex}.items.${itemIndex}.quantity`) || 0;
  const price = watch(`sections.${sectionIndex}.items.${itemIndex}.price`) || 0;
  const margin =
    watch(`sections.${sectionIndex}.items.${itemIndex}.margin`) || 0;

  const baseTotal = quantity * price;
  const total = baseTotal + (baseTotal * margin) / 100;

  return (
    <Row align="middle" gutter={12} style={{ marginBottom: 16, marginTop: 16 }}>
      <Col span={4}>
        <Controller
          name={`sections.${sectionIndex}.items.${itemIndex}.title`}
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              label="Title"
              placeholder="Item title"
              error={
                errors?.sections?.[sectionIndex]?.items?.[itemIndex]?.title
                  ?.message
              }
            />
          )}
        />
      </Col>
      <Col span={4}>
        <Controller
          name={`sections.${sectionIndex}.items.${itemIndex}.unit`}
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              label="Unit"
              placeholder="e.g., QTY"
              error={
                errors?.sections?.[sectionIndex]?.items?.[itemIndex]?.unit
                  ?.message
              }
            />
          )}
        />
      </Col>
      <Col span={3}>
        <Controller
          name={`sections.${sectionIndex}.items.${itemIndex}.quantity`}
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              label="Quantity"
              type="number"
              placeholder="0"
              error={
                errors?.sections?.[sectionIndex]?.items?.[itemIndex]?.quantity
                  ?.message
              }
            />
          )}
        />
      </Col>
      <Col span={3}>
        <Controller
          name={`sections.${sectionIndex}.items.${itemIndex}.price`}
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              label="Price"
              type="number"
              placeholder="0"
              error={
                errors?.sections?.[sectionIndex]?.items?.[itemIndex]?.price
                  ?.message
              }
            />
          )}
        />
      </Col>
      <Col span={3}>
        <Controller
          name={`sections.${sectionIndex}.items.${itemIndex}.margin`}
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              label="Margin (%)"
              type="number"
              placeholder="%"
              error={
                errors?.sections?.[sectionIndex]?.items?.[itemIndex]?.margin
                  ?.message
              }
            />
          )}
        />
      </Col>
      <Col span={5}>
        <FormInput label="Total" value={total.toFixed(2)} disabled />
      </Col>
      <Col span={2}>
        <Flex align="middle" gap={4}>
          <BaseButton
            size="small"
            shape="circle"
            style={{ marginTop: 16, height: 30, width: 30 }}
            label="+"
            onClick={addItem}
          />
          {itemIndex === 0 ? null : (
            <BaseButton
              label="-"
              size="small"
              shape="circle"
              style={{ marginTop: 16, height: 30, width: 30 }}
              danger
              onClick={removeItem}
            />
          )}
        </Flex>
      </Col>
    </Row>
  );
}
