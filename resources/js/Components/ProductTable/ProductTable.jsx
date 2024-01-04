/** @format */

import {
  TextField,
  FormLayout,
  IndexTable,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  Filters,
  ChoiceList,
  Box,
  RadioButton,
  Tabs,
  Banner,
  Button,
  Card,
  Grid,
  ButtonGroup,
  Badge,
  Select,
  Icon,
  InlineStack,
  Tooltip,
} from "@shopify/polaris";
import { InfoMinor } from "@shopify/polaris-icons";
import { Checkbox } from "@shopify/polaris";

import { useState, useCallback, useEffect, createContext } from "react";
import {
  RefreshMinor,
  EditMinor,
  CancelMinor,
  TiktokMinor,
  SearchMajor,
  FilterMajor,
} from "@shopify/polaris-icons";
import CustomizedTable from "../CustomizedTable/CustomizedTable";
const ParentContext = createContext();
import { useNavigate } from "react-router-dom";
import CtmSelectCategory from "../SelectCateories/CtmSelectCategory";

function ProductTable({ orders, open, reset }) {
  // Filter start
  const [availability, setAvailability] = useState([]);
  const [productType, setProductType] = useState([]);
  const [taggedWith, setTaggedWith] = useState("");
  const [queryValue, setQueryValue] = useState("");

  const handleAvailabilityChange = useCallback(
    (value) => setAvailability(value),
    []
  );
  const handleProductTypeChange = useCallback(
    (value) => setProductType(value),
    []
  );
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    []
  );
  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    []
  );
  const handleAvailabilityRemove = useCallback(() => setAvailability([]), []);
  const handleProductTypeRemove = useCallback(() => setProductType([]), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(""), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(""), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAvailabilityRemove();
    handleProductTypeRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAvailabilityRemove,
    handleQueryValueRemove,
    handleProductTypeRemove,
    handleTaggedWithRemove,
  ]);

  const filters = [
    {
      key: "availability",
      label: "Availability",
      filter: (
        <ChoiceList
          title="Availability"
          titleHidden
          choices={[
            { label: "Online Store", value: "Online Store" },
            { label: "Point of Sale", value: "Point of Sale" },
            { label: "Buy Button", value: "Buy Button" },
          ]}
          selected={availability || []}
          onChange={handleAvailabilityChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: "productType",
      label: "Product type",
      filter: (
        <ChoiceList
          title="Product type"
          titleHidden
          choices={[
            { label: "T-Shirt", value: "T-Shirt" },
            { label: "Accessory", value: "Accessory" },
            { label: "Gift card", value: "Gift card" },
          ]}
          selected={productType || []}
          onChange={handleProductTypeChange}
          allowMultiple
        />
      ),
    },
    {
      key: "taggedWith",
      label: "Tagged with",
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
    },
  ];

  const appliedFilters = [];
  if (!isEmpty(availability)) {
    const key = "availability";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, availability),
      onRemove: handleAvailabilityRemove,
    });
  }
  if (!isEmpty(productType)) {
    const key = "productType";
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, productType),
      onRemove: handleProductTypeRemove,
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = "taggedWith";
    appliedFilters.push({
      key,
      label: `Tagged with ${taggedWith}`,
      onRemove: handleTaggedWithRemove,
    });
  }

  // Filter End
  // Floating button
  const promotedBulkActions = [
    {
      content: "Sync to Tiktok ",
      onAction: () => SynctoTiktok(),
    },
    {
      content: "Link to Tiktok",
      onAction: () => LinktoTiktok(),
    },
  ];

  const [checked, setChecked] = useState(false);
  const handleChange = useCallback((newChecked) => setChecked(newChecked), []);

  const [items, setItems] = useState([
    {
      id: "0",
      title: <Checkbox checked={checked} onChange={handleChange} />,
      checked: true,
    },
    {
      id: "1",
      title: "ProImage",
      value: "Product Image",
      checked: true,
    },
    { id: "2", title: "ProName", value: "Product Name", checked: true },
    { id: "3", title: "ProType", value: "Product Type", checked: true },
    { id: "4", title: "Vendor", value: "Vendor", checked: true },
    { id: "5", title: "Variations", value: "Variations", checked: true },
    { id: "6", title: "ShopifyStatus", value: "Shopify Status", checked: true },
    { id: "7", title: "TikTokStatus", value: "TikTok Status", checked: true },
    { id: "8", title: "Action", value: "Action", checked: true },
  ]);

  const [selected, setSelected] = useState(0);
  const { mode, setMode } = useSetIndexFiltersMode();

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
    removeSelectedResources,
  } = useIndexResourceState(orders);

  // Child component
  const resetSelection = useCallback(() => {
    removeSelectedResources([]);
    clearSelection();
  }, [removeSelectedResources, clearSelection]);

  // Use useEffect to run the child function when the reset prop changes
  useEffect(() => {
    // Run the child function with the current value
    resetSelection();
  }, [reset]); // Only run the effect if reset changes

  //
  // filter out the heading of bydefault
  const filteredArray = items
    .filter((obj) => obj.checked == true)
    .map((obj) => ({ value: obj.value, title: obj.title }));

  const [rowMarkup, setRowMarkup] = useState(
    orders.map((row, index) => {
      <IndexTable.Row
        id={row.id}
        key={row.id}
        selected={selectedResources.includes(orders[index].id)}
        position={index}>
        {filteredArray.map((item, id) => {
          <IndexTable.Cell style={{ textAlign: "center" }} key={id}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {item.title === "ProName"
                ? row[item.title].length > 15
                  ? row[item.title].slice(0, 20) + "...."
                  : row[item.title]
                : row[item.title]}
            </Text>
          </IndexTable.Cell>;
        })}
      </IndexTable.Row>;
    })
  );

  useEffect(() => {
    // filter out the heading of bydefault
    const filteredArray = items
      .filter((obj) => obj.checked == true)
      .map((obj) => ({ title: obj.title }));
    const newRows = orders.map((row, index) => (
      <IndexTable.Row
        id={row.id}
        key={row.id}
        selected={false}
        position={index}>
        <IndexTable.Cell key={`${row.id}-check`}>{row.check}</IndexTable.Cell>
        <IndexTable.Cell key={`${row.id}-img`}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {/* <SkeletonBodyText lines={1}/> */}
              {row.ProImage}
            </Text>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell key={`${row.id}-name`}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {row.ProName.length > 15
                ? row.ProName.slice(0, 20) + "...."
                : row.ProName}
            </Text>
            <span
              style={{
                color: "red",
                position: "absolute",
                fontSize: "12px",
                display: "flex",
                top: "19px",
              }}>
              <Icon source={InfoMinor} tone="critical" />
              <p style={{ fontWeight: "500" }}>
                {`Edit product to fix errors and sync it to Tiktok Shop`}
              </p>
            </span>
          </div>
        </IndexTable.Cell>
        <IndexTable.Cell key={`${row.id}-type`}>{row.ProType}</IndexTable.Cell>
        <IndexTable.Cell key={`${row.id}-vendor`}>{row.Vendor}</IndexTable.Cell>
        <IndexTable.Cell key={`${row.id}-variations`}>
          {row.Variations}
        </IndexTable.Cell>
        <IndexTable.Cell key={`${row.id}-shopify-status`}>
          {row.ShopifyStatus}
        </IndexTable.Cell>
        <IndexTable.Cell key={`${row.id}-tt-status`}>
          {row.TikTokStatus}
        </IndexTable.Cell>
        <IndexTable.Cell key={`${row.id}-action`}>{row.Action}</IndexTable.Cell>
      </IndexTable.Row>
    ));
    setRowMarkup(newRows);
  }, [items, orders, selectedResources]);

  // callback function
  const updateParentValue = (newValue, newrowValue) => {
    setRowMarkup([...newrowValue]);
    setItems([...newValue]);
  };
  // Data Table Search
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  // filter option show and hide
  const [showFilter, setShowFilter] = useState(open);

  useEffect(() => {
    setShowFilter(open);
  }, [open]);

  const FilterHandle = () => {
    setShowFilter(!showFilter);
  };

  // Subhan
  const [selectedCategory, setSelectedCategory] = useState(["default"]);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [ShowSyncCard, setShowSyncCard] = useState(false);
  const [value, setValue] = useState("disabled");

  const handleChoiceListChange = useCallback((value) => {
    setSelectedCategory(value);
  }, []);

  const handleTextFieldChange = useCallback((value) => {
    setTextFieldValue(value);
  }, []);

  const renderChildren = useCallback(
    (isSelected) => {
      return isSelected && <CtmSelectCategory />;
    },
    [handleTextFieldChange, textFieldValue]
  );

  const handleValueChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const navigate = useNavigate();
  const LinktoTiktok = () => {
    // 👇️ navigate programmatically
    navigate("/linkproduct");
  };
  const SynctoTiktok = () => {
    setShowSyncCard(true);
  };

  return (
    <Box>
      <Checkbox checked={checked} onChange={handleChange} />
      {ShowSyncCard ? (
        <>
          <Card>
            <Banner>
              <strong>Push To TikTok Shop</strong>
              <p>
                Use your finance report to get detailed information about your
                business.
              </p>
            </Banner>
            <Box style={{ marginTop: "10px" }}>
              <ChoiceList
                choices={[
                  {
                    label: (
                      <>
                        <span>Default Category</span>{" "}
                        <strong>
                          Home Supplies-Home Organizers-Storage Boxes & Bins
                        </strong>
                      </>
                    ),
                    value: "default",
                  },
                  { label: "Get Recommended Category.", value: "recommended" },
                  {
                    label: "Manual Select Category",
                    value: "manual",
                    renderChildren,
                  },
                ]}
                selected={selectedCategory}
                onChange={handleChoiceListChange}
              />
            </Box>

            <Box
              className="save-button"
              style={{ marginTop: "20px", float: "right" }}>
              <ButtonGroup>
                <Button onClick={() => setShowSyncCard(false)}>Cancel</Button>
                <Button
                  onClick={() => setShowSyncCard(false)}
                  variant="primary">
                  Save
                </Button>
              </ButtonGroup>
            </Box>
          </Card>
        </>
      ) : (
        <div className="mTopBott20">
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 12, xl: 12 }}>
              {showFilter === true ? (
                <Box>
                  <Filters
                    queryValue={queryValue}
                    queryPlaceholder="Search items"
                    // hideQueryField
                    filters={filters}
                    appliedFilters={appliedFilters}
                    onQueryChange={handleFiltersQueryChange}
                    onQueryClear={handleQueryValueRemove}
                    onClearAll={handleFiltersClearAll}>
                    <div style={{ paddingLeft: "8px" }}>
                      <Button size="small" onClick={FilterHandle}>
                        Cancel
                      </Button>
                    </div>
                  </Filters>
                </Box>
              ) : null}
              {/* {showFilter === true ? (
                <Filters
                  queryValue={queryValue}
                  queryPlaceholder="Search items"
                  // hideQueryField
                  filters={filters}
                  appliedFilters={appliedFilters}
                  onQueryChange={handleFiltersQueryChange}
                  onQueryClear={handleQueryValueRemove}
                  onClearAll={handleFiltersClearAll}
                />
              ) : (
                <Tooltip content="Search and Filter">
                  <Button onClick={FilterHandle}>
                    <InlineStack>
                      <Icon source={SearchMajor} tone="base" />
                      <Icon source={FilterMajor} tone="base" />
                    </InlineStack>
                  </Button>
                </Tooltip>
              )} */}
            </Grid.Cell>
            {/* <Grid.Cell columnSpan={{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
              <div className="dis-Last">
                <ButtonGroup>
                  <ParentContext.Provider
                    value={{ items, setItems, rowMarkup, setRowMarkup }}>
                    <CustomizedTable
                      updateParentValue={updateParentValue}
                      ordersRows={orders}
                    />
                  </ParentContext.Provider>
                  <Button size="large" icon={RefreshMinor}>
                    Sync{" "}
                  </Button>
                </ButtonGroup>
              </div>
            </Grid.Cell> */}
          </Grid>
          <Box>
            <div className="mTopBott20">
              <IndexTable
                selectable={false}
                resourceName={resourceName}
                itemCount={orders.length}
                selectedItemsCount={
                  selectedResources.length === orders.length
                    ? "All"
                    : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                headings={items}
                pagination={true}
                promotedBulkActions={promotedBulkActions}>
                {rowMarkup}
              </IndexTable>
            </div>
          </Box>
        </div>
      )}
    </Box>
  );

  // Filter Functions
  function disambiguateLabel(key, value) {
    switch (key) {
      case "taggedWith":
        return `Tagged with ${value}`;
      case "availability":
        return value.map((val) => `Available on ${val}`).join(", ");
      case "productType":
        return value.join(", ");
      default:
        return value.toString();
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}

export default ProductTable;

export { ParentContext };
