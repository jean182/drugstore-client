import React, { useState } from "react";
import { first, isNumber, isEmpty, omit } from "lodash";
import { useSelector } from "react-redux";
import Select from "./Select";
import NumberInput from "./NumberInput";

function PrescriptionForm(props) {
  const { action, history, prescription } = props;
  console.log(prescription);
  const defaultValue = {
    id: prescription && prescription.id,
    firstName: prescription ? prescription.firstName : "",
    lastName: prescription ? prescription.lastName : "",
    dose: prescription ? prescription.dose : "",
    frequency: prescription ? prescription.frequency : "",
    additionalNotes: prescription ? prescription.additionalNotes : "",
    drug: prescription ? prescription.drug : {},
    condition: prescription
      ? prescription.drug.conditions.find(
          condition => condition.name === prescription.conditionName
        )
      : {}
  };

  const [values, setValues] = useState(defaultValue);
  const drugs = useSelector(state => state.drugListReducer.drugs);

  const handleRegularInputChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleInputNumberChange = event => {
    let { name, value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setValues({ ...values, [name]: value });
  };

  const handleDrugSelectChange = event => {
    const { value } = event.target;
    if (value !== "default") {
      const id = parseFloat(value, 10);
      const match = drugs.find(drug => drug.id === id);
      setValues({
        ...values,
        dose: first(match.dose),
        drug: match,
        frequency: first(match.frequency),
        condition: {}
      });
      return;
    }
    setValues({ ...values, drug: {}, condition: {}, dose: "", frequency: "" });
  };

  const handleConditionSelectChange = event => {
    const { value } = event.target;
    if (value !== "default") {
      const id = parseFloat(value, 10);
      const match = values.drug.conditions.find(
        condition => condition.id === id
      );
      setValues({
        ...values,
        dose: first(match.dose),
        condition: match,
        frequency: first(match.frequency)
      });
      return;
    }
    setValues({ ...values, condition: {}, dose: "", frequency: "" });
  };

  const renderConditionSelect = () => {
    if (isEmpty(values.drug)) return null;
    const { conditions } = values.drug;
    return (
      <Select
        collection={conditions}
        value={values.condition ? values.condition.id : "default"}
        inputName="condition"
        onSelectChange={handleConditionSelectChange}
      />
    );
  };

  const renderNumberInput = property => {
    if (isEmpty(values.condition)) return null;
    const { condition } = values;
    return (
      <NumberInput
        inputName={property}
        object={condition}
        onInputChange={handleInputNumberChange}
        value={values[property]}
        step={property === "frequency" ? "1" : "0.01"}
      />
    );
  };

  const submitForm = event => {
    event.preventDefault();
    if (
      !isEmpty(values) &&
      !isEmpty(values.drug) &&
      !isEmpty(values.firstName) &&
      !isEmpty(values.lastName) &&
      isNumber(values.frequency) &&
      isNumber(values.dose)
    ) {
      const newPrescription = {
        ...omit(values, ["drug", "condition"]),
        conditionName: values.condition.name,
        drugId: values.drug.id
      };
      action(newPrescription);
      history.push("/prescriptions");
    } else {
      return;
    }
  };

  console.log(values);

  const requiredBorderEmpty = value =>
    isEmpty(value) ? "border-red-500" : "border-gray-200";

  return (
    <form>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            First Name
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${requiredBorderEmpty(
              values.firstName
            )} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            value={values.firstName}
            onChange={handleRegularInputChange}
          />
          {isEmpty(values.firstName) && (
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          )}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight ${requiredBorderEmpty(
              values.lastName
            )} focus:outline-none focus:bg-white focus:border-gray-500`}
            id="lastName"
            name="lastName"
            type="text"
            value={values.lastName}
            placeholder="Doe"
            onChange={handleRegularInputChange}
          />
          {isEmpty(values.lastName) && (
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <Select
          collection={drugs}
          inputName="drug"
          value={values.drug ? values.drug.id : "default"}
          onSelectChange={handleDrugSelectChange}
        />
        {values.drug && renderConditionSelect()}
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        {!isEmpty(values.condition) && renderNumberInput("dose")}
        {!isEmpty(values.condition) && renderNumberInput("frequency")}
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="additionalNotes"
          >
            Additional Notes
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="notes"
            name="additionalNotes"
            value={values.additionalNotes}
            onChange={handleRegularInputChange}
            placeholder="Additional Notes"
            rows="5"
          />
          <p className="text-gray-600 text-xs italic">Optional</p>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={submitForm}
      >
        {props.prescription ? "Edit" : "Add"}
      </button>
    </form>
  );
}

export default PrescriptionForm;
