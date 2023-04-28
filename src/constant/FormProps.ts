export type FormProps = {
    placeholder: string;
    inputType: string;
    value?: string | number;
    isReadOnly?: boolean;
    onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
  };