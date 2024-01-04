/** @format */

import React from "react";
import {
  Page,
  InlineStack,
  Tooltip,
  Card,
  Filters,
  ChoiceList,
  TextField,
  Checkbox,
  Tabs,
  Box,
  Badge,
  Icon,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import ProductTable from "../../Components/ProductTable/ProductTable";
import {
  RefreshMinor,
  EditMinor,
  TiktokMinor,
  SearchMajor,
  FilterMajor,
} from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";
import CtmTable from "../../Components/Custom/CtmTable";

export default function Products() {
  const [showSearch, setShowSearch] = useState(false);
  const OpenSearch = () => {
    setShowSearch(!showSearch);
  };
  const [checked, setChecked] = useState(false);
  // const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
    console.log(id);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // 👇️ navigate programmatically
    navigate("/editproduct");
  };
  // Tabs
  const [itemStrings, setItemStrings] = useState(["All", "Not Uploaded"]);

  const badge = ["38", "10", "20", "40", "0", "10", "0"];
  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    badge: badge[index],
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
  }));
  // Tabs
  const [selectedTab, setSelectedTab] = useState(null);
  const [resetSelect, setResetSelect] = useState(false);

  const handleTabChange = useCallback((tabIndex) => {
    setSelectedTab(tabIndex);
    setResetSelect((prevState) => !prevState);
  }, []);
  const items = [
    { name: "Item 1", price: "$10" },
    { name: "Item 2", price: "$20" },
    // Add more items as needed
  ];
  const Allorders = [
    {
      id: "1",
      check: (
        <Checkbox
          checked={checkedItems["1"] || false}
          onChange={() => handleChange("1")}
        />
      ),
      ProImage: (
        <img
          src="src/Images/download.webp"
          style={{ width: "40px", height: "40px" }}
        />
      ),
      ProName:
        "Gift Card Gift Card vGift Card Gift Card vGift Card vGift Card vGift Card vGift Card Gift Card",
      ProType: "",
      Vendor: "Snowboard Vendor",
      Variations: "4",
      ShopifyStatus: <Badge tone="success"> Active</Badge>,
      TikTokStatus: (
        <Badge>
          <Icon source={TiktokMinor} tone="base" />
        </Badge>
      ),
      Action: (
        <>
          <ButtonGroup>
            <Button icon={EditMinor} onClick={handleClick}>
              Edit
            </Button>
            <Button icon={RefreshMinor}> Sync</Button>
          </ButtonGroup>
        </>
      ),
    },
    {
      id: "2",
      check: (
        <Checkbox
          checked={checkedItems["2"] || false}
          onChange={() => handleChange("2")}
        />
      ),
      ProImage: (
        <img
          src="src/Images/download.webp"
          style={{ width: "40px", height: "40px" }}
        />
      ),
      ProName: "Selling Plans Ski Wax",
      ProType: "",
      Vendor: "	LusaOrganic",
      Variations: "3",
      ShopifyStatus: <Badge tone="success"> Active</Badge>,
      TikTokStatus: (
        <Badge>
          <Icon source={TiktokMinor} tone="base" />
        </Badge>
      ),
      Action: (
        <>
          <ButtonGroup>
            <Button icon={EditMinor} onClick={handleClick}>
              Edit
            </Button>
            <Button icon={RefreshMinor}> Sync</Button>
          </ButtonGroup>
        </>
      ),
    },
    {
      id: "3",
      check: (
        <Checkbox
          checked={checkedItems["3"] || false}
          onChange={() => handleChange("3")}
        />
      ),
      ProImage: (
        <img
          src="src/Images/download.webp"
          style={{ width: "40px", height: "40px" }}
        />
      ),
      ProName: "Electric Mini Garlic Chopper",
      ProType: "test",
      Vendor: "	BERA ROSA",
      Variations: "1",
      ShopifyStatus: <Badge tone="success"> Active</Badge>,
      TikTokStatus: (
        <Badge>
          <Icon source={TiktokMinor} tone="base" />
        </Badge>
      ),
      Action: (
        <>
          <ButtonGroup>
            <Button icon={EditMinor} onClick={handleClick}>
              Edit
            </Button>
            <Button icon={RefreshMinor}> Sync</Button>
          </ButtonGroup>
        </>
      ),
    },
  ];

  // Api Data fetch  check
  const [test, settest] = useState(false);
  return test === true ? (
    <SkeletonStructure />
  ) : (
    <Page title="Product Page">
      <Card>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Tabs
              tabs={tabs}
              selected={selectedTab}
              onSelect={handleTabChange}></Tabs>
          </Box>
          <Box>
            <Tooltip content="Search and Filter">
              <Button onClick={OpenSearch}>
                <InlineStack>
                  <Icon source={SearchMajor} tone="base" />
                  <Icon source={FilterMajor} tone="base" />
                </InlineStack>
              </Button>
            </Tooltip>
          </Box>
        </Box>
        <ProductTable
          reset={resetSelect}
          open={showSearch}
          orders={Allorders}
        />
      </Card>
      <CtmTable items={items} />
    </Page>
  );
}
