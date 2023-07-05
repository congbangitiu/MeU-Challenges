import classNames from "classnames/bind";
import styles from './Input.module.scss'
import React from 'react';
 
const cx = classNames.bind(styles)

function Input({
    children,
    defaultMode,
    error,
    disabled,
    helperText='',
    startIcon,
    endIcon,
    value,
    size,
    fullWidth,
    multiline,
    row=''
}) {

    const classes = cx('wrapper', {
        children, 
        defaultMode, 
        error, 
        disabled, 
        [helperText]:helperText, 
        startIcon, endIcon, 
        [value]:value, 
        [size]:size,
        fullWidth,
        multiline,
        [row]:row
    })

    return ( 
        <div className={classes}>
            {startIcon && <span className={cx('icon')}>{startIcon}</span>}
            <input 
                placeholder={children}
                spellCheck={false}
                row = {row}
            />
            {endIcon && <span className={cx('icon')}>{endIcon}</span>}
        </div>
    );
}

export default Input;