import { Ref, forwardRef, useCallback } from 'react';
import css from './mainInput.module.scss';
import { FieldError } from 'react-hook-form';

interface TProps {
  error?: FieldError | undefined | null | 'never';
  myType?: 'text' | 'number' | 'email' | 'file';
  id?: string;
  placeholder?: string;
  type?: 'number' | 'text' | 'email' | 'file';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MainInput = forwardRef(
  (
    { error = null, myType = 'text', ...props }: TProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const inputClass = `${css[myType]} ${
      error && error !== 'never' && css.inputError
    }`;

    return (
      <div>
        <input
          className={inputClass}
          ref={ref}
          id={props.id}
          {...props}
        />
        {error !== 'never' && (
          <div className={css.error}>
            {error?.message}
            {/* {ErrorMessage()} */}
          </div>
        )}
      </div>
    );
  }
);
