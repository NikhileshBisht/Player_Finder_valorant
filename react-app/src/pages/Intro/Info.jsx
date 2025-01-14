// FormTemplate.jsx
import React, { useState } from "react";
import styles from "./Info.module.scss";

const FormTemplate = () => {
  const [formData, setFormData] = useState({
    inviteCode: "",
    rank: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [ismain, setIsmain] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validate({ ...formData, [name]: value });
  };

  // Validate the form
  const validate = (updatedFormData) => {
    let formErrors = {};
    if (!updatedFormData.inviteCode)
      formErrors.inviteCode = "Invite code is required.";

    const isValid = updatedFormData.inviteCode && updatedFormData.rank;
    setIsFormValid(isValid);
    setErrors(formErrors);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setResponseMessage("Form submitted successfully!");
      setFormData({ inviteCode: "", rank: "" });
      setIsFormValid(false);
    } else {
      setResponseMessage("Please fill out all required fields correctly.");
    }
    setIsmain(true);
    console.log("form data is here",formData)
  };

  return (
    <>
      {ismain ? (
        <div></div>
      ) : (
        <div className={styles.formContainer}>
          <h2>Basic Info</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldContainer}>
              <label htmlFor="inviteCode" className={styles.label}>
                Invite Code:
              </label>
              <input
                type="text"
                id="inviteCode"
                name="inviteCode"
                value={formData.inviteCode}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.inviteCode && (
                <div className={styles.error}>{errors.inviteCode}</div>
              )}
            </div>

            <div className={styles.fieldContainer}>
              <label htmlFor="rank" className={styles.label}>
                Rank:
              </label>
              <select
                id="rank"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Select Rank...</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
                <option value="diamond">Diamond</option>
              </select>
            </div>

            <button
              className={styles.button49}
              type="submit"
              disabled={!isFormValid}
            >
              Submit
            </button>
          </form>

          {responseMessage && (
            <div
              className={
                responseMessage.includes("Error")
                  ? styles.errorMessage
                  : styles.successMessage
              }
            >
              {responseMessage}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FormTemplate;
