/** @format */

import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import {
  CashDollarMajor,
  AppsMajor,
  CheckoutMajor,
  SettingsMajor,
  PhoneMajor,
  ProductsMajor,
  StoreMajor,
  SimplifyMajor,
} from "@shopify/polaris-icons";
import {
  Icon,
  Popover,
  ActionList,
  Divider,
  InlineStack,
  ButtonGroup,
  Button,
} from "@shopify/polaris";

export default function Header() {
  const CurrentURl = window.location.href;
  const Link = [
    "http://localhost:5173",
    "http://localhost:5173/Products",
    "http://localhost:5173/Orders",
    "http://localhost:5173/settings",
    "http://localhost:5173/help",
    "http://localhost:5173/plans",
  ];

  const [activeItem, setActiveItem] = useState(
    function findIndexOfCurrentURL() {
      for (let i = 0; i < Link.length; i++) {
        if (Link[i] === CurrentURl) {
          return i;
        }
      }
      return 0; //
    }
  );
  const handleItemClick = (index) => {
    setActiveItem(index);
  };
  // last button
  const [active, setActive] = React.useState(null);

  const toggleActive = (id) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };

  const archiveItems = [
    <InlineStack className="navLink" gap={200}>
      <Icon source={AppsMajor} tone="base" />
      Dashboard
    </InlineStack>,
    <InlineStack className="navLink" gap={200}>
      <Icon source={ProductsMajor} tone="base" />
      Products
    </InlineStack>,
    <InlineStack className="navLink" gap={200}>
      <Icon source={CheckoutMajor} tone="base" />
      Orders
    </InlineStack>,
    <InlineStack className="navLink" gap={200}>
      <Icon source={SettingsMajor} tone="base" />
      Settings
    </InlineStack>,
    <InlineStack className="navLink" gap={200}>
      <Icon source={PhoneMajor} tone="base" />
      Help Center
    </InlineStack>,
    <InlineStack className="navLink" gap={200}>
      <Icon source={CashDollarMajor} tone="base" />
      Price
    </InlineStack>,
  ];

  return (
    <>
      <div className="inline">
        <ul className="archive-navbar">
          {archiveItems.map((item, index) => (
            <NavLink to={Link[index]} passhref="true" key={index}>
              <li
                className={`archive-item ${
                  activeItem === index || Link[index] === CurrentURl
                    ? "active"
                    : ""
                }`}
                onClick={() => handleItemClick(index)}>
                {item}
              </li>
            </NavLink>
          ))}
        </ul>
        <ul className="archive-navbar">
          <li>
            <ButtonGroup variant="segmented">
              <Button icon={StoreMajor}>Slash Cart</Button>

              <Popover
                active={active === "popover2"}
                preferredAlignment="right"
                activator={
                  <Button
                    onClick={toggleActive("popover2")}
                    icon={SimplifyMajor}
                    accessibilityLabel="Other save actions"
                  />
                }
                autofocusTarget="first-node"
                onClose={toggleActive("popover2")}>
                <ActionList
                  actionRole="menuitem"
                  items={[{ content: "Switch Account" }]}
                />
              </Popover>
            </ButtonGroup>
          </li>
        </ul>
      </div>
      <div className="my-2">
        <Divider borderColor="border" />
      </div>
    </>
  );
}
