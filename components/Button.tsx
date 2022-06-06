import styles from "../styles/Button.module.scss";
import React, { ButtonHTMLAttributes, HTMLAttributes, HtmlHTMLAttributes, HTMLProps } from 'react';

interface ButtonProps {
    children: React.ReactNode,
    buttonContainerStyle?: any,
    buttonStyle?: any
    onClick: any
}

const Button = ({children, buttonContainerStyle, buttonStyle, onClick, ...props}:ButtonProps) => {
    return (
        <div className={styles.button_wrapper} style={buttonContainerStyle}>
            <button className={styles.button} style={buttonStyle} onClick={onClick}>{children}</button>
        </div>
    );
};

export default Button;