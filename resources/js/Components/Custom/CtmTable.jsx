/** @format */

import React, { useState } from "react";
import {
  IndexTable,
  useIndexResourceState,
  Text,
  Badge,
  useBreakpoints,
} from "@shopify/polaris";
import CustomCheckbox from "./CtmCheckbox";

const CtmTable = ({ items }) => {
  const orders = [
    {
      id: "1020",
      disabled: true,
      order: "#1020",
      date: "Jul 20 at 4:34pm",
      customer: "Jaydon Stanton",
      total: "$969.44",
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: "1019",
      disabled: false,
      order: "#1019",
      date: "Jul 20 at 3:46pm",
      customer: "Ruben Westerfelt",
      total: "$701.19",
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: "1018",
      disabled: false,
      order: "#1018",
      date: "Jul 20 at 3.44pm",
      customer: "Leo Carder",
      total: "$798.24",
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (isChecked, orderId) => {
    const updatedRows = [...selectedRows];

    if (orderId === "main") {
      const updatedRows = [];
      if (isChecked) {
        updatedRows.push(orderId);
        const allRowsIndexes = orders.reduce((acc, order, index) => {
          if (!order.disabled) {
            acc.push(index);
          }
          return acc;
        }, []);
        console.log(allRowsIndexes);

        console.log("All", allRowsIndexes);

        updatedRows.push(...allRowsIndexes);
        setSelectedRows(updatedRows);

        console.log(selectedRows);
        console.log(updatedRows);
      } else {
        setSelectedRows([]);
      }
    } else {
      // const isDisabled = orders[orderId].disabled === "true";
      const isDisabled =
        orders.find(({ id }) => id === orderId)?.disabled === true;

      if (!isDisabled) {
        if (isChecked) {
          updatedRows.push(orderId);
        } else {
          const index = updatedRows.indexOf(orderId);
          if (index !== -1) {
            updatedRows.splice(index, 1);
          }
        }
      }
      setSelectedRows(updatedRows);
      console.log(updatedRows);
    }
  };

  const rowMarkup = orders.map(
    (
      {
        id,
        disabled,
        order,
        date,
        customer,
        total,
        paymentStatus,
        fulfillmentStatus,
      },
      index
    ) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <CustomCheckbox
            disabled={disabled}
            checked={selectedRows.includes(index)}
            onChange={(isChecked) => handleCheckboxChange(isChecked, index, id)}
          />
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {total}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <>
      <IndexTable
        selectable={false}
        condensed={useBreakpoints().smDown}
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {
            title: (
              <CustomCheckbox
                checked={selectedRows.includes("main")}
                onChange={(isChecked) =>
                  handleCheckboxChange(isChecked, "main")
                }
              />
            ),
            key: "checkbox",
          },
          { title: "Order" },
          { title: "Date" },
          { title: "Customer" },
          { title: "Total", alignment: "end" },
          { title: "Payment status" },
          { title: "Fulfillment status" },
        ]}>
        {rowMarkup}
      </IndexTable>
    </>
  );
};

export default CtmTable;
