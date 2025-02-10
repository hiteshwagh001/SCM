import { forwardRef, useId } from 'react';

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    name,
    ...props
}, ref) {
    const id = useId(); // Ensure unique id per component

    return (
        <div className='w-full'>
            {label && (
                <label className='inline-block mb-1 pl-1' htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={id} // Correctly sets the id
                className={`px-3 py-2 rounded-lg bg-white
                    text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref} // Passes ref for external control
                {...props} // Spreads other props
            />
        </div>
    );
});

export default Input;
