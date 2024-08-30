import React, { forwardRef } from 'react'

const Button = forwardRef(function Button({
    children,
    className = "",
    ...props
}, ref) {
    return (
        <button
            ref={ref}
            className={`px-4 py-2 rounded-lg bg-blue-500 text-white
                hover:bg-blue-600 active:bg-blue-700 duration-200
                ${className}`}
            {...props}
        >
            {children}
        </button>
    )
})

export default Button