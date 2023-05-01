export type FormProps = {
    placeholder: string;
    inputType: string;
    value?: string | number;
    isReadOnly?: boolean;
    onChangeProp?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className: string;
    name: string;
  };

  export type LoginForm = {
    email: string;
    password: string;
  };

  export type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
    phone: string;
    address: string;
  };