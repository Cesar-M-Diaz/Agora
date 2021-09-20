const FormTutor = ({ handleChange, validateInputs, errors }) => {
  return (
    <>
      <div className="register-form__inputs">
        <input
          onBlur={validateInputs}
          type="text"
          placeholder="Profession"
          name="profession"
          onChange={handleChange}
        />
      </div>
      <span className="register-form__errors">{errors.profession}</span>

      <div className="register-form__inputs">
        <select
          onBlur={validateInputs}
          type="text"
          placeholder="Focus"
          name="focus"
          onChange={handleChange}
          defaultValue={0}
        >
          <option value={0} hidden disabled>
            Choose a focus
          </option>
          <option value={1}>Test option 1</option>
          <option value={2}>Test option 2</option>
          <option value={3}>Test option 3</option>
          <option value={4}>Test option 4</option>
          <option value={5}>Test option 5</option>
        </select>
      </div>
      <span className="register-form__errors">{errors.focus}</span>
    </>
  );
};

export default FormTutor;
