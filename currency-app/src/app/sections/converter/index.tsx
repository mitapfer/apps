import React, { useEffect, useState } from "react";
import { Input, Form } from "antd";
import { ButtonCustom } from "@ui/index";
import { formatNumber, parseConvertData } from "@utils/index";
import { useStore } from "effector-react";
import { ErrorMessage } from "@components/errorMessage";
import { $convertCurrencies } from "@stores/index";
import { useStyles } from "./styles";

export const Converter = () => {
  const [form] = Form.useForm();
  const classes = useStyles();

  const convertCurrenciesState = useStore($convertCurrencies.store);

  const [convertedResult, setConvertedResult] = useState({ result: null, to: "" });

  useEffect(() => {
    return () => {-
      $convertCurrencies.reset();
    };
  }, []);

  useEffect(() => {
    if (convertCurrenciesState.data?.success) {
      const { result } = convertCurrenciesState.data;
      const modifiedResult = formatNumber(+result.toFixed(3));
      const convertData = form.getFieldValue("convertData");
      const { to } = parseConvertData(convertData);

      setConvertedResult({ result: modifiedResult, to });
      $convertCurrencies.reset();
    }
  }, [convertCurrenciesState.data?.success]);

  const onConvertDataChange = () => {
    const convertDataError = form.getFieldError("convertData");

    if (convertDataError.length) {
      form.setFields([
        {
          name: "convertData",
          errors: [],
        },
      ]);
    }
  };

  const checkConvertData = (parsedConvertData) => {
    const { amount, from, to } = parsedConvertData;

    if (amount && from && to) {
      const isAmountWithLetters = amount.match(/\D/);
      const isFromAndToCurrenciesEqual = from === to;
      const courseCodeLength = 3;

      if (isAmountWithLetters) return false;
      if (isFromAndToCurrenciesEqual) return false;
      if (from.length !== courseCodeLength || to.length !== courseCodeLength) return false;

      return true;
    } else {
      return false;
    }
  };

  const onFinish = (formFields) => {
    const parsedConvertData = parseConvertData(formFields.convertData);
    const isConvertDataValid = checkConvertData(parsedConvertData);

    const { amount, from, to } = parsedConvertData;

    if (isConvertDataValid) {
      $convertCurrencies.effect({ amount, from, to });
    } else {
      const isFromAndToCurrenciesEqual = from === to;
      const equalCurrenciesError = "Конвертируемые валюты не могут совпадать";
      const invalidFormatError = "Пожалуйста введите данные в формате: 15 USD in RUB";
      const messageError = isFromAndToCurrenciesEqual ? equalCurrenciesError : invalidFormatError;

      form.setFields([
        {
          name: "convertData",
          errors: [messageError],
        },
      ]);
    }
  };

  return (
    <>
      <div className={classes.top}>
        <div className="container">
          <h2 className={classes.title}>Fixer - лучший инструмент для работы с курсами валют</h2>

          <Form form={form} onFinish={onFinish}>
            <div className={classes.converterWrapper}>
              <Form.Item name="convertData">
                <Input onChange={onConvertDataChange} placeholder="15 USD in RUB" />
              </Form.Item>

              <ButtonCustom type="green" htmlType="submit" loading={convertCurrenciesState.loading}>
                Конвертировать
              </ButtonCustom>
            </div>
          </Form>
        </div>
      </div>
      <div className={classes.bottom}>
        <div className="container">
          {convertCurrenciesState.data?.success === false ? (
            <ErrorMessage statusCode={convertCurrenciesState.data?.error.code} />
          ) : (
            <div className={classes.convertResult}>
              {convertedResult.result ? (
                <div>
                  <b>{convertedResult.result}</b> {convertedResult.to}
                </div>
              ) : (
                <div className={classes.nothingResult}>
                  Нет данных...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};