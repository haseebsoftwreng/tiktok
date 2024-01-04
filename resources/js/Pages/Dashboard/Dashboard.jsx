/** @format */

import React, { useState } from "react";
import { Page, Grid, Card, Divider, InlineStack, Text } from "@shopify/polaris";
import DashReportRow from "../../Components/Dashboard/Dashboard";
import LineGraphData from "../../Components/LineChart/LineChart";
import DateRangePicker from "../../Components/DatePicker/DatePicker";
import StarRating from "../../Components/RatingStar/RatingStart";
import PlanProgress from "../../Components/Plan Progress/PlanProgress";

export default function Dashboard() {
  const orderReport = [
    {
      heading: "A Shipment",
      data: "5",
      helpinText:
        "Including Clicks on the store affiliate link and product affilate link",
    },
    {
      heading: "Partial Shipment",
      data: "2",
      helpinText:
        "Including Clicks on the store affiliate link and product affilate link",
    },
    {
      heading: "Delieverd",
      data: "2",
      helpinText:
        "Including Clicks on the store affiliate link and product affilate link",
    },
    {
      heading: "A Collection",
      data: "0",
      helpinText:
        "Including Clicks on the store affiliate link and product affilate link",
    },
    {
      heading: "In Transit",
      data: "0",
      helpinText:
        "Including Clicks on the store affiliate link and product affilate link",
    },
    {
      heading: "Completed",
      data: "0",
      helpinText:
        "Including Clicks on the store affiliate link and product affilate link",
    },
  ];
  // Api Data fetch  check
  const [test, settest] = useState(false);
  return test === true ? (
    <SkeletonStructure />
  ) : (
    <>
      <div className="margtop10">
        <PlanProgress />
      </div>
      <div className="margtop10">
        <StarRating />
      </div>
      <Page title="Orders" compactTitle primaryAction={<DateRangePicker />}>
        <div className="marginTop20">
          <div className="margtop10">
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Card>
                  <DashReportRow
                    heading={"Stats"}
                    data={orderReport}
                    colNumber={"3"}
                  />
                </Card>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                <Card title="Orders" sectioned>
                  <LineGraphData />
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

          <div className="marginTop20">
            <Text variant="heading2xl">Product Stats</Text>
          </div>
          <Card>
            <InlineStack align="space-between" wrap={true}>
              <div className="order-stats">
                <Text>Products</Text>
                <Text>6</Text>
              </div>
              <div className="order-stats">
                <Text>Active</Text>
                <Text>6</Text>
              </div>
              <div className="order-stats">
                <Text>Synced failed</Text>
                <Text>6</Text>
              </div>
              <div className="order-stats">
                <Text>Suspended</Text>
                <Text>6</Text>
              </div>
              <div className="order-stats">
                <Text>Inactive</Text>
                <Text>6</Text>
              </div>
              <div className="order-stats">
                <Text>Under Review</Text>
                <Text>6</Text>
              </div>
            </InlineStack>
          </Card>
        </div>
      </Page>
    </>
  );
}
