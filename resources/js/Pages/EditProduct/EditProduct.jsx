/** @format */

import {
  Page,
  InlineGrid,
  Card,
  Text,
  Box,
  TextField,
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
} from "@shopify/polaris";
import { Banner, List } from "@shopify/polaris";
import React, { useState, useCallback, useMemo } from "react";
import { ViewMajor } from "@shopify/polaris-icons";
import CircularProgressBar from "../../Components/ProgressBar/ProgressBar";
import Accordion from "../../Components/Accordion/Accordion";
import UploadImage from "../../Components/UploadImages/UploadImages";
import EditTable from "../../Components/EditTable/EditTable";
import SkeletonStructure from "../../Components/SkeletonStructure/SkeletonStructure";

function EditProduct() {
  const accordionItems = [
    {
      title: "Basic information",
      content: (
        <div>
          <Text>Brand</Text>
          <ul>
            <li>Missing Brand Information</li>
          </ul>
        </div>
      ),
      hash: "BasicInformation",
    },
    {
      title: "Media",
      content: (
        <div>
          <Text>Brand</Text>
          <ul>
            <li>Missing Brand Information</li>
          </ul>
        </div>
      ),
      hash: "Media",
    },
    {
      title: "Product Derails",
      content: (
        <div>
          <Text>Brand</Text>
          <ul>
            <li>Missing Brand Information</li>
          </ul>
        </div>
      ),
      hash: "BasicInformation",
    },
    {
      title: "Sale Information",
      content: (
        <div>
          <Text>Brand</Text>
          <ul>
            <li>Missing Brand Information</li>
          </ul>
        </div>
      ),
      hash: "SaleInformation",
    },
    {
      title: "Shipping",
      content: (
        <div>
          <Text>Brand</Text>
          <ul>
            <li>Missing Brand Information</li>
          </ul>
        </div>
      ),
      hash: "Shipping",
    },
  ];

  //   Basic Information Component

  //   Product Name
  const [textFieldValue, setTextFieldValue] = useState(
    "Car Hook and Phone Holder 2 in 1"
  );

  const handleTextFieldChange = useCallback((value) => {
    setTextFieldValue(value);
    setShow(true);
  }, []);

  //   Product Description
  const [desText, setdesText] = useState(
    "Car Hook and Phone Holder 2 in 1 Not only hang items on the car hold, but you can also place a mobile phone to prevent children on the road from disturbing the driver.      Awesome Design-Silicone and Lock, the contact"
  );
  const handleDesChange = useCallback((value) => {
    setdesText(value);
    setShow(true);
  }, []);
  // Select Modal
  const [ModalText, setModalTex] = useState("");
  const handleModalChange = useCallback((value) => {
    setModalTex(value);
    setShow(true);
  }, []);
  // Select Warenty
  const [selected, setSelected] = useState("Select Warranty Type");

  const handleSelectChange = useCallback((value) => {
    setSelected(value);
    setShow(true);
  }, []);

  const options = [
    { label: "Supplier Warranty", value: "SupplierWarranty" },
    { label: "Manufacturer Warrenty", value: "ManufacturerWarrenty" },
    { label: "International Warranty", value: "InternationalWarranty" },
    { label: "No Warranty", value: "NoWarranty" },
  ];

  // Material Selection Start here
  const [selectedTags, setSelectedTags] = useState([]);
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleActiveOptionChange = useCallback(
    (activeOption) => {
      const activeOptionIsAction = activeOption === value;

      if (!activeOptionIsAction && !selectedTags.includes(activeOption)) {
        setSuggestion(activeOption);
        setShow(true);
      } else {
        setSuggestion("");
      }
    },
    [value, selectedTags]
  );
  const updateSelection = useCallback(
    (selected) => {
      const nextSelectedTags = new Set([...selectedTags]);

      if (nextSelectedTags.has(selected)) {
        nextSelectedTags.delete(selected);
      } else {
        nextSelectedTags.add(selected);
      }
      setSelectedTags([...nextSelectedTags]);
      setShow(true);
      setValue("");
      setSuggestion("");
    },
    [selectedTags]
  );

  const removeTag = useCallback(
    (tag) => () => {
      updateSelection(tag);
      setShow(true);
    },
    [updateSelection]
  );

  const getAllTags = useCallback(() => {
    const savedTags = ["Rustic", "Antique", "Vinyl", "Vintage", "Refurbished"];
    return [...new Set([...savedTags, ...selectedTags].sort())];
  }, [selectedTags]);

  const formatOptionText = useCallback(
    (option) => {
      const trimValue = value.trim().toLocaleLowerCase();
      const matchIndex = option.toLocaleLowerCase().indexOf(trimValue);

      if (!value || matchIndex === -1) return option;

      const start = option.slice(0, matchIndex);
      const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
      const end = option.slice(matchIndex + trimValue.length, option.length);

      return (
        <p>
          {start}
          <Text fontWeight="bold" as="span">
            {highlight}
          </Text>
          {end}
        </p>
      );
    },
    [value]
  );

  const options1 = useMemo(() => {
    let list;
    const allTags = getAllTags();
    const filterRegex = new RegExp(value, "i");

    if (value) {
      list = allTags.filter((tag) => tag.match(filterRegex));
    } else {
      list = allTags;
    }

    return [...list];
  }, [value, getAllTags]);

  const verticalContentMarkup =
    selectedTags.length > 0 ? (
      <Card spacing="extraTight" alignment="center">
        {selectedTags.map((tag) => (
          <Tag key={`option-${tag}`} onRemove={removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </Card>
    ) : null;

  const optionMarkup =
    options1.length > 0
      ? options1.map((option) => {
          return (
            <Listbox.Option
              key={option}
              value={option}
              selected={selectedTags.includes(option)}
              accessibilityLabel={option}>
              <Listbox.TextOption selected={selectedTags.includes(option)}>
                {formatOptionText(option)}
              </Listbox.TextOption>
            </Listbox.Option>
          );
        })
      : null;

  const noResults = value && !getAllTags().includes(value);

  const actionMarkup = noResults ? (
    <Listbox.Action value={value}>{`Add "${value}"`}</Listbox.Action>
  ) : null;

  const emptyStateMarkup = optionMarkup ? null : (
    <EmptySearchResult
      title=""
      description={`No tags found matching "${value}"`}
    />
  );

  const listboxMarkup =
    optionMarkup || actionMarkup || emptyStateMarkup ? (
      <Listbox
        autoSelection={AutoSelection.None}
        onSelect={updateSelection}
        onActiveOptionChange={handleActiveOptionChange}>
        {actionMarkup}
        {optionMarkup}
      </Listbox>
    ) : null;

  //  Material selection end

  //   Shippment
  // For length
  const [lengthValue, setlengthValue] = useState("1");
  const handlelengthChange = useCallback((value) => {
    setlengthValue(value);
    setShow(true);
  }, []);
  // For weidth
  const [WidthValue, setWidthhValue] = useState("1");
  const handleWidthChange = useCallback((value) => {
    setWidthhValue(value);
    setShow(true);
  }, []);
  // For Height
  const [HeightValue, setHeightValue] = useState("1");
  const handleHeightChange = useCallback((value) => {
    setHeightValue(value);
    setShow(true);
  }, []);

  //  handleweightChange
  // For Weight
  const [weightValue, setweightValue] = useState("1");
  const handleweightChange = useCallback((value) => {
    setweightValue(value);
    setShow(true);
  }, []);

  // Api Data fetch  check
  const [test, settest] = useState(false);

  // display the save and discard banner
  const [show, setShow] = useState(false);
  return test === true ? (
    <SkeletonStructure />
  ) : (
    <Page
      backAction={{ content: "Products", url: "Products" }}
      title="Edit TikTok Products"
      secondaryActions={[
        {
          content: "view on TikTok",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("  view product on TikTok"),
        },
        {
          content: "View On Shopify",
          onAction: () => alert("View on your store action"),
        },
      ]}>
      <Banner
        title="Some of your product variants are missing weights"
        tone="warning"
        action={{ content: "Edit variant weights", url: "" }}
        secondaryAction={{ content: "Learn more", url: "" }}>
        <List>
          <List.Item>
            The name of the city you’re shipping to has characters that aren’t
            allowed. City name can only include spaces and hyphens.
          </List.Item>
        </List>
        <List>
          <List.Item>
            The name of the city you’re shipping to has characters that aren’t
            allowed. City name can only include spaces and hyphens.
          </List.Item>
        </List>
        <List>
          <List.Item>
            The name of the city you’re shipping to has characters that aren’t
            allowed. City name can only include spaces and hyphens.
          </List.Item>
        </List>
      </Banner>
      <div className="FullBox marginTop20">
        <div className="colOne">
          <Box as="div" className="firstCol">
            <Card>
              <Text variant="headingLg">Suggestions</Text>
              <InlineGrid columns={["twoThirds", "oneThird"]}>
                <div>
                  <Text>
                    Check how to improve your product information.{" "}
                    <a>Learn More</a>
                  </Text>
                </div>
                <div>
                  <CircularProgressBar />
                </div>
              </InlineGrid>
              <Accordion items={accordionItems} />
            </Card>
          </Box>
        </div>
        <div className="second-col">
          {/* <Scrollable  style={{height: '100vh'}}> */}
          <Box as="div">
            <Box as="div" className="" id="BasicInformation">
              <Card>
                <Text variant="headingXl" as="h2">
                  Basic Information
                </Text>
                <div className="marginTop20">
                  <TextField
                    label={
                      <Text>
                        <strong>Product Name</strong>
                        <br></br>Use between 25-255 characters to describe your
                        product. The title is shown prominently in Tiktok Seller
                        Center.
                      </Text>
                    }
                    type="Text"
                    value={textFieldValue}
                    onChange={handleTextFieldChange}
                    maxLength={225}
                    autoComplete="off"
                    showCharacterCount
                    required
                  />
                </div>
                <div className="marginTop20">
                  <TextField
                    label={
                      <Text>
                        <strong>Description</strong>
                        <br></br>Describe your product in detail. Try to be as
                        descriptive as possible and have a character length
                        between 2000-5000.Maximum 10000 characters.
                      </Text>
                    }
                    type="Text"
                    value={desText}
                    onChange={handleDesChange}
                    multiline={20}
                    maxLength={10000}
                    showCharacterCount
                    required
                  />
                </div>
                <div className="marginTop20">
                  <Text>
                    <strong>Product Attributes</strong>
                    <br></br>These fields help Tiktk to identify your product.
                  </Text>
                  <div className="margtop10">
                    <FormLayout>
                      <FormLayout.Group condensed>
                        <Select
                          label={<Text>Warranty Type (Optional)</Text>}
                          options={options}
                          onChange={handleSelectChange}
                          value={selected}
                          placeholder="Select Warranty"
                        />
                        <TextField
                          label={<Text>Compatible Models (Optional)</Text>}
                          type="Text"
                          value={ModalText}
                          onChange={handleModalChange}
                          maxLength={225}
                          showCharacterCount
                        />
                        <Combobox
                          allowMultiple
                          activator={
                            <Combobox.TextField
                              autoComplete="off"
                              label="Material(Optional)"
                              value={value}
                              suggestion={suggestion}
                              placeholder="Material"
                              verticalContent={verticalContentMarkup}
                              onChange={setValue}
                            />
                          }>
                          {listboxMarkup}
                        </Combobox>
                      </FormLayout.Group>
                    </FormLayout>
                  </div>
                </div>
              </Card>
            </Box>
            <Box as="div" className="marginTop20" id="Media">
              <Card>
                <Text variant="headingXl" as="h2">
                  Media
                </Text>
                <Text>
                  <strong>Product Images</strong>
                </Text>
                <Text>
                  Tiktok Seller Center allows upto 9 images to upload.
                </Text>
                <div className="marginTop20">
                  <div>
                    <InlineGrid
                      columns={2}
                      gap={200}
                      style={{ position: "relative" }}>
                      <UploadImage pic={"src/Images/img1.webp"} />
                      <div>
                        <InlineGrid columns={2} gap={200}>
                          <UploadImage />
                          <UploadImage />
                        </InlineGrid>
                        <div className="margtop10"></div>
                        <InlineGrid columns={2} gap={200}>
                          <UploadImage />
                          <UploadImage />
                        </InlineGrid>
                      </div>
                    </InlineGrid>
                    <div className="margtop10"></div>
                    <InlineGrid columns={4} gap={200}>
                      <UploadImage />
                      <UploadImage />
                      <UploadImage />
                      <UploadImage />
                    </InlineGrid>
                  </div>
                  {/* <UploadImage/> */}
                </div>
              </Card>
            </Box>
            <Box as="div" className="marginTop20" id="SaleInformation">
              <Card>
                <Text variant="headingXl" as="h2">
                  Product Variaction
                </Text>
                <div className="marginTop20">
                  <Text>Product Variaction</Text>
                  <EditTable />
                </div>
              </Card>
            </Box>
            <Box as="div" className="marginTop20" id="Shipping">
              <Card>
                <Text variant="headingXl" as="h2">
                  Shipping
                </Text>
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
            </Box>
          </Box>
          {show && (
            <div style={{ height: "250px" }}>
              <Frame
                logo={{
                  width: 86,
                  contextualSaveBarSource:
                    "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
                }}>
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
        </div>
        {/* </InlineGrid> */}
      </div>
    </Page>
  );
}
export default EditProduct;
