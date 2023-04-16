import React, { useEffect, useState } from "react";
import { useStore } from "effector-react";
import { $currencySymbols } from "@stores/index";
import { SelectCustom } from "@ui/index";
import { withDebounce } from "@utils/index";

const defaultBaseCurrency = "EUR";

const getModifiedCurrenciesData = (currenciesData) => {
  if (currenciesData) {
    const items = [];

    for (const key in currenciesData) {
      items.push({
        code: key,
        name: currenciesData[key],
      });
    }

    return items;
  } else {
    return [];
  }
};

export const CurrencySelect = (props) => {
  const { value, onChange, ...restProps } = props;

  const currencySymbolsState = useStore($currencySymbols.store);

  const [modifiedCurrencies, setModifiedCurrencies] = useState([]);
  const [filteredKkmCurrencies, setFilteredKkmCurrencies] = useState([]);

  useEffect(() => {
    if (!currencySymbolsState.data) {
      $currencySymbols.effect({});
    }
  }, []);

  useEffect(() => {
    if (currencySymbolsState.data) {
      const modifiedCurrencies = getModifiedCurrenciesData(currencySymbolsState.data?.symbols);
      const currencyBase = localStorage.getItem("currencyBase");

      onChange(currencyBase || defaultBaseCurrency);

      if (!currencyBase) {
        setLocalStorageCurrency(defaultBaseCurrency);
      }

      setModifiedCurrencies(modifiedCurrencies);
    }
  }, [currencySymbolsState.data]);

  useEffect(() => {
    if (modifiedCurrencies.length) {
      setFilteredKkmCurrencies(modifiedCurrencies);
    }
  }, [modifiedCurrencies]);

  const onCurrencyChange = (currencyCode) => {
    onChange(currencyCode);
    setLocalStorageCurrency(currencyCode);

    filterCurrencies();
  };

  const setLocalStorageCurrency = (value) => {
    localStorage.setItem("currencyBase", value);
  };

  const onCurrencySearch = (searchValue) => {
    withDebounce(() => {
      filterCurrencies(searchValue);
    });
  };

  const filterCurrencies = (search?) => {
    if (search) {
      const filteredKkm = modifiedCurrencies.filter((item) => item.code.startsWith(search));

      setFilteredKkmCurrencies(filteredKkm);
    } else {
      setFilteredKkmCurrencies(modifiedCurrencies);
    }
  };

  return (
    <SelectCustom
      loading={currencySymbolsState.loading}
      placeholder="Выберите базовую валюту"
      onChange={onCurrencyChange}
      onSearch={onCurrencySearch}
      value={value}
      filterOption={false}
      defaultActiveFirstOption={false}
      showSearch
      {...restProps}
    >
      {filteredKkmCurrencies.map((item) => (
        <SelectCustom.Option value={item.code} key={item.code}>
          <div title={item.name}>
            <b>{item.code}</b>{` (${item.name})`}
          </div>
        </SelectCustom.Option>
      ))}
    </SelectCustom>
  );
};