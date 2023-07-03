import classNames from 'classnames/bind';
import styles from './Button.module.scss'
import React from 'react';
 
const cx = classNames.bind(styles)
 
function Button({
    children, 
    defaultMode=false, 
    variant = '',
    disableShadow=false, 
    disabled=false, 
    startIcon, 
    endIcon,
    size='',
    color=''
}) {
 
    const classes = cx('wrapper', {defaultMode, [variant]: variant, disableShadow, disabled, startIcon, endIcon, [size]:size, [color]:color})
    return ( 
        <button className={classes}>
            {startIcon && <span className={cx('icon')}>{startIcon}</span>}
            <p className={cx('title')}>{children}</p>
            {endIcon && <span className={cx('icon')}>{endIcon}</span>}
        </button>
    );
}
 
export default Button;
 