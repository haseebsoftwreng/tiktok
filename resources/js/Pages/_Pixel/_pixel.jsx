/** @format */

import React, { useState } from "react";
import {
    Page,
    Grid,
    Card,
    Divider,
    InlineStack,
    Text,
    Select,
} from "@shopify/polaris";
import DashReportRow from "../../Components/Dashboard/Dashboard";
import LineGraphData from "../../Components/_pixelComponents/LineChart/LineChart";
import DateRangePicker from "../../Components/_pixelComponents/DatePicker/DatePicker";
import { useCallback, useEffect } from "react";
import axioshttp from "../../httpaxios";
export default function Pixel() {
    // Api Data fetch  check
    const [test, settest] = useState(false);

    const [selected, setSelected] = useState("today");

    // const handleSelectChange = useCallback((value) => setSelected(value), []);

    ///////////////////////Backend Code////////////
    const [pixels, setPixels] = useState([]);
    const [datePickerValue, setDatePickerValue] = useState(null);
    const [analyiesStartDate, setAnalyiesStartDate] = useState("");
    const [analyiesEndDate, setAnalyiesEndDate] = useState("");
    const [pixelAnalytics, setPixelAnalytics] = useState("");
    const [pixelAnalyticsData, setPixelAnalyticsData] = useState("");
    const [pixelIdSelected, setPixelIdSelected] = useState('');
    const orderReport = [
        {
            heading: "Purchase",
            data:
                pixelAnalytics != ""
                    ? pixelAnalytics.compeletePayment != null
                        ? pixelAnalytics.compeletePayment
                        : "00"
                    : "00",
            helpinText:
                "Including Clicks on the store affiliate link and product affilate link",
        },
        {
            heading: "Initiate Checkout",
            data:
                pixelAnalytics != ""
                    ? pixelAnalytics.initiateCheckout != null
                        ? pixelAnalytics.initiateCheckout
                        : "00"
                    : "00",
            helpinText:
                "Including Clicks on the store affiliate link and product affilate link",
        },
        {
            heading: "Add to Cart",
            data:
                pixelAnalytics != ""
                    ? pixelAnalytics.addtoCart != null
                        ? pixelAnalytics.addtoCart
                        : "00"
                    : "00",
            helpinText:
                "Including Clicks on the store affiliate link and product affilate link",
        },
        {
            heading: "Content View",
            data:
                pixelAnalytics != ""
                    ? pixelAnalytics.viewContent != null
                        ? pixelAnalytics.viewContent
                        : "00"
                    : "00",
            helpinText:
                "Including Clicks on the store affiliate link and product affilate link",
        },
        {
            heading: "Page View",
            data:
                pixelAnalytics != ""
                    ? pixelAnalytics.pageView != null
                        ? pixelAnalytics.pageView
                        : "00"
                    : "00",
            helpinText:
                "Including Clicks on the store affiliate link and product affilate link",
        },
        {
            heading: "Search",
            data:
                pixelAnalytics != ""
                    ? pixelAnalytics.search != null
                        ? pixelAnalytics.search
                        : "00"
                    : "00",
            helpinText:
                "Including Clicks on the store affiliate link and product affilate link",
        },
    ];
    const pixelsGet = () => {
        axioshttp.get("/getTikTokPixel").then((res) => {
            setPixels(res.data);
        });
    };

    const getAnalytic = (pixelId, Tid) => {
        setPixelIdSelected({ pixel_Id: pixelId, T_id: Tid });
        axioshttp
            .post("/getTiktokAnalytic", { id: pixelId, T_id: Tid })
            .then((res) => {
                setPixelAnalytics(res.data);
            });
    };

    const handleDateRange = (event) => {
        if (event == null) {
            getAnalytic(pixelIdSelected.pixel_Id, pixelIdSelected.T_id);
            setAnalyiesStartDate("");
            setAnalyiesEndDate("");
        } else {
            setAnalyiesStartDate(event[0].$d);
            setAnalyiesEndDate(event[1].$d);
            axioshttp
                .post("/getTiktokAnalyticByRange", {
                    pixelId: pixelIdSelected.pixel_Id,
                    T_id: pixelIdSelected.T_id,
                    start: event[0].$d,
                    end: event[1].$d,
                })
                .then((res) => {
                    setPixelAnalytics(res.data);
                });
        }
    };
    const [selectedPixelValue, setSelectedPixelValue] = useState(
    );
    const handlePixelId = (event) => {
        console.log("event Target", event);
        setSelectedPixelValue(event)
        const eventValue = event;
        let arr = eventValue.split("/");
        if (analyiesStartDate == "" && analyiesEndDate == "") {
            getAnalytic(arr[1], arr[0]);
        } else {
            axioshttp
                .post("/getTiktokAnalyticByRange", {
                    T_id: arr[0],
                    pixelId: arr[1],
                    start: analyiesStartDate,
                    end: analyiesEndDate,
                })
                .then((res) => {
                    setPixelAnalytics(res.data.countAnalyse);
                    setPixelAnalyticsData(res.data.mergedData);
                });
        }
    };

    useEffect(() => {
        pixelsGet();
        if (
            datePickerValue &&
            datePickerValue.period &&
            datePickerValue.period.since &&
            datePickerValue.period.until
        ) {
            setAnalyiesStartDate(datePickerValue.period.since);
            setAnalyiesEndDate(datePickerValue.period.until);
        }
    }, [datePickerValue]);

    ////////////////End of Backend Code////////////

    return test === true ? (
        <SkeletonStructure />
    ) : (
        <>
            <div className="margtop10">{/* <StarRating/> */}</div>
            <Page
                title="Analytics"
                compactTitle
                secondaryActions={
                    <div style={{ display: "flex" }}>
                        <Select
                            FullWidth
                            options={pixels !== ""
                            ? [
                                {
                                  key: "default",
                                  value: "",
                                  label: "Please select the pixel",
                                  disabled: true,
                                },
                                ...pixels.map((option, index) => ({
                                  key: index,
                                  value: option.id + "/" + option.pixel_id,
                                  label: option.pixel_name,
                                })),
                              ]
                            : []}
                            value={selectedPixelValue}
                            onChange={handlePixelId}
                            
                        />
                    </div>
                }
                primaryAction={
                    <DateRangePicker
                        datePickerValue={datePickerValue}
                        setDatePickerValue={setDatePickerValue}
                        onChange={handleDateRange}
                    />
                }
            >
                <div className="marginTop20">
                    <div className="margtop10">
                        <Grid>
                            <Grid.Cell
                                columnSpan={{
                                    xs: 6,
                                    sm: 6,
                                    md: 6,
                                    lg: 6,
                                    xl: 6,
                                }}
                            >
                                <Card>
                                    <DashReportRow
                                        heading={"Stats"}
                                        data={orderReport}
                                        colNumber={"3"}
                                    />
                                </Card>
                            </Grid.Cell>
                            <Grid.Cell
                                columnSpan={{
                                    xs: 6,
                                    sm: 6,
                                    md: 6,
                                    lg: 6,
                                    xl: 6,
                                }}
                            >
                                <Card title="Orders" sectioned>
                                    <LineGraphData
                                      pixeldata={pixelAnalyticsData}
                                    />
                                </Card>
                            </Grid.Cell>
                        </Grid>
                    </div>
                    <div className="margintop30"></div>
                    <Grid>
                        <Grid.Cell columnSpan={{ sx: 3, sm: 3 }}></Grid.Cell>
                        <Grid.Cell columnSpan={{ sx: 6, sm: 6 }}>
                            <Divider borderColor="border" borderWidth="100" />
                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ sx: 3, sm: 3 }}></Grid.Cell>
                    </Grid>
                </div>
            </Page>
        </>
    );
}
