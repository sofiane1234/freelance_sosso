import React from 'react';
import styles from "./index.module.scss"

const Input = ({label, type, name, value, isRequired, placeholder, onChange}) => {
    return (
        <div className={styles.wrapper}>
            {
                label && (
                    <label>{label}</label>
                ) 
            }
            <input 
            name={name}
            value={value}
            required={isRequired}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            />
        </div>
    );
}

export default Input;
