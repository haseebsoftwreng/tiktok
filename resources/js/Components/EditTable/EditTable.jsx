import React, { useState, useCallback } from "react";
import {
  TextField,
  Box,
  DataTable,
  Button,
  Text,
  Frame,
  ContextualSaveBar,
} from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";

function EditTable() {
  const [show, setShow] = useState(false);
  const [rows, setRows] = useState([
    {
      size: "Small",
      colour: "Red",
      idCode: "#546",
      retailPrice: "1",
      quantity: "1",
      sku: "1",
    },
    {
      size: "Small",
      colour: "Blue",
      idCode: "#546",
      retailPrice: "1",
      quantity: "1",
      sku: "1",
    },
    {
      size: "Small",
      colour: "Green",
      idCode: "#546",
      retailPrice: "1",
      quantity: "1",
      sku: "1",
    },
  ]);

  const handleInputChange = useCallback((newValue, rowIndex, key) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[rowIndex][key] = newValue;
      return newRows;
    });
    setShow(true);
  }, []);

  //   const handleAddRow = () => {
  //     setRows((prevRows) => [
  //       ...prevRows,
  //       {
  //         size: "",
  //         colour: "",
  //         idCode: "",
  //         retailPrice: "",
  //         quantity: "",
  //         sku: "",
  //       },
  //     ]);
  //   };

  const handleDeleteRow = (index) => {
    alert("del the selected Row");
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows.splice(index, 1);
      return newRows;
    });
  };

  return (
    <Box>
      <DataTable
        columnContentTypes={[
          "text",
          "text",
          "text",
          "text",
          "text",
          "text",
          "text",
        ]}
        headings={[
          "Size",
          "Colour",
          "ID Code(optional)",
          "Retail Price",
          "Quantity",
          "SKU (optional)",
          "Action",
        ]}
        rows={rows.map((row, index) => [
          <Text>{row.size}</Text>,
          <Text>{row.colour}</Text>,
          <Text>{row.idCode}</Text>,
          <TextField
            type="number"
            value={row.retailPrice}
            onChange={(value) => handleInputChange(value, index, "retailPrice")}
          />,
          <TextField
            type="number"
            value={row.quantity}
            onChange={(value) => handleInputChange(value, index, "quantity")}
          />,
          <Text>{row.sku}</Text>,
          <Button
            icon={DeleteMinor}
            size="large"
            onClick={() => handleDeleteRow(index)}
          />,
        ])}
        // fixedFirstColumns={2}
        firstColumnMinWidth={100}
        // footerContent={`Showing ${rows.length} results`}
      />
      {/* <Button onClick={handleAddRow}>Add Row</Button> */}
      {show && (
        <div style={{ height: "1px" }}>
          <Frame
            logo={{
              width: 86,
              contextualSaveBarSource:
                "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
            }}
          >
            <ContextualSaveBar
              message="Unsaved changes"
              saveAction={{
                onAction: () => setShow(false),
                loading: false,
                disabled: false,
              }}
              discardAction={{
                onAction: () => setShow(false),
              }}
            />
          </Frame>
        </div>
      )}
    </Box>
  );
}

export default EditTable;
