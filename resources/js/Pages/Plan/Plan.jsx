/** @format */

import {
  Page,
  Grid,
  Card,
  Text,
  Divider,
  Button,
  Icon,
  InlineStack,
  Box,
  ButtonGroup,
  TextField,
  InlineGrid,
  Modal,
  Select,
} from "@shopify/polaris";
import { TickSmallMinor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

function Plans() {
  const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);

  const handleFirstButtonClick = useCallback(() => {
    if (isFirstButtonActive) return;
    setIsFirstButtonActive(true);
  }, [isFirstButtonActive]);

  const handleSecondButtonClick = useCallback(() => {
    if (!isFirstButtonActive) return;
    setIsFirstButtonActive(false);
  }, [isFirstButtonActive]);

  // Discount
  const [discount, setDiscount] = useState("");

  const handlediscountChange = useCallback(
    (newValue) => setDiscount(newValue),
    []
  );
  // Modal
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Apply Discount</Button>;

  //   order select option
  const [EMonthselected, setEMonthselected] = useState("18");

  const handleEMonthselectedChange = useCallback(
    (value) => setEMonthselected(value),
    []
  );

  const EMonthoptions = [
    { label: "100", value: "18" },
    { label: "300", value: "35" },
    { label: "500", value: "59" },
    { label: "1000", value: "119" },
    { label: "1500", value: "179" },
    { label: "2000", value: "239" },
    { label: "2500", value: "319" },
    { label: "3000", value: "379" },
    { label: "3500", value: "419" },
    { label: "4000", value: "479" },
  ];

  // Pro Orders Values

  const [PMonthselected, setPMonthselected] = useState("119");

  const handlePMonthselectedChange = useCallback(
    (value) => setPMonthselected(value),
    []
  );

  const PMonthoptions = [
    { label: "500", value: "119" },
    { label: "1000", value: "179" },
    { label: "1500", value: "59" },
    { label: "2000", value: "239" },
    { label: "2500", value: "299" },
    { label: "3000", value: "359" },
    { label: "3500", value: "419" },
    { label: "4000", value: "479" },
    { label: "4500", value: "539" },
    { label: "5000", value: "599" },
  ];

  // Pro Orders Values

  const [EPMonthselected, setEPMonthselected] = useState("219");

  const handleEPMonthselectedChange = useCallback(
    (value) => setEPMonthselected(value),
    []
  );

  const EPMonthoptions = [
    { label: "500", value: "219" },
    { label: "1000", value: "279" },
    { label: "1500", value: "359" },
    { label: "2000", value: "379" },
    { label: "2500", value: "419" },
    { label: "3000", value: "459" },
    { label: "3500", value: "499" },
    { label: "4000", value: "579" },
    { label: "4500", value: "639" },
    { label: "5000", value: "699" },
  ];

  //   order select option  Yearly
  const [EYearlyselected, setEYearlyselected] = useState("18");

  const handleEYearlyselectedChange = useCallback(
    (value) => setEYearlyselected(value),
    []
  );

  const EYearlyoptions = [
    { label: "100", value: "18" },
    { label: "300", value: "35" },
    { label: "500", value: "59" },
    { label: "1000", value: "119" },
    { label: "1500", value: "179" },
    { label: "2000", value: "239" },
    { label: "2500", value: "319" },
    { label: "3000", value: "379" },
    { label: "3500", value: "419" },
    { label: "4000", value: "479" },
  ];

  // Pro Orders Values Yearly

  const [PYearlyselected, setPYearlyselected] = useState("119");

  const handlePYearlyselectedChange = useCallback(
    (value) => setPYearlyselected(value),
    []
  );

  const PYearlyoptions = [
    { label: "500", value: "119" },
    { label: "1000", value: "179" },
    { label: "1500", value: "59" },
    { label: "2000", value: "239" },
    { label: "2500", value: "299" },
    { label: "3000", value: "359" },
    { label: "3500", value: "419" },
    { label: "4000", value: "479" },
    { label: "4500", value: "539" },
    { label: "5000", value: "599" },
  ];

  //  Enterprise Pro Orders Values for yearly

  const [EPYearlyselected, setEPYearlyselected] = useState("219");

  const handleEPYearlyselectedChange = useCallback(
    (value) => setEPYearlyselected(value),
    []
  );

  const EPYearlyoptions = [
    { label: "500", value: "219" },
    { label: "1000", value: "279" },
    { label: "1500", value: "359" },
    { label: "2000", value: "379" },
    { label: "2500", value: "419" },
    { label: "3000", value: "459" },
    { label: "3500", value: "499" },
    { label: "4000", value: "579" },
    { label: "4500", value: "639" },
    { label: "5000", value: "699" },
  ];
  // Api Data fetch  check
  const [test, settest] = useState(false);
  return test === true ? (
    <SkeletonStructure />
  ) : (
    <Page title="Plans">
      <div className="margtop10">
        <InlineGrid columns={["twoThirds", "oneThird"]}>
          <Text></Text>
          <InlineStack gap={200}>
            <TextField
              value={discount}
              onChange={handlediscountChange}
              autoComplete="off"
              placeholder="Apply Discount "
            />
            <Button>Apply Discount</Button>
          </InlineStack>
        </InlineGrid>
      </div>
      <div className="dis-center margtop10">
        <ButtonGroup variant="segmented">
          <Button
            pressed={isFirstButtonActive}
            onClick={handleFirstButtonClick}>
            Billed Monthly
          </Button>
          <Button
            pressed={!isFirstButtonActive}
            onClick={handleSecondButtonClick}>
            Billed Annually
          </Button>
        </ButtonGroup>
      </div>
      <div className="margtop10"></div>
      {isFirstButtonActive === true ? (
        <>
          <Grid columns={{ xs: 1 }}>
            <Grid.Cell
              columnSpan={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}
              style={{ backgroundColor: "#ffff" }}>
              <div className="plan-Strach">
                <Card title="Hybrid Plan" sectioned padding="400">
                  <Text variant="bodyLg" as="p">
                    Essentials
                  </Text>
                  <Text variant="headingXl" as="h4">
                    ${EMonthselected}/Monthly
                  </Text>
                  <Text variant="bodyLg" as="p">
                    Key features and integrations
                  </Text>
                  <div className="marginTop20">
                    <Divider />
                  </div>
                  <Box as="div" className="margtop10 inline">
                    <Select
                      label="TikTok Shop orders"
                      labelInline
                      options={EMonthoptions}
                      onChange={handleEMonthselectedChange}
                      value={EMonthselected}
                    />
                  </Box>
                  <Box as="div" className="margtop10">
                    <div className="flex-inline">
                      <div>
                        <Icon source={TickSmallMinor} tone="base" />
                      </div>
                      <Text>Connect your eCommerce store</Text>
                    </div>
                  </Box>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Bulk map products to TikTok Shop categories</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>List products on TikTok Shop</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Manage orders on your eCommerce store</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Sync pricing and inventory to TikTok Shop</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Bulk edit product information</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Auto-sync product details</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Order management dashboard</Text>
                  </div>
                  <Box as="div" className="marginTop20">
                    <Divider />
                  </Box>
                  <Box as="div" className="dis-center">
                    <Button size="large">Start Free Trials</Button>
                  </Box>
                </Card>
              </div>
            </Grid.Cell>
            <Grid.Cell
              columnSpan={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}
              style={{ backgroundColor: "#ffff" }}>
              <div className="plan-Strach">
                <Card title="Hybrid Plan" sectioned padding="400">
                  <Text variant="bodyLg" as="p">
                    Pro Plan
                  </Text>
                  <Text variant="headingXl" as="h4">
                    ${PMonthselected}/Monthly
                  </Text>
                  <Text variant="bodyLg" as="p">
                    Streamline your sales process
                  </Text>
                  <div className="marginTop20">
                    <Divider />
                  </div>
                  <Box as="div" className="margtop10 inline">
                    <Select
                      label="TikTok Shop orders"
                      labelInline
                      options={PMonthoptions}
                      onChange={handlePMonthselectedChange}
                      value={PMonthselected}
                    />
                  </Box>
                  <Box as="div" className="margtop10">
                    <div className="flex-inline">
                      <div>
                        <Icon source={TickSmallMinor} tone="base" />
                      </div>
                      <Text>Filter products in category mapping</Text>
                    </div>
                  </Box>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Use non-default currency to connect store</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Price and pricing rule synchronization</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Auto-hold orders in case of cancellation</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Set inventory sync rules</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Customize order number format</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Sync returns and refunds</Text>
                  </div>
                  <Box as="div" className="marginTop20">
                    <Divider />
                  </Box>
                  <Box as="div" className="dis-center">
                    <Button size="large">Start Free Trials</Button>
                  </Box>
                </Card>
              </div>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <div className="plan-Strach">
                <Card title="Hybrid Plan" sectioned padding="400">
                  <Text variant="bodyLg" as="p">
                    Enterprise
                  </Text>
                  <Text variant="headingXl" as="h4">
                    ${EPMonthselected}/Monthly
                  </Text>
                  <Text variant="bodyLg" as="p">
                    Full customization and support
                  </Text>
                  <div className="marginTop20">
                    <Divider />
                  </div>
                  <Box as="div" className="margtop10 inline">
                    <Select
                      label="TikTok Shop orders"
                      labelInline
                      options={EPMonthoptions}
                      onChange={handleEPMonthselectedChange}
                      value={EPMonthselected}
                    />
                  </Box>
                  <Box as="div" className="margtop10">
                    <div className="flex-inline">
                      <div>
                        <Icon source={TickSmallMinor} tone="base" />
                      </div>
                      <Text>Custom integrations</Text>
                    </div>
                  </Box>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>External single sign-on (SSO)</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Customize product import rules</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Dedicated customer success manager</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Dedicated onboarding manager</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Silver support plan</Text>
                  </div>
                  <Box as="div" className="marginTop20">
                    <Divider />
                  </Box>
                  <Box as="div" className="dis-center">
                    <Button size="large">Start Free Trials</Button>
                  </Box>
                </Card>
              </div>
            </Grid.Cell>
          </Grid>
        </>
      ) : (
        <>
          <Grid columns={{ xs: 1 }}>
            <Grid.Cell columnSpan={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <div className="plan-Strach">
                <Card title="Hybrid Plan" sectioned padding="400">
                  <Text variant="bodyLg" as="p">
                    Essentials
                  </Text>
                  <Text variant="headingXl" as="h4">
                    ${EYearlyselected}/Yearly
                  </Text>
                  <Text variant="bodyLg" as="p">
                    Key features and integrations
                  </Text>
                  <div className="marginTop20">
                    <Divider />
                  </div>
                  <Box as="div" className="margtop10 inline">
                    <Select
                      label="TikTok Shop orders"
                      labelInline
                      options={EYearlyoptions}
                      onChange={handleEYearlyselectedChange}
                      value={EYearlyselected}
                    />
                  </Box>
                  <Box as="div" className="margtop10">
                    <div className="flex-inline">
                      <div>
                        <Icon source={TickSmallMinor} tone="base" />
                      </div>
                      <Text>Connect your eCommerce store</Text>
                    </div>
                  </Box>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Bulk map products to TikTok Shop categories</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>List products on TikTok Shop</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Manage orders on your eCommerce store</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Sync pricing and inventory to TikTok Shop</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Bulk edit product information</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Auto-sync product details</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Order management dashboard</Text>
                  </div>
                  <Box as="div" className="marginTop20">
                    <Divider />
                  </Box>
                  <Box as="div" className="dis-center">
                    <Button size="large">Start Free Trials</Button>
                  </Box>
                </Card>
              </div>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <div className="plan-Strach">
                <Card title="Hybrid Plan" sectioned padding="400">
                  <Text variant="bodyLg" as="p">
                    Pro Plan
                  </Text>
                  <Text variant="headingXl" as="h4">
                    ${PYearlyselected}/Yearly
                  </Text>
                  <Text variant="bodyLg" as="p">
                    Streamline your sales process
                  </Text>
                  <div className="marginTop20">
                    <Divider />
                  </div>
                  <Box as="div" className="margtop10 inline">
                    <Select
                      label="TikTok Shop orders"
                      labelInline
                      options={PYearlyoptions}
                      onChange={handlePYearlyselectedChange}
                      value={PYearlyselected}
                    />
                  </Box>
                  <Box as="div" className="margtop10">
                    <div className="flex-inline">
                      <div>
                        <Icon source={TickSmallMinor} tone="base" />
                      </div>
                      <Text>Filter products in category mapping</Text>
                    </div>
                  </Box>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Use non-default currency to connect store</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Price and pricing rule synchronization</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Auto-hold orders in case of cancellation</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Set inventory sync rules</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Customize order number format</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Sync returns and refunds</Text>
                  </div>
                  <Box as="div" className="marginTop20">
                    <Divider />
                  </Box>
                  <Box as="div" className="dis-center">
                    <Button size="large">Start Free Trials</Button>
                  </Box>
                </Card>
              </div>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }}>
              <div className="plan-Strach">
                <Card title="Hybrid Plan" sectioned padding="400">
                  <Text variant="bodyLg" as="p">
                    Enterprise
                  </Text>
                  <Text variant="headingXl" as="h4">
                    ${EPYearlyselected}/Yearly
                  </Text>
                  <Text variant="bodyLg" as="p">
                    Full customization and support
                  </Text>
                  <div className="marginTop20">
                    <Divider />
                  </div>
                  <Box as="div" className="margtop10 inline">
                    <Select
                      label="TikTok Shop orders"
                      labelInline
                      options={EPYearlyoptions}
                      onChange={handleEPYearlyselectedChange}
                      value={EPYearlyselected}
                    />
                  </Box>
                  <Box as="div" className="margtop10">
                    <div className="flex-inline">
                      <div>
                        <Icon source={TickSmallMinor} tone="base" />
                      </div>
                      <Text>Custom integrations</Text>
                    </div>
                  </Box>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>External single sign-on (SSO)</Text>
                  </div>

                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Customize product import rules</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Dedicated customer success manager</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Dedicated onboarding manager</Text>
                  </div>
                  <Box as="div" className="margtop10"></Box>
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Silver support plan</Text>
                  </div>
                  <Box as="div" className="marginTop20">
                    <Divider />
                  </Box>
                  <Box as="div" className="dis-center">
                    <Button size="large">Start Free Trials</Button>
                  </Box>
                </Card>
              </div>
            </Grid.Cell>
          </Grid>
        </>
      )}
      <div className="marginTop">
        <Grid columns={{ xs: 1 }}>
          <Grid.Cell
            columnSpan={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}
            style={{ backgroundColor: "#ffff" }}>
            <div className="plan-Strach">
              <Card title="Hybrid Plan" sectioned padding="400">
                <Text variant="headingXl" as="h4">
                  Free
                </Text>
                <Text variant="bodyLg" as="p">
                  Key features and integrations
                </Text>
                <div className="marginTop20">
                  <Divider />
                </div>
                <Box as="div" className="margtop10">
                  <div className="flex-inline">
                    <div>
                      <Icon source={TickSmallMinor} tone="base" />
                    </div>
                    <Text>Connect your eCommerce store</Text>
                  </div>
                </Box>
                <Box as="div" className="margtop10"></Box>
                <div className="flex-inline">
                  <div>
                    <Icon source={TickSmallMinor} tone="base" />
                  </div>
                  <Text>Bulk map products to TikTok Shop categories</Text>
                </div>
                <Box as="div" className="margtop10"></Box>
                <div className="flex-inline">
                  <div>
                    <Icon source={TickSmallMinor} tone="base" />
                  </div>
                  <Text>List products on TikTok Shop</Text>
                </div>
                <Box as="div" className="margtop10"></Box>
                <div className="flex-inline">
                  <div>
                    <Icon source={TickSmallMinor} tone="base" />
                  </div>
                  <Text>Manage orders on your eCommerce store</Text>
                </div>
                <Box as="div" className="margtop10"></Box>
                <div className="flex-inline">
                  <div>
                    <Icon source={TickSmallMinor} tone="base" />
                  </div>
                  <Text>Sync pricing and inventory to TikTok Shop</Text>
                </div>
                <Box as="div" className="margtop10"></Box>
                <div className="flex-inline">
                  <div>
                    <Icon source={TickSmallMinor} tone="base" />
                  </div>
                  <Text>Bulk edit product information</Text>
                </div>
                <Box as="div" className="marginTop20">
                  <Divider />
                </Box>
                <Box as="div" className="dis-center">
                  <Button size="large">Start Free Trials</Button>
                </Box>
              </Card>
            </div>
          </Grid.Cell>
        </Grid>
      </div>
    </Page>
  );
}
export default Plans;
