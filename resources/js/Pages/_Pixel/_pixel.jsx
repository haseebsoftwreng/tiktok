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
    const [datePickerValue, setDatePickerValue] = useState();
    const [analyiesStartDate, setAnalyiesStartDate] = useState();
    const [analyiesEndDate, setAnalyiesEndDate] = useState();
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
    const localStorageData=(pixel_Id,selected_DateSlot)=>{
        localStorage.setItem('pixel_id', pixel_Id);
        localStorage.setItem('selectedDateSlot', JSON.stringify(selected_DateSlot));
        //  const storedData = localStorage.getItem('selectedDateSlot');
        //  const retrievedObject = JSON.parse(storedData);
    }

    const [selectedPixelValue, setSelectedPixelValue] = useState(localStorage.getItem('pixel_id'));
    const handleDateRange = () => {

        if(selectedPixelValue!==""){
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
        // var pixel_id = localStorage.getItem('pixel_id');
        // var selectedStartDate = localStorage.getItem('seletedStartDate');
        // var selectedEndDate = localStorage.getItem('seletedEndDate');

        // setSelectedPixelValue(pixel_id);
        // setAnalyiesStartDate(selectedStartDate);
        // setAnalyiesEndDate(selectedEndDate);
        setAnalyiesStartDate(datePickerValue.period.since);
        setAnalyiesEndDate(datePickerValue.period.until);
        const eventValue = selectedPixelValue;
        console.log('start date in side local storage',datePickerValue);

        let arr = eventValue.split("/");
        
            axioshttp
                .post("/getTiktokAnalyticByRange", {
                    T_id: arr[0],
                    pixelId: arr[1],
                    start: analyiesStartDate,
                    end: analyiesEndDate,
                })
                .then((res) => {
                    console.log('count analyes',res.data.countAnalyse)
                    setPixelAnalytics(res.data.countAnalyse);
                    setPixelAnalyticsData(res.data.mergedData);
                });
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
        
        // const storedData = localStorage.getItem('selectedDateSlot');
        // const pixelID = localStorage.getItem('pixel_id');
        // const retrievedObject = JSON.parse(localStorage.getItem('selectedDateSlot'));
        // if (retrievedObject && typeof retrievedObject === 'object') {
        //     setDatePickerValue(retrievedObject);
        //   }
        //   if(pixelID!=null){
        //     setSelectedPixelValue(pixelID)
        //   }
        
        console.log('updated value Pixel',JSON.parse(localStorage.getItem('selectedDateSlot')));
        console.log('local Value Pixel',localStorage.getItem('pixel_id'));
        console.log('djsidjsidsijdisdjisdisdisjdijsidjsidjisdisjdisjdisidsi');
        console.log('updated value Pixel',selectedPixelValue);
        console.log('local Value Pixel',datePickerValue);

        if(localStorage.getItem('pixel_id')===selectedPixelValue){
            console.log('i am here');
            // handleByLocalStorage();
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
