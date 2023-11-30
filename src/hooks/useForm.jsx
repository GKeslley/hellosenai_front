import { useState } from 'react';

const types = {
  email: {
    regex: /[^\s@]+@[^\s@]+\.[^\s@]+/,
    message: 'Digite um email válido',
  },
  password: {
    regex: /^.{6,}$/,
    message: 'A senha deve possuir no mínimo 6 caracteres',
  },
};

const useForm = (type) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState({ isError: false, message: null });

  const onChange = ({ target }) => {
    setValue(target.value);
    if (error.isError) {
      validate(value);
    }
  };

  const validate = (value) => {
    if (type === false) return true;
    if (value.length < 1) {
      setError({ isError: true, message: 'Preencha um valor' });
    } else if (types[type] && !types[type].regex.test(value)) {
      setError({ isError: true, message: types[type].message });
      return false;
    } else {
      setError({ isError: false, message: null });
      return true;
    }
  };

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
