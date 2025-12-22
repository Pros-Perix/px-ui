import React, { useState } from 'react';
import { cn } from '@px-ui/core';
import PhoneInputLib from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import GoogleLibPhoneNumber from 'google-libphonenumber';

const phoneUtil = GoogleLibPhoneNumber.PhoneNumberUtil.getInstance();
const PNF = GoogleLibPhoneNumber.PhoneNumberFormat;

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  country?: string;
  error?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const PhoneInput = ({ 
  value, 
  onChange, 
  country = 'us', 
  error,
  placeholder,
  disabled,
  className
}: PhoneInputProps) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (inputValue: string, data: any) => {
    if (!inputValue) {
      setIsValid(true);
      onChange('');
      return;
    }

    try {
      const parsedNumber = phoneUtil.parseAndKeepRawInput(inputValue, data.countryCode);
      const isNumberValid = phoneUtil.isValidNumberForRegion(parsedNumber, data.countryCode);
      
      setIsValid(isNumberValid);
      
      if (isNumberValid) {
        const formatted = phoneUtil.format(parsedNumber, PNF.E164);
        onChange(formatted);
      } else {
        onChange(inputValue);
      }
    } catch (e) {
      setIsValid(false);
      onChange(inputValue);
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-1", className)}>
      <div className={`relative ${(!isValid || error) ? 'phone-input-error' : ''}`}>
        <PhoneInputLib
          country={country}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          inputClass={`!w-full !h-11 !text-base !rounded-lg !border ${
            !isValid || error 
              ? '!border-red-500 !bg-red-50' 
              : '!border-gray-300 focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500'
          }`}
          buttonClass={`!rounded-l-lg !border-y !border-l ${
            !isValid || error ? '!border-red-500 !bg-red-50' : '!border-gray-300'
          }`}
          containerClass="!w-full"
        />
      </div>
      
      {(!isValid || error) && (
        <p className="text-red-500 text-xs font-medium mt-1">
          Please enter a valid phone number for this region.
        </p>
      )}
    </div>
  );
};

