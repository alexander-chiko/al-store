import styles from "./Input.module.scss";
type Propstypes = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

const input = (props: Propstypes) => {
  const { label, name, type, placeholder, defaultValue, disabled } = props;
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={name} className={styles.container__label}>
          {label}
        </label>
      )}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className={styles.container__input}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
};

export default input;
