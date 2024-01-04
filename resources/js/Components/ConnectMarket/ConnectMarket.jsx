/** @format */

import React, { useCallback, useState } from "react";
import {
  Card,
  Layout,
  Text,
  InlineGrid,
  Button,
  Popover,
  ActionList,
  OptionList,
  InlineStack,
  Icon,
} from "@shopify/polaris";
import { ExtendMajor } from "@shopify/polaris-icons";
import { CancelMinor } from "@shopify/polaris-icons";
function ConnectMarket() {
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const openSelect = useCallback(() => setShow((show) => !show), []);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      Select Shopify Market Place
    </Button>
  );
  const [selected, setSelected] = useState([]);
  console.log(selected, "selected");
  const ctmtoogle = () => {
    setSelected([]);
  };
  return (
    <>
      <div className="marginTop50">
        <Text>Explaination Text</Text>
        <div className="marginTop20"></div>
        <InlineStack className="inline">
          <div style={{ width: "45%" }}>
            <Card>
              <div>
                <Text>TIKTOK SHOP</Text>
              </div>
              <div className="margtop10">
                <Card>
                  {/* <InlineGrid columns={{ xs: 2, sm: 2 }}> */}
                  <div>
                    <Text>
                      Tiktok Shop is{" "}
                      <span className="text-bold">connected.</span>
                    </Text>
                    <Text>
                      Tiktok Shop ID :{" "}
                      <span className="text-bold">7495372796251113484</span>{" "}
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
                  {/* </InlineGrid> */}
                </Card>
              </div>
            </Card>
          </div>
          <Icon source={ExtendMajor} tone="base" />
          <div style={{ width: "45%", height: "100%" }}>
            <Card>
              <div>
                <Text>SHOPIFY MARKET PLACE</Text>
              </div>
              <div className="margtop10">
                <Card>
                  {/* <Button onClick={openSelect}> Select</Button>
                {show && ( */}
                  {selected.length == 0 ? (
                    <Popover
                      active={active}
                      activator={activator}
                      autofocusTarget="first-node"
                      onClose={toggleActive}
                      preferredPosition="below"
                      preferredAlignment="left">
                      <OptionList
                        onChange={setSelected}
                        options={[
                          {
                            value: {
                              market: "Uk_market",
                              country: "United Kingdom",
                              currency: "GBP",
                              language: "English",
                              img: "uk.webp",
                            },
                            label: (
                              <div>
                                <InlineStack gap={400}>
                                  <div>
                                    <InlineStack gap={200}>
                                      <img
                                        src="src/Images/uk.webp"
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                        }}
                                      />
                                      <div>
                                        <Text>United Kingdom</Text>
                                        <Text>Primary</Text>
                                      </div>
                                    </InlineStack>
                                  </div>
                                  <div>
                                    <Text>Currency: GBP</Text>
                                    <Text>Language: English</Text>
                                  </div>
                                </InlineStack>
                              </div>
                            ),
                          },
                          {
                            value: {
                              market: "Hunery_market",
                              country: "Hunery",
                              currency: "HF",
                              language: "Huneryian",
                              img: "hunery.png",
                            },
                            label: (
                              <div>
                                <InlineStack gap={400}>
                                  <div>
                                    <InlineStack gap={200}>
                                      <img
                                        src="src/Images/hunery.png"
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                        }}
                                      />
                                      <div>
                                        <Text>Hungary</Text>
                                        {/* <Text>Primary</Text> */}
                                      </div>
                                    </InlineStack>
                                  </div>
                                  <div>
                                    <Text>Currency: HF</Text>
                                    <Text>Language: Hunerian</Text>
                                  </div>
                                </InlineStack>
                              </div>
                            ),
                          },
                          {
                            value: {
                              market: "Solvenia_market",
                              country: "Solvenia",
                              currency: "Euro",
                              language: "Slovenian",
                              img: "uk.webp",
                            },
                            label: (
                              <div>
                                <InlineStack gap={400}>
                                  <div>
                                    <InlineStack gap={200}>
                                      <img
                                        src="src/Images/uk.webp"
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                        }}
                                      />
                                      <div>
                                        <Text>Slovenia</Text>
                                        {/* <Text>Primary</Text> */}
                                      </div>
                                    </InlineStack>
                                  </div>
                                  <div>
                                    <Text>Currency: Euro</Text>
                                    <Text>Language: English</Text>
                                  </div>
                                </InlineStack>
                              </div>
                            ),
                          },
                        ]}
                        selected={selected}
                      />
                    </Popover>
                  ) : (
                    <div>
                      <span style={{ float: "right" }}>
                        <Button size="small" onClick={ctmtoogle}>
                          <Icon source={CancelMinor} tone="base" />
                        </Button>
                      </span>
                      {selected.map((item, index) => (
                        <InlineStack key={index} gap={400}>
                          {/* <p>Market: {item.market}</p> */}
                          <div>
                            <InlineStack gap={200}>
                              <img
                                src={`src/Images/${item.img}`}
                                style={{ width: "40px", height: "40px" }}
                              />
                              <div>
                                <Text>{item.country}</Text>
                                <Text>Primary</Text>
                              </div>
                            </InlineStack>
                          </div>
                          <div>
                            <Text>Currency: {item.currency}</Text>
                            <Text>Language: {item.language}</Text>
                          </div>
                        </InlineStack>
                      ))}
                    </div>
                  )}
                  {/* )} */}
                </Card>
              </div>
            </Card>
          </div>
        </InlineStack>
      </div>
    </>
  );
}
export default ConnectMarket;
