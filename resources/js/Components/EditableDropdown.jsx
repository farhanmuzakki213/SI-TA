// EditableDropdown.js
import { InputText } from 'primereact/inputtext';
import React, { useState, useEffect } from 'react';

const EditableDropdown = ({ id, value, onChange, options, placeholder }) => {
    const [inputValue, setInputValue] = useState(value || '');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setInputValue(query);

        const filtered = options.filter(option =>
            option.label.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredOptions(filtered);

        setDropdownVisible(query.length > 0 && filtered.length > 0);
    };

    const handleSelectChange = (option) => {
        setInputValue(option.label);
        onChange(option.label);
        setDropdownVisible(false);
    };

    const handleFocus = () => {
        const filtered = options.filter(option =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(filtered);
        setDropdownVisible(true);
    };
    const handleBlur = () => {
        if (!filteredOptions.some(option => option.label.toLowerCase() === inputValue.toLowerCase())) {
            onChange(inputValue);
        } else {
            setDropdownVisible(false);
        }
        if( filteredOptions.some(option => option.label.toLowerCase() !== inputValue.toLowerCase()) && inputValue.length > 0){
            onChange(inputValue);
        } else {
            setDropdownVisible(false);
        }
    };
    return (
        <>
            {/* Input field for searching and editing */}
            <div className="tw-relative">
                <InputText
                    id={id}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder={placeholder}
                />
            </div>

            {/* Dropdown menu with filtered options */}
            {dropdownVisible && inputValue && (

                <div className="tw-relative tw-flex tw-flex-col tw-rounded-lg tw-bg-white tw-shadow-md tw-border tw-border-slate-400 tw-max-h-[200px] tw-overflow-y-auto">
                    <nav className="tw-flex tw-min-w-[240px] tw-flex-col tw-gap-1 tw-p-1.5">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleSelectChange(option)}
                                    className={`tw-text-slate-800 tw-flex tw-w-full tw-items-center tw-rounded-md tw-p-3 tw-transition-all hover:tw-bg-slate-100 focus:tw-bg-slate-100 active:tw-bg-slate-100`}
                                >
                                    {option.label}
                                </div>
                            ))
                        ) : (
                            <div className="tw-px-4 tw-py-2 tw-text-gray-500">No options found</div>
                        )}
                    </nav>
                </div>
            )}
        </>
    );
};

export default EditableDropdown;
