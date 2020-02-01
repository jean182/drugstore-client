import React, { useState } from "react";
import { first, last, isNumber, isEmpty, omit } from "lodash";
import { useSelector } from "react-redux";

function PrescriptionForm(props) {
  const { action, history, prescription } = props;
  const defaultValue = {
    firstName: prescription ? prescription.firstName : "",
    lastName: prescription ? prescription.lastName : "",
    dose: prescription ? prescription.dose : "",
    frequency: prescription ? prescription.frequency : "",
    additionalNotes: prescription ? prescription.additionalNotes : "",
    drug: prescription ? prescription.drug : {}
  };

  const drugs = useSelector(state => state.drugListReducer.drugs);
  const [values, setValues] = useState(defaultValue);

  const handleRegularInputChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleInputNumberChange = event => {
    let { name, value, min, max } = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));

    setValues({ ...values, [name]: value });
  };

  const handleSelectChange = event => {
    const { value } = event.target;
    if (value !== "default") {
      const id = parseFloat(value, 10);
      const match = drugs.find(drug => drug.id === id);
      setValues({
        ...values,
        dose: first(match.dose),
        drug: match,
        frequency: first(match.frequency)
      });
      return;
    }
    setValues({ ...values, drug: {}, dose: "", frequency: "" });
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
        ...omit(values, "drug"),
        drugId: values.drug.id
      };
      action(newPrescription);
      history.push("/prescriptions");
    } else {
      return;
    }
  };

  const requiredBorderEmpty = value =>
    isEmpty(value) ? "border-red-500" : "border-gray-200";

  const requiredBorderNumber = value =>
    !isNumber ? "border-red-500" : "border-gray-200";

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
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="drug"
          >
            Drug
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="drug"
              onChange={handleSelectChange}
              value={values.drug ? values.drug.id : "default"}
            >
              <option value="default">Select Drug</option>
              {drugs.map(drug => {
                const { id, genericName } = drug;
                return (
                  <option key={id} value={id}>
                    {genericName}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="dose"
          >
            Dose
            {values.drug.frequency && (
              <>
                <span className="text-indigo-500">{` ${first(
                  values.drug.dose
                )} - ${last(values.drug.dose)} `}</span>
                <span className="lowercase text-indigo-500">(mg)</span>
              </>
            )}
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${requiredBorderNumber(
              values.dose
            )} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            id="dose"
            name="dose"
            type="number"
            placeholder="Dose"
            min={first(values.drug.dose)}
            max={last(values.drug.dose)}
            step="0.01"
            value={values.dose}
            onChange={handleInputNumberChange}
            disabled={isEmpty(values.drug)}
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="frequency"
          >
            Dose Frequency
            {values.drug.frequency && (
              <>
                <span className="text-indigo-500">{` ${first(
                  values.drug.frequency
                )} - ${last(values.drug.frequency)} `}</span>
                <span className="lowercase text-indigo-500">(per-day)</span>
              </>
            )}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            required
            id="frequency"
            name="frequency"
            type="number"
            placeholder="Daily"
            min={first(values.drug.frequency)}
            max={last(values.drug.frequency)}
            value={values.frequency}
            onChange={handleInputNumberChange}
            disabled={isEmpty(values.drug)}
          />
        </div>
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
          />
          <p className="text-gray-600 text-xs italic">Optional</p>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={submitForm}
      >
        Add
      </button>
    </form>
  );
}

export default PrescriptionForm;
