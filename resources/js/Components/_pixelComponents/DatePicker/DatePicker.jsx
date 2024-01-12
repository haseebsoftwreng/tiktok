import react from "react";
import { useState, useEffect, useRef } from "react";
import {
  useBreakpoints,
  Popover,
  Button,
  Icon,
  InlineGrid,
  Box,
  Scrollable,
  OptionList,
  BlockStack,
  InlineStack,
  TextField,
  DatePicker,
  Select,
  Page
} from "@shopify/polaris";

import { CalendarMinor, ArrowRightMinor } from "@shopify/polaris-icons";
import { useTranslation } from "react-i18next";
export default function DateRangePicker({Iconvalue,text,setOnChange,setDatePickerValue}) {
  const { mdDown, lgUp } = useBreakpoints();
  const {t} = useTranslation();
  const shouldShowMultiMonth = lgUp;
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const yesterday = new Date(
    new Date(new Date().setDate(today.getDate() - 1)).setHours(0, 0, 0, 0)
  );
  const ranges = [
    {
      title: t('dataPicker.today'),
      alias: "today",
      period: {
        since: today,
        until: today
      }
    },
    {
      title: t('dataPicker.yesterDay'),
      alias: "yesterday",
      period: {
        since: yesterday,
        until: yesterday
      }
    },
    {
      title: t('dataPicker.lastSevenDays'),
      alias: "last7days",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 7)).setHours(0, 0, 0, 0)
        ),
        until: today
      }
    },
    {
      title: t('dataPicker.lastFiftyenDays'),
      alias: "last15days",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 15)).setHours(0, 0, 0, 0)
        ),
        until: today
      }
    },
    {
      title:  t('dataPicker.thirtyDays'),
      alias: "last30day",
      period: {
        since: new Date(
          new Date(new Date().setDate(today.getDate() - 30)).setHours(0, 0, 0, 0)
        ),
        until: today
      }
    }
  ];
  const retrievedObject = JSON.parse(localStorage.getItem('selectedDateSlot'));
  const index = ranges.findIndex(range => JSON.stringify(range) === JSON.stringify(retrievedObject));
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeDateRange, setActiveDateRange] = useState(retrievedObject!=null && retrievedObject!="undefined"?ranges[index]:ranges[0]);
  const [inputValues, setInputValues] = useState({});
  const [{ month, year }, setDate] = useState({
    month: activeDateRange.period.since.getMonth(),
    year: activeDateRange.period.since.getFullYear()
  });
  const datePickerRef = useRef(null);
  const VALID_YYYY_MM_DD_DATE_REGEX = /^\d{4}-\d{1,2}-\d{1,2}/;

  useEffect(()=>{
    
    setDatePickerValue(activeDateRange)
    // if(activeDateRange.title=='Today' ||activeDateRange.title=='Yesterday' ||activeDateRange.title=='Last 7 days' ||activeDateRange.title=='Last 15 days'||activeDateRange.title=='Last 30 days'){
    //  setPopoverActive(false);
    //  setOnChange()
    // }
    // console.log('here is the active Range',activeDateRange.title)

  },[activeDateRange]);
  function isDate(date) {
    return !isNaN(new Date(date).getDate());
  }
  function isValidYearMonthDayDateString(date) {
    return VALID_YYYY_MM_DD_DATE_REGEX.test(date) && isDate(date);
  }
  function isValidDate(date) {
    return date.length === 10 && isValidYearMonthDayDateString(date);
  }
  function parseYearMonthDayDateString(input) {
    // Date-only strings (e.g. "1970-01-01") are treated as UTC, not local time
    // when using new Date()
    // We need to split year, month, day to pass into new Date() separately
    // to get a localized Date
    const [year, month, day] = input.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
  function formatDateToYearMonthDayDateString(date) {
    const year = String(date.getFullYear());
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());
    if (month.length < 2) {
      month = String(month).padStart(2, "0");
    }
    if (day.length < 2) {
      day = String(day).padStart(2, "0");
    }
    return [year, month, day].join("-");
  }
  function formatDate(date) {
    return formatDateToYearMonthDayDateString(date);
  }
  function nodeContainsDescendant(rootNode, descendant) {
    if (rootNode === descendant) {
      return true;
    }
    let parent = descendant.parentNode;
    while (parent != null) {
      if (parent === rootNode) {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  }
  function isNodeWithinPopover(node) {
    return datePickerRef?.current
      ? nodeContainsDescendant(datePickerRef.current, node)
      : false;
  }
  function handleStartInputValueChange(value) {
    setInputValues((prevState) => {
      return { ...prevState, since: value };
    });
    if (isValidDate(value)) {
      const newSince = parseYearMonthDayDateString(value);
      setActiveDateRange((prevState) => {
        const newPeriod =
          prevState.period && newSince <= prevState.period.until
            ? { since: newSince, until: prevState.period.until }
            : { since: newSince, until: newSince };
        return {
          ...prevState,
          period: newPeriod
        };
      });
    }
  }
  function handleEndInputValueChange(value) {
    setInputValues((prevState) => ({ ...prevState, until: value }));
    if (isValidDate(value)) {
      const newUntil = parseYearMonthDayDateString(value);
      setActiveDateRange((prevState) => {
        const newPeriod =
          prevState.period && newUntil >= prevState.period.since
            ? { since: prevState.period.since, until: newUntil }
            : { since: newUntil, until: newUntil };
        return {
          ...prevState,
          period: newPeriod
        };
      });
    }
  }
  function handleInputBlur({ relatedTarget }) {
    const isRelatedTargetWithinPopover =
      relatedTarget != null && isNodeWithinPopover(relatedTarget);
    // If focus moves from the TextField to the Popover
    // we don't want to close the popover
    if (isRelatedTargetWithinPopover) {
      return;
    }
    setPopoverActive(false);
  }
  function handleMonthChange(month, year) {
    setDate({ month, year });
  }
  function handleCalendarChange({ start, end }) {
    const newDateRange = ranges.find((range) => {
      return (
        range.period.since.valueOf() === start.valueOf() &&
        range.period.until.valueOf() === end.valueOf()
      );
    }) || {
      alias: "custom",
      title: "Custom",
      period: {
        since: start,
        until: end
      }
    };
    setActiveDateRange(newDateRange);
  }
  function apply() {
    setOnChange()
    setPopoverActive(false);
  }
  function cancel() {
    setPopoverActive(false);
  }
  useEffect(() => {
    if (activeDateRange) {
      setInputValues({
        since: formatDate(activeDateRange.period.since),
        until: formatDate(activeDateRange.period.until)
      });
      function monthDiff(referenceDate, newDate) {
        return (
          newDate.month -
          referenceDate.month +
          12 * (referenceDate.year - newDate.year)
        );
      }
      const monthDifference = monthDiff(
        { year, month },
        {
          year: activeDateRange.period.until.getFullYear(),
          month: activeDateRange.period.until.getMonth()
        }
      );
      if (monthDifference > 1 || monthDifference < 0) {
        setDate({
          month: activeDateRange.period.until.getMonth(),
          year: activeDateRange.period.until.getFullYear()
        });
      }
    }
  }, [activeDateRange]);
  const buttonValue =
    activeDateRange.title === "Custom"
      ? activeDateRange.period.since.toDateString() +
        " - " +
        activeDateRange.period.until.toDateString()
      : activeDateRange.title;
  return (
    <Popover
      active={popoverActive}
      autofocusTarget="none"
      preferredAlignment="left"
      preferredPosition="below"
      fluidContent
      sectioned={false}
      fullHeight
      activator={
        <Button
          icon={CalendarMinor}
          onClick={() => setPopoverActive(!popoverActive)}
          size="large"
        >
          {buttonValue}
        </Button>
      }
      onClose={() => setPopoverActive(false)}
    >
      <Popover.Pane fixed>
        <InlineGrid
          columns={{
            xs: "1fr",
            mdDown: "1fr",
            md: "max-content max-content"
          }}
          gap={0}
          ref={datePickerRef}
        >
          <Box
            maxWidth={mdDown ? "516px" : "212px"}
            width={mdDown ? "100%" : "212px"}
            padding={{ xs: 500, md: 0 }}
            paddingBlockEnd={{ xs: 100, md: 0 }}
          >
            {mdDown ? (
              <Select
                label="dateRangeLabel"
                labelHidden
                onChange={(value) => {
                  const result = ranges.find(
                    ({ title, alias }) => title === value || alias === value
                  );
                  setActiveDateRange(result);
                }}
                value={activeDateRange?.title || activeDateRange?.alias || ""}
                options={ranges.map(({ alias, title }) => title || alias)}
              />
            ) : (
              <Scrollable style={{ height: "334px" }}>
                <OptionList
                  options={ranges.map((range) => ({
                    value: range.alias,
                    label: range.title
                  }))}
                  selected={activeDateRange.alias}
                  onChange={(value) => {
                    setActiveDateRange(
                      ranges.find((range) => range.alias === value[0])
                    );
                  }}
                />
              </Scrollable>
            )}
          </Box>
          <Box padding={{ xs: 500 }} maxWidth={mdDown ? "320px" : "516px"}>
            <BlockStack gap="400">
              <InlineStack gap="200">
                <div style={{ flexGrow: 1 }}>
                  <TextField
                    role="combobox"
                    label={"Since"}
                    labelHidden
                    prefix={<Icon source={CalendarMinor} />}
                    value={inputValues.since}
                    onChange={handleStartInputValueChange}
                    onBlur={handleInputBlur}
                    autoComplete="off"
                  />
                </div>
                <Icon source={ArrowRightMinor} />
                <div style={{ flexGrow: 1 }}>
                  <TextField
                    role="combobox"
                    label={"Until"}
                    labelHidden
                    prefix={<Icon source={CalendarMinor} />}
                    value={inputValues.until}
                    onChange={handleEndInputValueChange}
                    onBlur={handleInputBlur}
                    autoComplete="off"
                  />
                </div>
              </InlineStack>
              <div>
                <DatePicker
                  month={month}
                  year={year}
                  selected={{
                    start: activeDateRange.period.since,
                    end: activeDateRange.period.until
                  }}
                  onMonthChange={handleMonthChange}
                  onChange={handleCalendarChange}
                  multiMonth={shouldShowMultiMonth}
                  allowRange
                />
              </div>
            </BlockStack>
          </Box>
        </InlineGrid>
      </Popover.Pane>
      <Popover.Pane fixed>
        <Popover.Section>
          <InlineStack align="end">
            <Button onClick={cancel}>{t('dataPicker.cancel')}</Button>
            <Button primary onClick={apply}>
              {t('dataPicker.apply')}
            </Button>
          </InlineStack>
        </Popover.Section>
      </Popover.Pane>
    </Popover>
  );
}
