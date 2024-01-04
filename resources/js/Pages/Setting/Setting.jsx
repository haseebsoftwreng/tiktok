/** @format */

import React, { useState, useCallback } from "react";
import {
  Tabs,
  Page,
  Layout,
  Card,
  ChoiceList,
  Text,
  TextField,
  Form,
  Box,
  Button,
  Popover,
  Select,
  Link,
  InlineGrid,
  RadioButton,
  ButtonGroup,
  FormLayout,
  Label,
  InlineStack,
  ActionList,
  Divider,
  Icon,
  Tooltip,
} from "@shopify/polaris";
import {
  SimplifyMajor,
  QuestionMarkInverseMajor,
  StoreMajor,
  MobilePlusMajor,
} from "@shopify/polaris-icons";
import DisconnectShop from "../../Components/DisconnectShopModal/DisconnectShopModal";
import SelectCategory from "../../Components/SelectCateories/SelectCateories";
import CtmSelectCategory from "../../Components/SelectCateories/CtmSelectCategory";

const Setting = () => {
  // last button
  const [active, setActive] = React.useState(null);

  const toggleActive = (id) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };

  //
  // shopify Location
  // shopify inventory
  const [Shopifyselected, setShopifyselected] = useState([]);

  const handleShopifyChange = useCallback(
    (value) => setShopifyselected([...Shopifyselected], value),
    []
  );

  const Shopifyoptions = [
    { label: "Select", value: "ShopLocation" },
    { label: "Shop Location", value: "ShopLocation" },
  ];

  //
  const [show, setShow] = useState(false);
  function handelShowLocation() {
    setShow(!show);
  }
  // TikTOk inventory
  const [tiktokselected, settiktokselected] = useState("Select Shop Location");

  const handleTikTokChange = useCallback(
    (value) => settiktokselected(value),
    []
  );

  const TikTokoptions = [
    { label: "Select", value: "ShopLocation" },
    { label: "Shop Location", value: "ShopLocation" },
  ];

  // Auto And Manual radio Button
  const [value, setValue] = useState("disabled");

  const handleChange = useCallback((_, newValue) => setValue(newValue), []);

  // CheckBox Multiple
  const [PAttributesselected, setPAttributesselected] = useState(["hidden"]);

  const handlePAttriChange = useCallback(
    (value) => setPAttributesselected(value),
    []
  );
  // For length
  const [lengthValue, setlengthValue] = useState("1");
  const handlelengthChange = useCallback((value) => setlengthValue(value), []);
  // For weidth
  const [WidthValue, setWidthhValue] = useState("1");
  const handleWidthChange = useCallback((value) => setWidthhValue(value), []);
  // For Height
  const [HeightValue, setHeightValue] = useState("1");
  const handleHeightChange = useCallback((value) => setHeightValue(value), []);

  //  handleweightChange
  // For Weight
  const [weightValue, setweightValue] = useState("1");
  const handleweightChange = useCallback((value) => setweightValue(value), []);

  // Api Data fetch  check
  const [test, test2] = useState(false);
  return test === true ? (
    <SkeletonStructure />
  ) : (
    <Page>
      <Layout>
        <Layout.Section>
          <div className="marginTop20">
            <Text variant="headingXl" as="h6">
              Settings
            </Text>
            <Text>You can customize or update all settings here.</Text>
            <div className="marginTop20">
              <Layout>
                <Layout.AnnotatedSection
                  id="Merchant Details"
                  title="Merchant Details"
                  description="Following are Details of Connected Tiktok Shop.">
                  <Card sectioned>
                    <InlineGrid columns={{ xs: 2 }}>
                      <div>
                        <Text>TIKTOK SHOP</Text>
                      </div>
                      <div className="dis-Last">
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
                      </div>
                    </InlineGrid>
                    <div className="margtop10">
                      <Card>
                        <InlineGrid columns={{ xs: 2, sm: 2 }}>
                          <div>
                            <Text>
                              Tiktok Shop is{" "}
                              <span className="text-bold">connected.</span>
                            </Text>
                            <Text>
                              Tiktok Shop ID :{" "}
                              <span className="text-bold">
                                7495372796251113484
                              </span>{" "}
                            </Text>
                            <Text>
                              Tiktok Shop Name:{" "}
                              <span className="text-bold">SlashCart</span>
                            </Text>
                            <Text>
                              Tiktok Shop Region:
                              <span className="text-bold"> GB</span>
                            </Text>
                          </div>
                          <Box as="div" align="end">
                            {/* <DisconnectShop /> */}
                          </Box>
                        </InlineGrid>
                      </Card>
                    </div>
                  </Card>
                </Layout.AnnotatedSection>
              </Layout>
            </div>
            <div className="marginTop20">
              <Layout>
                <Layout.AnnotatedSection
                  id="Inventory Location"
                  title="Inventory Location"
                  description="Select Shopify Location to sync the inventory across channels">
                  <Card sectioned>
                    <InlineGrid columns={{ xs: 2 }}>
                      <div>
                        <Text>LOCATION FOR INVENTORY SYNC</Text>
                      </div>
                      <div className="dis-Last">
                        <Button
                          icon={MobilePlusMajor}
                          size="large"
                          onClick={handelShowLocation}>
                          Add
                        </Button>
                      </div>
                    </InlineGrid>
                    <div className="marginTop20">
                      <Card>
                        <InlineGrid columns={{ xs: 2 }} gap={400}>
                          <div>
                            <Text>Shopify Inventory location</Text>
                          </div>
                          <div>
                            <Text>TikTok Inventory location</Text>
                          </div>
                        </InlineGrid>
                        {show ? (
                          <div className="marginTop20">
                            <InlineGrid columns={{ xs: 2 }} gap={400}>
                              <div>
                                <Select
                                  label="Shopify"
                                  options={Shopifyoptions}
                                  onChange={handleShopifyChange}
                                  value={Shopifyselected}
                                />
                              </div>
                              <Box as="div" align="end">
                                <Select
                                  label="TIKTOK"
                                  options={TikTokoptions}
                                  onChange={handleTikTokChange}
                                  value={tiktokselected}
                                />
                              </Box>
                            </InlineGrid>
                          </div>
                        ) : (
                          ""
                        )}
                      </Card>
                    </div>
                  </Card>
                </Layout.AnnotatedSection>
              </Layout>
            </div>
            <div className="marginTop20">
              <Layout>
                <Layout.AnnotatedSection
                  id="Product Webhooks Settings"
                  title="Product Webhooks Settings"
                  description="Instantly sync product changes from Shopify.">
                  <Card sectioned>
                    <div className="marginTop20">
                      <InlineStack gap={400}>
                        <InlineStack gap={400}>
                          <RadioButton
                            label="Auto"
                            checked={value === "disabled"}
                            id="disabled"
                            name="accounts"
                            onChange={handleChange}
                          />
                          <Tooltip
                            content="This order has shipping labels."
                            className="">
                            <Icon
                              source={QuestionMarkInverseMajor}
                              tone="base"
                            />
                          </Tooltip>
                        </InlineStack>
                        <InlineStack gap={400}>
                          <RadioButton
                            label="Manual"
                            id="optional"
                            name="accounts"
                            checked={value === "optional"}
                            onChange={handleChange}
                          />
                          <Tooltip
                            content="This order has shipping labels."
                            className="flex">
                            <Icon
                              source={QuestionMarkInverseMajor}
                              tone="base"
                            />
                          </Tooltip>
                        </InlineStack>
                      </InlineStack>
                      <div className="margtop10">
                        <Divider />
                      </div>
                      <div className="margtop10">
                        <Text as="p" fontWeight="medium">
                          ATTRIBUTES TO SYNC FOR TIKTOK SHOP
                        </Text>
                        <div className="margtop10">
                          <ChoiceList
                            allowMultiple
                            choices={[
                              {
                                label: "Inventory",
                                value: "Inventory",
                                helpText:
                                  "TikTok Shop stock quantity will always be synced with Shopify inventory",
                              },
                              {
                                label: "Product Status",
                                value: "pStatus",
                                helpText:
                                  "Product will be set as Active / Inactive on TikTok Shop, following Shopify product status",
                              },
                              {
                                label: "Product Title",
                                value: "PTitle",
                              },
                              {
                                label: "Product Description",
                                value: "PDescription",
                              },
                              {
                                label: "Product Images",
                                value: "PImages",
                              },
                              {
                                label: "Price",
                                value: "Price",
                              },
                              {
                                label: "Variants",
                                value: "Variants",
                                helpText:
                                  "Adding, removing, or editing variants on Shopify will be synced and pushed to TikTok Shop",
                              },
                            ]}
                            selected={PAttributesselected}
                            onChange={handlePAttriChange}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Layout.AnnotatedSection>
              </Layout>
            </div>
            <div className="marginTop20">
              <Layout>
                <Layout.AnnotatedSection
                  id="Shipping and Warranty"
                  title="Shipping_and_Warranty"
                  description="Enter default value if your product don't have weight and dimensions, we will be used to calculate shipping fee and shipping method.">
                  <Card sectioned>
                    <div className="marginTop20">
                      <div className="margtop10">
                        <InlineGrid columns={["oneThird", "twoThirds"]}>
                          <Text> Shipping Length</Text>
                          <TextField
                            type="number"
                            placeholder="Length"
                            value={lengthValue}
                            onChange={handlelengthChange}
                            maxLength={4}
                            autoComplete="off"
                            showCharacterCount
                            prefix="cm"
                          />
                        </InlineGrid>
                      </div>
                      <div className="margtop10">
                        <InlineGrid columns={["oneThird", "twoThirds"]}>
                          <Text> Shipping Width</Text>
                          <TextField
                            type="number"
                            placeholder="Width"
                            value={WidthValue}
                            onChange={handleWidthChange}
                            maxLength={4}
                            autoComplete="off"
                            showCharacterCount
                            prefix="cm"
                          />
                        </InlineGrid>
                      </div>
                      <div className="margtop10">
                        <InlineGrid columns={["oneThird", "twoThirds"]}>
                          <Text> Shipping Height</Text>
                          <TextField
                            type="number"
                            placeholder="Height"
                            value={HeightValue}
                            onChange={handleHeightChange}
                            maxLength={4}
                            autoComplete="off"
                            showCharacterCount
                            prefix="cm"
                          />
                        </InlineGrid>
                      </div>
                      <div className="margtop10">
                        <InlineGrid columns={["oneThird", "twoThirds"]}>
                          <Text>Shipping Weight</Text>
                          <TextField
                            type="number"
                            placeholder="Weight"
                            value={weightValue}
                            onChange={handleweightChange}
                            maxLength={4}
                            autoComplete="off"
                            showCharacterCount
                            prefix="kg"
                          />
                        </InlineGrid>
                      </div>
                    </div>
                  </Card>
                </Layout.AnnotatedSection>
              </Layout>
            </div>
            <div className="marginTop20">
              <Layout>
                <Layout.AnnotatedSection
                  id="Select TikTok Shop category"
                  title="Select TikTok Shop category"
                  description="Following are Details of Connected Tiktok Shop.">
                  <Card sectioned>
                    <div className="margtop10" style={{}}>
                      {/* <SelectCategory /> */}
                      <CtmSelectCategory />
                    </div>
                  </Card>
                </Layout.AnnotatedSection>
              </Layout>
            </div>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Setting;
