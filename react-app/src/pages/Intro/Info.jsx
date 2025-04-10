import React, { useState } from "react";
import styles from "./Info.module.scss";
import Team from "./Team";
import axios from "axios";

const FormTemplate = () => {
  const [formData, setFormData] = useState({
    code: "",  
    rank: "",
    click: 5,
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [ismain, setIsmain] = useState(false);

  const InviteCodePost = async (data) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/submit_code", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponseMessage("Form submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      setResponseMessage("Error submitting form. Please try again.");
      console.error("Error posting data:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validate({ ...formData, [name]: value });
  };

  // Validate the form
  const validate = (updatedFormData) => {
    let formErrors = {};
    if (!updatedFormData.code) formErrors.code = "Invite code is required.";
    if (!updatedFormData.rank) formErrors.rank = "Rank is required.";

    setErrors(formErrors);
    setIsFormValid(Object.keys(formErrors).length === 0);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log(formData)
      await InviteCodePost(formData);
      setFormData({ code: "", rank: "" });
      setIsFormValid(false);
    } else {
      setResponseMessage("Please fill out all required fields correctly.");
    }
    setIsmain(true);
  };

  return (
    <>
      {ismain ? (
        <Team/>
      ) : (
        <div className={styles.formContainer}>
          <h2>Basic Info</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldContainer}>
              <label htmlFor="code" className={styles.label}>
                Invite Code:
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.code && <div className={styles.error}>{errors.code}</div>}
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
              {errors.rank && <div className={styles.error}>{errors.rank}</div>}
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
