import { FormControl } from 'react-bootstrap';
import React, { HTMLInputTypeAttribute } from 'react';
import { InputErrorMessage } from '../Utils/InputErrorMessage';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

interface FormControlProps extends React.HTMLAttributes<FormControlElement> {
  register: any;
  errors: any;
  mpsClassName?: any;
  type?: HTMLInputTypeAttribute;
  showErrorMessage?: boolean;
  disabled?: boolean;
}

export const MPSInputText = React.forwardRef<
  FormControlElement,
  FormControlProps
>(
  (
    {
      register,
      errors,
      mpsClassName,
      showErrorMessage = true,
      type = 'text',
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <FormControl
          disabled={disabled}
          type={type}
          ref={register.ref}
          {...register}
          {...props}
          autoComplete="off"
          className={`form-control ${
            errors[register.name] ? 'is-invalid' : ''
          } ${mpsClassName}`}
        />
        {errors[register.name] && showErrorMessage && (
          <InputErrorMessage
            fieldName={errors[register.name]}
          ></InputErrorMessage>
        )}
      </>
    );
  }
);

export default MPSInputText;
