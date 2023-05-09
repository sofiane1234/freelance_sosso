import styles from './index.module.scss';

const Button = ({type, title, className, disabled, handleClick}) => {
    return (
        <div>
            <button type={type} onClick={handleClick} disabled={disabled ? true : false} className={`${styles[className]}`}>
                {title}
            </button>
        </div>
    );
}

export default Button;
