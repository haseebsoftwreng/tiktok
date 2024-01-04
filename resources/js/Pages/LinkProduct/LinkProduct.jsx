/** @format */

import {
  Page,
  InlineGrid,
  Banner,
  Card,
  Text,
  Box,
  TextField,
  ButtonGroup,
  FormLayout,
  Select,
  Listbox,
  AutoSelection,
  Combobox,
  Grid,
  Tag,
  Button,
  Icon,
  Frame,
  ContextualSaveBar,
  Link,
  Divider,
} from "@shopify/polaris";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { ViewMajor } from "@shopify/polaris-icons";
import CircularProgressBar from "../../Components/ProgressBar/ProgressBar";
import Accordion from "../../Components/Accordion/Accordion";
import UploadImage from "../../Components/UploadImages/UploadImages";
import EditTable from "../../Components/EditTable/EditTable";
import SkeletonStructure from "../../Components/SkeletonStructure/SkeletonStructure";
import { LinkMinor } from "@shopify/polaris-icons";
export default function LinkProduct() {
  //   Basic Information Component

  const [linkcount, setLinkCount] = useState([]);

  const links = [
    {
      url: "https://cdn.shopify.com/s/files/1/0785/0062/6776/products/718xp0vleal._ac_ul1200.jpg?v=1702042878",
      title: "1 CAP FOR ADULT AND 1 CAP FOR CHILD GRANIA red",
      variant: 2,
    },
    {
      url: "https://cdn.shopify.com/s/files/1/0785/0062/6776/products/4231782262_308192035_pr.jpg?v=1702042808",
      title: "10 PCS SOCKS MODEL 9220 black and beige",
    },
    {
      url: "https://cdn.shopify.com/s/files/1/0785/0062/6776/products/11636040330_1145157712.jpg?v=1702042797",
      title: "2 in 1 SKIRT AND PANTS ALINA black",
      variant: 6,
    },
    {
      url: "https://cdn.shopify.com/s/files/1/0785/0062/6776/products/11636019860_1145157712.jpg?v=1702042801",
      title: "2 in 1 SKIRT AND PANTS ALINA blue",
      variant: 6,
    },
  ];

  useEffect(() => {
    setLinkCount(links);
  }, []);

  //   Product Name
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleTextFieldChange = useCallback((value) => {
    setTextFieldValue(value);
    setShow(true);
  }, []);

  // Api Data fetch  check
  const [test, settest] = useState(false);

  return test === true ? (
    <SkeletonStructure />
  ) : (
    <Page
      backAction={{ content: "Products", url: "Products" }}
      title="Link Products to Tiktok"
      // secondaryActions={[
      //   {
      //     content: "view on TikTok",
      //     accessibilityLabel: "Secondary action label",
      //     onAction: () => alert("  view product on TikTok"),
      //   },
      //   {
      //     content: "View On Shopify",
      //     onAction: () => alert("View on your store action"),
      //   },
      // ]}
    >
      <div className="">
        <Box as="div" className="" id="">
          <Card>
            {linkcount.map((item, index) => (
              <div
                key={index}
                className="marginTop20"
                style={{ marginBottom: "10px" }}>
                <Card>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <Box style={{ padding: "0px 20px" }}>
                        <img src={`${item.url}`} style={{ width: "60px" }} />
                      </Box>
                      <Box style={{ width: "60%" }}>
                        <Text variant="bodyLg" as="p" fontWeight="semibold">
                          {item.title}
                        </Text>
                        {item.variant > 0 ? (
                          <Text variant="bodyXs" as="p">
                            {item.variant} variants
                          </Text>
                        ) : null}
                      </Box>
                    </Box>
                    <Box>
                      <TextField
                        label={
                          <Text>
                            <strong>Tiktok's product ID </strong>
                          </Text>
                        }
                        type="Text"
                        value={textFieldValue}
                        onChange={handleTextFieldChange}
                        autoComplete="off"
                        required
                      />
                      <div style={{ marginTop: "10px" }}>
                        <Button variant="primary" fullWidth size="large">
                          <span style={{ display: "flex" }}>
                            <Text variant="bodyLg" as="p" fontWeight="medium">
                              Link
                            </Text>
                            <Icon source={LinkMinor}></Icon>
                          </span>
                        </Button>
                      </div>
                    </Box>
                  </Box>
                  <Box style={{ marginTop: "10px" }}>
                    {/* <Banner tone="critical">
                      <p>
                        Use your finance report to get detailed information
                        about your business.{" "}
                      </p>
                    </Banner> */}
                  </Box>
                </Card>
                <div className="marginTop20">{/* <Divider /> */}</div>
              </div>
            ))}
          </Card>
        </Box>
      </div>
      {/* </InlineGrid> */}
    </Page>
  );
}
