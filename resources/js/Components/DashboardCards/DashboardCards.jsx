import React from "react";
import {Card,Tooltip,Text} from "@shopify/polaris";
function DashAnalyticsCard({tooltipText,text,data}) {
    

  return (
        <Card>
            <Tooltip content={tooltipText}><Text>{text}</Text></Tooltip>
          <Text as="p" fontWeight="semibold">{data}</Text>
          </Card>
  );
}
export default DashAnalyticsCard;