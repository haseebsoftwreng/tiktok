/** @format */

import React from "react";
import { Text, InlineGrid } from "@shopify/polaris";
import DashAnalyticsCard from "../DashboardCards/DashboardCards";

function DashReportRow({ heading, data, colNumber }) {
  return (
    <div className="marginTop20">
      {/* <Text variant="headingSm" as="h6">{heading}</Text> */}
      <div className="">
        <InlineGrid columns={{ sx: 2, sm: colNumber }} gap={200}>
          {data.map((item, key) => {
            return (
              <div className="margBottom10 margtop10" key={key}>
                <DashAnalyticsCard
                  tooltipText={item?.helpinText}
                  text={item?.heading}
                  data={item?.data}
                />
              </div>
            );
          })}
        </InlineGrid>
      </div>
    </div>
  );
}
export default DashReportRow;
