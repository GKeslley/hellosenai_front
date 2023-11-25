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
  const [error, setError] = useState(false);

  const onChange = ({ target }) => {
    setValue(target.value);
    if (error) {
      validate(value);
    }
  };

  const validate = (value) => {
    if (type === false) return true;
    if (value.length < 1) {
      setError('Preencha um valor');
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  return {
    value,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
