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
import { useTranslation } from "react-i18next";
import { toast} from 'react-toastify';
export default function Pixel() {
    const {t} = useTranslation();
    // Api Data fetch  check
    const [test, settest] = useState(false);

    const [selected, setSelected] = useState("today");

    // const handleSelectChange = useCallback((value) => setSelected(value), []);

    ///////////////////////Backend Code////////////
    const [pixels, setPixels] = useState([]);
    const [datePickerValue, setDatePickerValue] = useState();
    const [analyiesStartDate, setAnalyiesStartDate] = useState();
    const [analyiesEndDate, setAnalyiesEndDate] = useState();
    const [pixelAnalytics, setPixelAnalytics] = useState("");
    const [pixelAnalyticsData, setPixelAnalyticsData] = useState("");
    const [selectedPixelValue, setSelectedPixelValue] = useState("");
    const [localStorageGetStatus, setlocalStorageGetStatus] = useState(false);
    const [getPixelStatus, setPixelStatus] = useState(false);

    const orderReport = [
        {
            heading: t('analyticsPages.purchase'),
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
            heading: t('analyticsPages.initiateCheckout'),
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
            heading: t('analyticsPages.addToCart'),
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
            heading: t('analyticsPages.contentView'),
            data:
                pixelAnalytics != ""
                    ? pixelAnalytics.viewContent != null
                        ? pixelAnalytics.viewContent
                        : "00"
                    : "00",
            helpinText:
                "Including Clicks on the store affiliate link and product affilate link",
        },
        // {
        //     heading: "Page View",
        //     data:
        //         pixelAnalytics != ""
        //             ? pixelAnalytics.pageView != null
        //                 ? pixelAnalytics.pageView
        //                 : "00"
        //             : "00",
        //     helpinText:
        //         "Including Clicks on the store affiliate link and product affilate link",
        // },
        {
            heading: t('analyticsPages.search'),
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
            setPixelStatus(true);
        });
    };

    const getAnalytic = (pixelId, Tid) => {
        setSelectedPixelValue({ pixel_Id: pixelId, T_id: Tid });
        axioshttp
            .post("/getTiktokAnalytic", { id: pixelId, T_id: Tid })
            .then((res) => {
                setPixelAnalytics(res.data);
            });
    };
    const localStorageData=(pixel_Id,selected_DateSlot)=>{
        localStorage.setItem('pixel_id', pixel_Id);
        localStorage.setItem('selectedDateSlot', JSON.stringify(selected_DateSlot));
    }

    const handleDateRange = () => {
         
        if(selectedPixelValue !== null && selectedPixelValue !== ""){
             const eventValue = selectedPixelValue;

            let arr = eventValue.split("/");
                axioshttp
                    .post("/getTiktokAnalyticByRange", {
                        pixelId: arr[1],
                        T_id: arr[0],
                        start: analyiesStartDate,
                        end: analyiesEndDate,
                    })
                    .then((res) => {
                        setPixelAnalytics(res.data.countAnalyse);
                        setPixelAnalyticsData(res.data.mergedData);
                        localStorageData(eventValue,datePickerValue);
                    });
        }else{
            toast.error(t('pixelPage.toast.error.pixelRequired'));
        }
       
    };
    
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
                    localStorageData(eventValue,datePickerValue);
                });
        }
    };

    const handleByLocalStorage = () => {
        const eventValue = selectedPixelValue;
        let arr = eventValue.split("/");
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
    };
   
    useEffect(() => {
        // localStorage.clear();

        if(!getPixelStatus){
            pixelsGet();
        }
        const pixelID = localStorage.getItem('pixel_id');
        const retrievedObject = JSON.parse(localStorage.getItem('selectedDateSlot'));

        if (!localStorageGetStatus && retrievedObject && typeof retrievedObject === 'object') {
            setDatePickerValue(retrievedObject);
            setSelectedPixelValue(pixelID);
            setlocalStorageGetStatus(true);
          }

        if (
            datePickerValue &&
            datePickerValue.period &&
            datePickerValue.period.since &&
            datePickerValue.period.until
        ) {
            setAnalyiesStartDate(datePickerValue.period.since);
            setAnalyiesEndDate(datePickerValue.period.until);
        }
        console.log(retrievedObject);
        if(localStorage.getItem('pixel_id')===selectedPixelValue && JSON.stringify(retrievedObject) === JSON.stringify(datePickerValue) && analyiesStartDate!=null && analyiesEndDate){
            handleByLocalStorage();
        }
       
    }, [datePickerValue,analyiesStartDate]);

    ////////////////End of Backend Code////////////

    return test === true ? (
        <SkeletonStructure />
    ) : (
        <>
            <div className="margtop10">{/* <StarRating/> */}</div>
            <Page
                title={t('analyticsPages.pageTitle')}
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
                                  label: t('analyticsPages.selectPixel'),
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
                        // datePickerValue={datePickerValue}
                        setDatePickerValue={setDatePickerValue}
                        setOnChange={handleDateRange}
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
