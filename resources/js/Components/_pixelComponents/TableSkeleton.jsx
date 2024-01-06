/** @format */
import {
  LegacyCard,
  SkeletonDisplayText,
  SkeletonThumbnail,
  Box,
} from "@shopify/polaris";
import {
  IndexTable,
  useIndexResourceState,
  Text,
  useBreakpoints,
} from "@shopify/polaris";
import React from "react";

export default function TableSkeleton() {
  const orders = [
    {
      id: "1020",
      date: (
        <span className="skulldata-firstItem">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      customer: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      total: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      paymentStatus: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      fulfillmentStatus: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
    },
    {
      id: "1020",
      date: (
        <span className="skulldata-firstItem">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      customer: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      total: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      paymentStatus: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      fulfillmentStatus: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
    },
    {
      id: "1020",
      date: (
        <span className="skulldata-firstItem">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      customer: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      total: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      paymentStatus: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      fulfillmentStatus: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
    },
    {
      id: "1020",
      date: (
        <span className="skulldata-firstItem">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      customer: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      total: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      paymentStatus: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
      fulfillmentStatus: (
        <span className="skulldata">
          <SkeletonDisplayText size="large" />
        </span>
      ),
    },
  ];

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      { id, order, date, customer, total, paymentStatus, fulfillmentStatus },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}>
        <IndexTable.Cell className="skull-second-cell-width">
          {date}
        </IndexTable.Cell>
        <IndexTable.Cell className="skull-cell-width">
          {customer}
        </IndexTable.Cell>
        <IndexTable.Cell className="skull-cell-width">
          <Text as="span" alignment="end" numeric>
            {total}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell className="skull-cell-width">
          {paymentStatus}
        </IndexTable.Cell>
        <IndexTable.Cell className="skull-cell-width">
          {fulfillmentStatus}
        </IndexTable.Cell>
        <IndexTable.Cell className="skull-cell-width">
          {fulfillmentStatus}
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  return (
    <>
      <div className="skull-table">
        <LegacyCard>
          <div style={{ width: "100%", display: "flex", padding: "30px" }}>
            <Box className="skull-tabs">
              <SkeletonDisplayText size="medium" />
            </Box>
            <Box className="skull-tabs">
              <SkeletonDisplayText size="medium" />
            </Box>
            <Box className="skull-tabs">
              <SkeletonDisplayText size="medium" />
            </Box>
            <Box className="skull-tabs">
              <SkeletonDisplayText size="medium" />
            </Box>
            <Box className="skull-tabs">
              <SkeletonDisplayText size="medium" />
            </Box>
            <Box className="skull-tabs">
              <SkeletonDisplayText size="medium" />
            </Box>
          </div>
          <IndexTable
            selectable={false}
            condensed={useBreakpoints().smDown}
            resourceName={resourceName}
            itemCount={orders.length}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            headings={[{}]}>
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      </div>
    </>
  );
}
