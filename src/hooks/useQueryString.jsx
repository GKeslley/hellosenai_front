import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useQueryString = ({ search, input, baseUrl }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [params, setParams] = useState({
    order: searchParams.get('order') || 'DESC',
    [search]: '',
  });

  const changeOrder = ({ target }) => {
    setParams({ ...params, order: target.value });
    const obj = { order: target.value };
    if (searchParams.get(search)) {
      obj[search] = params[search];
    }
    setSearchParams(obj);
  };

  const onSearch = (event) => {
    event.preventDefault();
    const value = input.value;
    if (value !== '') {
      setParams({ ...params, [search]: value });
      setSearchParams({ ...params, [search]: value });
    }
  };

  if (params[search] && !searchParams.get(search)) {
    setParams({ ...params, [search]: '' });
    input.setValue('');
  }

  return {
    url: `${baseUrl}?order=${params.order}${
      params[search] ? `&${search}=${input.value}` : ''
    }`,
    onChangeOrder: changeOrder,
    onSearch: onSearch,
    params: params,
  };
};

export default useQueryString;
