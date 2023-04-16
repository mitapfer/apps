import { debounce } from "lodash";

export const parseConvertData = (convertData) => {
  if (convertData) {
    const arrayData = convertData.split(" ");

    return {
      amount: arrayData[0],
      from: arrayData[1],
      to: arrayData[3],
    };
  } else {
    return {};
  }
};

export const formatNumber = (price = 0) => {
  const str = String(price);

  return str.replace(/(\d)(?=(\d\d\d)+(\D|$))/g, "$1 ");
};

export const withDebounce = debounce((action) => {
  action();
}, 400);