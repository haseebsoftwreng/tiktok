/** @format */

import {
  Button,
  Popover,
  IndexTable,
  Icon,
  InlineStack,
  Text,
} from "@shopify/polaris";
import { ParentContext } from "../ProductTable/ProductTable";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { SettingsMinor, DragHandleMinor } from "@shopify/polaris-icons";

function CustomizedTable({ updateParentValue, ordersRows }) {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = (
    <Button onClick={handleChange} size="large" icon={SettingsMinor}></Button>
  );
  const contexetValue = useContext(ParentContext);
  const { items, setItems } = contexetValue;
  const { rowMarkup, setRowMarkup } = contexetValue;
  useEffect(() => {}, [items]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    // set
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("text/plain");
    const newItems = [...items];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    setItems(newItems);
    const filteredArray = items
      .filter((obj) => obj.checked == true)
      .map((obj) => ({ title: obj.title }));
    const updatedRow = ordersRows.map((row, index) => (
      <IndexTable.Row id={row.id} key={row.id} position={index}>
        {filteredArray.map((item) => {
          <IndexTable.Cell style={{ textAlign: "center" }}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {item.title === "ProName"
                ? row[item.title].length > 15
                  ? row[item.title].slice(0, 20) + "...."
                  : row[item.title]
                : row[item.title]}
            </Text>
          </IndexTable.Cell>;
        })}
      </IndexTable.Row>
    ));
    updateParentValue([...items], [...updatedRow]);
    setRowMarkup([...updatedRow]);
    setItems([...newItems]);
  };
  const handleCheckChange = (id) => {
    items[id].checked = !items[id].checked;
    // new code added
    setItems([...items]);
    const filteredArray = items
      .filter((obj) => obj.checked == true)
      .map((obj) => ({ title: obj.title }));
    const updatedRow = ordersRows.map((row, index) => (
      <IndexTable.Row id={ordersRows.id} key={ordersRows.id} position={index}>
        {filteredArray.map((item) => {
          <IndexTable.Cell style={{ textAlign: "center" }}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {item.title === "ProName"
                ? row[item.title].length > 15
                  ? row[item.title].slice(0, 20) + "...."
                  : row[item.title]
                : row[item.title]}
            </Text>
          </IndexTable.Cell>;
        })}
      </IndexTable.Row>
    ));
    updateParentValue([...items], [...updatedRow]);
    setRowMarkup([...updatedRow]);
    setItems([...items]);
  };
  return (
    <div>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={handleChange}
        preferredPosition={"below"}>
        <ul className="listStyle">
          {items.map((item, index) => {
            return (
              <li
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}>
                <InlineStack gap={200}>
                  <label className="listItem">
                    <Icon source={DragHandleMinor} className="" />
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckChange(index)}
                    />
                    {item.title}
                  </label>
                </InlineStack>
              </li>
            );
          })}
        </ul>
      </Popover>
    </div>
  );
}
export default CustomizedTable;
