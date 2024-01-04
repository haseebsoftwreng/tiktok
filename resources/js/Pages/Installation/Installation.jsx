/** @format */

import {
  InlineStack,
  Text,
  Icon,
  Grid,
  Box,
  ButtonGroup,
  Button,
  Popover,
  ActionList,
  Card,
  Layout,
} from "@shopify/polaris";
import { Checkbox, Divider } from "@shopify/polaris";

import React from "react";
import { useState, useCallback, useEffect } from "react";
import { TickSmallMinor, TickMinor } from "@shopify/polaris-icons";
import Setting from "../Setting/Setting";
import Plans from "../Plan/Plan";
import ConnectMarket from "../../Components/ConnectMarket/ConnectMarket";
import { CircleRightMajor } from "@shopify/polaris-icons";

function Installation() {
  const [nxtbtn, setnxtbtn] = useState(true);

  // Tiktok Pixel Checked
  const handleCardPixelClick = () => {
    setCheckedPixel(!checkedPixel); // Toggle the checked state on card click
    setCheckedShop(false); // Toggle the checked state on card click
    setnxtbtn(false);

    // if (nxtbtn == false) {
    //   setnxtbtn(false);
    // }

    console.log(checkedPixel, "dsf", checkedShop);
  };
  const [checkedPixel, setCheckedPixel] = useState(false);
  const handleChangePixel = useCallback(
    (newChecked) => setCheckedPixel(newChecked),
    []
  );
  // Tiktok  Shop Checked
  const handleCardShopClick = () => {
    setCheckedShop(!checkedShop); // Toggle the checked state on card click
    setCheckedPixel(false); // Toggle the checked state on card click
    setnxtbtn(false);
    // if (nxtbtn == false) {
    //   setnxtbtn(false);
    // }
  };
  const [checkedShop, setCheckedShop] = useState(false);
  const handleChangeShop = useCallback(
    (newChecked) => setCheckedShop(newChecked),
    []
  );
  //state for steps
  const [step, setstep] = useState(1);
  if (checkedPixel == true) {
    console.log("jkhdsfk");
  }
  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    if (checkedPixel === true) {
      setstep(5);
    } else {
      if (checkedPixel == false && checkedShop == false) {
        setnxtbtn(true);
        return;
      }
      setstep(step + 1);
    }
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    if (checkedPixel === true) {
      setstep(1);
    } else {
      setstep(step - 1);
    }
  };
  // pop over
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activator = (
    <Button variant="primary" size="large" onClick={togglePopoverActive}>
      Connect TikTok Shop
    </Button>
  );
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <>
          <div className="marginTop50"></div>
          <div className="marginTop">
            <Text variant="heading3xl" alignment="center">
              How would you like to use this app? Please select your preference
            </Text>
          </div>

          <div className="marginTop50">
            <div className="marginTop20"></div>
            <InlineStack className="inline">
              <div
                onClick={handleCardPixelClick}
                className={checkedPixel ? "ctm_shadow" : ""}
                style={{ width: "45%" }}>
                <Card>
                  <div style={{ display: "flex" }}>
                    <Checkbox
                      checked={checkedPixel}
                      onChange={handleChangePixel}
                    />
                    <div style={{ margin: "auto" }}>
                      <Text variant="heading2xl">TikTok Pixel</Text>
                    </div>
                  </div>

                  <div className="">
                    <div
                      className="marginTop20"
                      style={{ textAlign: "center" }}>
                      <img
                        style={{ width: "90px" }}
                        src="src/Images/tiktokpixel.png"
                        className="step-img"></img>
                    </div>
                  </div>
                  <Divider />
                  <div className="margtop10">
                    {/* <InlineGrid columns={{ xs: 2, sm: 2 }}> */}
                    <div>
                      <Box as="div" className="margtop10">
                        <div className="flex-inline">
                          <div>
                            <Icon source={TickSmallMinor} tone="base" />
                          </div>
                          <Text fontWeight="medium" variant="bodyLg" as="p">
                            Install Tiktok Pixel
                          </Text>
                        </div>
                      </Box>
                      <Box as="div" className="margtop10"></Box>
                      <div className="flex-inline">
                        <div>
                          <Icon source={TickSmallMinor} tone="base" />
                        </div>
                        <Text fontWeight="medium" variant="bodyLg" as="p">
                          Unlimited pixel events
                        </Text>
                      </div>
                      <Box as="div" className="margtop10"></Box>
                      <div className="flex-inline">
                        <div>
                          <Icon source={TickSmallMinor} tone="base" />
                        </div>
                        <Text fontWeight="medium" variant="bodyLg" as="p">
                          Server side pixel support
                        </Text>
                      </div>
                      <Box as="div" className="margtop10"></Box>
                      <div className="flex-inline">
                        <div>
                          <Icon source={TickSmallMinor} tone="base" />
                        </div>
                        <Text fontWeight="medium" variant="bodyLg" as="p">
                          Track sales and conversions
                        </Text>
                      </div>
                    </div>
                    {/* </InlineGrid> */}
                  </div>
                </Card>
              </div>
              <span className="Polaris-Icon Polaris-Icon--toneBase Polaris-Icon--applyColor">
                <span>
                  <strong style={{ color: "#4a4a4a" }}> OR</strong>
                </span>
              </span>
              <div
                onClick={handleCardShopClick}
                style={{ width: "45%", height: "100%" }}
                className={checkedShop ? "ctm_shadow" : ""}>
                <Card>
                  <div style={{ display: "flex" }}>
                    <Checkbox
                      checked={checkedShop}
                      onChange={handleChangeShop}
                    />
                    <div style={{ margin: "auto" }}>
                      <Text variant="heading2xl">TikTok Shop</Text>
                    </div>
                  </div>

                  <div className="">
                    <div
                      className="marginTop20"
                      style={{ textAlign: "center" }}>
                      <img
                        style={{ width: "100px" }}
                        src="src/Images/tiktokshop.png"
                        className="step-img"></img>
                    </div>
                  </div>
                  <Divider />
                  <div className="margtop10">
                    {/* <InlineGrid columns={{ xs: 2, sm: 2 }}> */}
                    <div>
                      <Box as="div" className="margtop10">
                        <div className="flex-inline">
                          <div>
                            <Icon source={TickSmallMinor} tone="base" />
                          </div>
                          <Text fontWeight="medium" variant="bodyLg" as="p">
                            Connect Your Tiktok Shop
                          </Text>
                        </div>
                      </Box>
                      <Box as="div" className="margtop10"></Box>
                      <div className="flex-inline">
                        <div>
                          <Icon source={TickSmallMinor} tone="base" />
                        </div>
                        <Text fontWeight="medium" variant="bodyLg" as="p">
                          Realtime porduct sync
                        </Text>
                      </div>
                      <Box as="div" className="margtop10"></Box>
                      <div className="flex-inline">
                        <div>
                          <Icon source={TickSmallMinor} tone="base" />
                        </div>
                        <Text fontWeight="medium" variant="bodyLg" as="p">
                          Realtime order sync
                        </Text>
                      </div>
                      <Box as="div" className="margtop10"></Box>
                      <div className="flex-inline">
                        <div>
                          <Icon source={TickSmallMinor} tone="base" />
                        </div>
                        <Text fontWeight="medium" variant="bodyLg" as="p">
                          Optimize products feed
                        </Text>
                      </div>
                    </div>
                    {/* </InlineGrid> */}
                  </div>
                </Card>
              </div>
            </InlineStack>
          </div>
          <div className="marginTop80"></div>
          <Box as="div" className=" dis-center  ">
            <ButtonGroup>
              <Button disabled={nxtbtn} onClick={nextStep}>
                <span style={{ display: "flex" }}>
                  Get Started
                  <Icon source={CircleRightMajor}></Icon>
                </span>
              </Button>
            </ButtonGroup>
          </Box>
        </>
      );
    case 2:
      return (
        <>
          <div className="marginTop50">
            <InlineStack align="center">
              <div className="text-circle step-active">
                <Text>
                  <Icon source={TickMinor}></Icon>
                </Text>
              </div>
              <div className="divider-wrapper">
                <hr className="divider-line"></hr>
              </div>
              <div className="text-circle">
                <Text>2</Text>
              </div>
              <div className="divider-wrapper">
                <hr className="divider-line"></hr>
              </div>
              <div className="text-circle">
                <Text>3</Text>
              </div>
              <div className="divider-wrapper">
                <hr className="divider-line"></hr>
              </div>
              <div className="text-circle">
                <Text>4</Text>
              </div>
            </InlineStack>
          </div>
          <Box as="div" className="marginTop50">
            <Grid columns={{ xs: 1, sm: 2 }}>
              <Grid.Cell columnSpan={{ sx: 6, sm: 6 }}>
                <div className="marginTop20">
                  <img src="src/Images/tiktok.webp" className="step-img"></img>
                </div>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ sx: 6, sm: 6 }}>
                <div className="marginTop">
                  <Text variant="heading2xl">Connect TikTok Shop store</Text>
                  <Text variant="bodyLg" as="p">
                    Connect your TikTok Shop store to sync products over from
                    your eCommerce store.
                    <strong>
                      When asked for an authorization duration, we suggest
                      selecting 1 year.
                    </strong>
                  </Text>
                  <div className="margtop10"></div>
                  <Text variant="bodyLg" as="p">
                    Note: Your TikTok Shop store currency must match one of the
                    currencies you use on your Shopify store. Your currencies:
                    <strong> GBP, MXN.</strong>
                  </Text>
                  <div className="marginTop"></div>
                  <hr></hr>
                  <div className="marginTop"></div>
                  <Text>
                    TikTok Shop not available in your country/region yet?
                    Request early access
                  </Text>
                </div>
              </Grid.Cell>
            </Grid>
          </Box>
          <Box as="div" className="marginTop50 dis-Last">
            <ButtonGroup>
              <Button size="large" onClick={prevStep}>
                Previous
              </Button>
              <Popover
                active={popoverActive}
                activator={activator}
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
                preferredPosition={"above"}>
                <Box as="div" className="popover-box">
                  <Text variant="heading2xl" as="h3">
                    Select your TikTok Shop store region
                  </Text>
                  <Text>
                    This is just to ensure we meet regional data regulations.
                  </Text>
                  <ul className="listStyle connect-List">
                    <li className="connect-li">
                      <Button size="large" fullWidth onClick={nextStep}>
                        United States
                      </Button>
                    </li>
                    <li className="connect-li">
                      <Button size="large" fullWidth onClick={nextStep}>
                        Outside the US.
                      </Button>
                    </li>
                  </ul>
                </Box>
              </Popover>
            </ButtonGroup>
          </Box>
        </>
      );
    case 3:
      return (
        <>
          <div className="marginTop50">
            <InlineStack align="center">
              <div className="text-circle step-active">
                <Text>
                  <Icon source={TickMinor}></Icon>
                </Text>
              </div>
              <div className="divider-wrapper">
                <hr className="divider-line "></hr>
              </div>
              <div className="text-circle step-active">
                <Text>
                  <Icon source={TickMinor}></Icon>
                </Text>
              </div>
              <div className="divider-wrapper">
                <hr className="divider-line"></hr>
              </div>
              <div className="text-circle">
                <Text>3</Text>
              </div>
              <div className="divider-wrapper">
                <hr className="divider-line"></hr>
              </div>
              <div className="text-circle">
                <Text>4</Text>
              </div>
            </InlineStack>
          </div>
          <ConnectMarket />
          <div className="marginTop20"></div>
          <Box as="div" className=" dis-center">
            <ButtonGroup>
              <Button size="large" onClick={prevStep}>
                Previous
              </Button>
              <Button size="large" onClick={nextStep}>
                {" "}
                Next
              </Button>
            </ButtonGroup>
          </Box>
        </>
      );

    case 4:
      return (
        <>
          <div className="marginTop50">
            <InlineStack align="center">
              <div className="text-circle step-active">
                <Text>
                  <Icon source={TickMinor}></Icon>
                </Text>
              </div>
              <div className="divider-wrapper">
                <hr className="divider-line "></hr>
              </div>
              <div className="text-circle step-active">
                <Text>
                  <Icon source={TickMinor}></Icon>
                </Text>
              </div>
              <div className="divider-wrapper">
                <hr className="divider-line"></hr>
              </div>
              <div className="text-circle step-active">
                <Text>
                  <Icon source={TickMinor}></Icon>
                </Text>
              </div>
              <div className="divider-wrapper">
                <hr className="divider-line"></hr>
              </div>
              <div className="text-circle">
                <Text>4</Text>
              </div>
            </InlineStack>
          </div>
          <Setting />
          <Box as="div" className=" dis-center">
            <ButtonGroup>
              <Button size="large" onClick={prevStep}>
                Previous
              </Button>
              <Button size="large" onClick={nextStep}>
                {" "}
                Next
              </Button>
            </ButtonGroup>
          </Box>
        </>
      );

    // default case to show nothing
    default:
      return (
        <>
          {checkedPixel ? null : (
            <div className="marginTop50">
              <InlineStack align="center">
                <div className="text-circle step-active">
                  <Text>
                    <Icon source={TickMinor}></Icon>
                  </Text>
                </div>
                <div className="divider-wrapper">
                  <hr className="divider-line "></hr>
                </div>
                <div className="text-circle step-active">
                  <Text>
                    <Icon source={TickMinor}></Icon>
                  </Text>
                </div>
                <div className="divider-wrapper">
                  <hr className="divider-line"></hr>
                </div>
                <div className="text-circle step-active">
                  <Text>
                    <Icon source={TickMinor}></Icon>
                  </Text>
                </div>
                <div className="divider-wrapper">
                  <hr className="divider-line"></hr>
                </div>
                <div className="text-circle step-active">
                  <Text>
                    <Icon source={TickMinor}></Icon>
                  </Text>
                </div>
              </InlineStack>
            </div>
          )}

          <Plans />
          <Box as="div" className="marginTop50 dis-center">
            <ButtonGroup>
              <Button size="large" onClick={prevStep}>
                Previous
              </Button>
              <Button size="large">Finished</Button>
            </ButtonGroup>
          </Box>
        </>
      );
  }
}
export default Installation;
