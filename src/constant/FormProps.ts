export type FormProps = {
    placeholder: string;
    inputType: string;
    value?: string | number;
    isReadOnly?: boolean;
    onChangeProp?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
    name: string;
  };