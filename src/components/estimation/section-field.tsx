import { Card, Flex } from "antd";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import ItemField from "./Item-field";
import FormInput from "../form/form-input";
import BaseButton from "../form/base-button";

interface SectionProps {
  control: any;
  sectionIndex: number;
  removeSection: () => void;
}

export default function SectionField({
  control,
  sectionIndex,
  removeSection,
}: SectionProps) {
  const {
    formState: { errors },
    control: formControl,
    watch,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.items`,
  });

  const tempState = watch(`sections.${sectionIndex}.items`);

  const sectionTotal = tempState.reduce((total, item: any) => {
    const quantity = +item.quantity || 0;
    const price = +item.price || 0;
    const margin = +item.margin || 0;
    const baseTotal = quantity * price;
    return total + baseTotal + (baseTotal * margin) / 100;
  }, 0);

  return (
    <Card title="Section" style={{ marginBottom: 20 }}>
      <Flex gap="middle" align="center" justify="space-between">
        <div>
          <Controller
            name={`sections.${sectionIndex}.sectionTitle`}
            control={formControl}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Section Name"
                placeholder="Enter section name"
                error={errors?.sections?.[sectionIndex]?.sectionTitle?.message}
              />
            )}
          />
        </div>
        <Flex gap="middle" align="center">
          <div>
            <FormInput
              label="Section Total"
              placeholder="Enter section total"
              disabled
              value={sectionTotal.toFixed(2)}
            />
          </div>
          <BaseButton
            danger
            label="Remove Section"
            onClick={removeSection}
            style={{ marginTop: 16, height: 40 }}
          />
        </Flex>
      </Flex>
      {fields.map((item, itemIndex) => (
        <ItemField
          key={item.id}
          sectionIndex={sectionIndex}
          itemIndex={itemIndex}
          removeItem={() => remove(itemIndex)}
          addItem={() =>
            append({
              title: "",
              unit: "",
              quantity: "1",
              price: "10",
              margin: "0",
            })
          }
        />
      ))}
    </Card>
  );
}
