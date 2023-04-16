import React, { useEffect, useMemo, useState } from "react";
import { CurrencySelect } from "@pickers/index";
import { formatNumber } from "@utils/index";
import { useStore } from "effector-react";
import { Spin } from "antd";
import { ErrorMessage } from "@components/errorMessage";
import { $currencySymbols, $latestCourses } from "@stores/index";
import { useStyles } from "./styles";

const shownCurrenciesList = ["UZS", "USD", "RUB", "GEL", "GBP", "KZT"];
const coursesTimeout = 15000;
const maxSecurityCount = 10;

export const Currencies = () => {
  const classes = useStyles();

  const [currencyCodeBase, setCurrencyCodeBase] = useState(null);
  const [securityCounter, setSecurityCounter] = useState(0);

  const latestCoursesState = useStore($latestCourses.store);
  const currencySymbolsState = useStore($currencySymbols.store);

  useEffect(() => {
    if (currencyCodeBase) {
      getLatestCourses();
    }
  }, [currencyCodeBase]);

  useEffect(() => {
    if (latestCoursesState.data && securityCounter < maxSecurityCount) {
      setSecurityCounter((prevState) => prevState + 1);
      const timeoutId = setTimeout(getLatestCourses, coursesTimeout);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [latestCoursesState.data]);

  const getLatestCourses = () => {
    const filteredCurrencies = shownCurrenciesList.filter((item) => item !== currencyCodeBase);

    $latestCourses.effect({
      base: currencyCodeBase,
      symbols: filteredCurrencies.join(","),
    });
  };

  const generateCourseCards = (coursesData) => {
    if (coursesData) {
      const countriesCodes: string[] = Object.keys(coursesData);
      const courses: number[] = Object.values(coursesData);

      return countriesCodes.map((code, index) => {
        const formattedCourse = +courses[index].toFixed(3);

        return (
          <div className={classes.card}>
            <div className={classes.cardContent}>
              <div className={classes.cardImg}>
                <img src={`${process.env.publicPath}countries/${code}.jpg`} alt="country flag" />
              </div>

              <div className={classes.cardInfo}>
                <div className={classes.cardCountryCode}>
                  {code}
                </div>
                <div className={classes.cardCourse}>
                  {formatNumber(formattedCourse)}
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return [];
    }
  };

  const onCurrencyChange = (currencyCode) => {
    setCurrencyCodeBase(currencyCode);
  }

  const courseCards = useMemo(() => generateCourseCards(latestCoursesState.data?.rates), [latestCoursesState.data]);

  return (
    <div className={classes.wrapper}>
      <div className="container">
        <h2 className={classes.title}>
          Актульные курсы валют каждый день
        </h2>

        <div className={classes.content}>
          {latestCoursesState.data?.success === false || currencySymbolsState.data?.success === false ? (
            <ErrorMessage statusCode={latestCoursesState.data?.error.code || currencySymbolsState.data?.error.code} />
          ) : (
            <>
              <div className={classes.left}>
                <div className={classes.leftSelect}>
                  <CurrencySelect value={currencyCodeBase} onChange={onCurrencyChange} />
                </div>
              </div>
              <div className={classes.cards}>
                {latestCoursesState.loading ? (
                  <div className={classes.cardsSpinner}>
                    <Spin />
                  </div>
                ) : (
                  <>
                    {courseCards}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};