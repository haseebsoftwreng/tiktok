/** @format */

import {
    Page,
    Badge,
    DataTable,
    ButtonGroup,
    Popover,
    OptionList,
    Card,
    ActionList,
    InlineStack,
    Link,
    Text,
    Collapsible,
    Icon,
    TextField,
    Button,
    InlineGrid,
    Modal,
    FormLayout,
    Select,
    Tabs,
    Layout,
    ChoiceList,
    Box,
    Tooltip,
} from "@shopify/polaris";
import { Tag, Autocomplete } from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import { useCallback, useMemo } from "react";
import {
    TickMinor,
    MobileCancelMajor,
    StoreMajor,
    EditMajor,
    DeleteMinor,
} from "@shopify/polaris-icons";
import {
    QuestionMarkInverseMajor,
} from "@shopify/polaris-icons";
import axioshttp from "../../../httpaxios";
function EditPixel() {
    const [selectedOptions, setSelectedOptions] = useState(["rustic"]);
    const [inputValue, setInputValue] = useState("");
    const [active, setActive] = useState(false);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("Search Here");
    // tiktok pixel name  value
    const [tikTokPixelName, setTikTokPixelName] = useState("");

    const handleTiktokPixelNameChange = useCallback(
        (value) => setTikTokPixelName(value),
        []
    );
    // tiktok pixel name  Id
    const [tikTokPixelId, setTikTokPixelId] = useState("");

    const handleTikTokPixelIdChange = useCallback(
        (value) => setTikTokPixelId(value),
        []
    );
    // tiktok Access Token
    const [tokenValue, setTokenValue] = useState("");
    const [SelectCollection, setSelectCollection] = useState("Entire Store");
    const [selected, setSelected] = useState("Entire Store");
    const [eventCode, setEventCode] = useState("");
    // const [SourceValue, setSourceValue] = useState("");
    // const [MediumValue, setMediumValue] = useState("");
    // const [CampaignValue, setCampaignValue] = useState("");
    const [optionsTag, setOptionsTag] = useState([]);
    const [optionCollections, setOptioncollection] = useState([]);
    const deselectedOptions = useMemo(
        () => [
            { value: "rustic", label: "Rustic" },
            { value: "antique", label: "Antique" },
            { value: "vinyl", label: "Vinyl" },
            { value: "vintage", label: "Vintage" },
            { value: "refurbished", label: "Refurbished" },
        ],
        []
    );
    const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);

    const handleFirstButtonClick = useCallback(() => {
        if (isFirstButtonActive) return;
        setIsFirstButtonActive(true);
    }, [isFirstButtonActive]);

    const handleSecondButtonClick = useCallback(() => {
        if (!isFirstButtonActive) return;
        setIsFirstButtonActive(false);
    }, [isFirstButtonActive]);
    const [options, setOptions] = useState(deselectedOptions);

    const updateText = useCallback(
        (value) => {
            setInputValue(value);

            if (value === "") {
                setOptions(deselectedOptions);
                return;
            }

            const filterRegex = new RegExp(value, "i");
            const resultOptions = deselectedOptions.filter((option) =>
                option.label.match(filterRegex)
            );

            setOptions(resultOptions);
        },
        [deselectedOptions]
    );

    const removeTag = useCallback(
        (tag) => () => {
            const options = [...selectedOptions];
            options.splice(options.indexOf(tag), 1);
            setSelectedOptions(options);
        },
        [selectedOptions]
    );

    const verticalContentMarkup =
        selectedOptions.length > 0 ? (
            <InlineStack spacing="extraTight" alignment="center">
                {selectedOptions.map((option) => {
                    let tagLabel = "";
                    tagLabel = option.replace("_", " ");
                    tagLabel = titleCase(tagLabel);
                    return (
                        <Tag
                            key={`option${option}`}
                            onRemove={removeTag(option)}
                        >
                            {tagLabel}
                        </Tag>
                    );
                })}
            </InlineStack>
        ) : null;

    const textField = (
        <Autocomplete.TextField
            onChange={updateText}
            label={`Select ${selected}`}
            value={inputValue}
            placeholder="Vintage, cotton, summer"
            verticalContent={verticalContentMarkup}
            autoComplete="off"
        />
    );
    function titleCase(string) {
        return string
            .toLowerCase()
            .split(" ")
            .map((word) => word.replace(word[0], word[0].toUpperCase()))
            .join("");
    }
    // end

    const toggleModal = useCallback(() => setActive((active) => !active), []);
    const showForm = useCallback(() => setShow((show) => !show), []);

    // const activator = <Button onClick={toggleModal}>Open</Button>;

    const handleChange = useCallback((newValue) => setValue(newValue), []);

    const handleTokenValueChange = useCallback(
        (value) => setTokenValue(value),
        []
    );

    const [popoverActive, setPopoverActive] = useState(false);
    const ctmoption = () => {
        console.log(selected);
    };

    const togglePopoverActive = useCallback(
        () => setPopoverActive((popoverActive) => !popoverActive),
        []
    );
    const [canActive, setCanActive] = React.useState(null);

    const toggleActive = (id) => {
        setCanActive((activeId) => (activeId !== id ? id : null));
    };

    const activator = (
        <Button fullWidth onClick={togglePopoverActive}>
            Collections
        </Button>
    );
    const btnactivator = (
        <>
            {/* <Button fullWidth onClick={togglePopoverActive} variant="primary">
        Collections
      </Button> */}
            {/* <Button
        variant="primary"
        onClick={() => toggleActive("popover1")}
        icon={ChevronDownMinor}
        accessibilityLabel="Other save actions"
      /> */}
            <Button
                fullWidth
                onClick={() => toggleActive("popover1")}
                variant="primary"
            >
                Change
            </Button>
        </>
        // <Button fullWidth onClick={togglePopoverActive} disclosure>
        //   Collections
        // </Button>
    );
    // select Area

    const handlechangesecond = useCallback((value) => {
        setSelected(value[0]);

        if (value[0] === "Collections") {
            togglePopoverActive();
            console.log("sdfjh");
        }
    }, []);

    const handleSelectTargetAreaChange = useCallback((value) => {
        setSelected(value);
        console.log(value);
        if (value === "Collections") {
            togglePopoverActive();
            console.log("sdfjh");
        }
    }, []);

    const targetArea = [
        { label: "Entire Store", value: "Entire Store" },
        { label: "Collections", value: "Collections" },
        { label: "Tags", value: "Tags" },
    ];
    // tiktok   Test Event Code

    const handleEventCodeChange = useCallback(
        (value) => setEventCode(value),
        []
    );

    // UTMS parageters
    // Source

    const handleSourceValueChange = useCallback(
        (value) => setSourceValue(value),
        []
    );

    // Medium

    const handleMediumValueChange = useCallback(
        (value) => setMediumValue(value),
        []
    );
    // Campaign

    const handleCampaignValueChange = useCallback(
        (value) => setCampaignValue(value),
        []
    );

    const [textFieldInlineToken, setTextFieldInlineToken] = useState("");
    const [showInlineToken, setshowInlineToken] = useState(false);

    const handleTextFieldChangeInlineToken = useCallback(
        (value) => setTextFieldInlineToken(value),
        []
    );


    //////////////////// Backend Functionality//////////////
    ////////////// Shop Collection//////
    const getCollections = () => {
        console.log(" iam going here ");
        axioshttp.get("/getCollections").then((res) => {
            console.log(res.data);
            setOptioncollection(res.data);
        });
    };

    //////////// Shop Tags//////////////
    const getTags = () => {
        axioshttp.get("/getTags").then((res) => {
            console.log(res.data);
            setOptionsTag(res.data.tags);
        });
    };
    const [pixels, setP_pixels] = useState([]);
    //////////////////Get Pixels/////////////////////
    const pixelsGet = () => {
        axioshttp.get("/getTikTokPixel").then((res) => {
            setP_pixels(res.data);
        });
    };
    ////////////////////Create Pixel///////////////////
    const createPixel = async () => {
        try {
            let formData = new FormData();
            console.log(tikTokPixelName);
            console.log(tikTokPixelId);
            console.log(selected);
            console.log(tokenValue);
            console.log(eventCode);
            console.log(tikTokPixelName);
            console.log(selectedOptions);

            if (
                typeof tikTokPixelName == "undefined" ||
                tikTokPixelName !== ""
            ) {
                formData.append("pixel_name", tikTokPixelName);
            }
            if (tikTokPixelId !== "") {
                formData.append("pixel_id", tikTokPixelId);
            }
            if (selected !== "") {
                formData.append("type", selected);
            }
            if (tokenValue !== "") {
                formData.append("access_token", tokenValue);
            }
            if (eventCode !== "") {
                formData.append("test_token", eventCode);
            }
            // if (SourceValue !== "") {
            //     formData.append("utm_source", SourceValue);
            // }
            // if (MediumValue !== "") {
            //     formData.append("utm_medium", MediumValue);
            // }
            // if (CampaignValue !== "") {
            //     formData.append("utm_campaign", CampaignValue);
            // }
            if (selectedOptions != null) {
                if (selected === "Tags") {
                    formData.append("tags", selectedOptions);
                } else {
                    formData.append("collections", selectedOptions);
                }
            }
            console.log(formData);
            axioshttp
                .post("/saveTiktokPixel", formData)
                .then((res) => {
                    // openNotification("bottomRight", "Error creating pixel");
                    // setInputs({ type: "Entire Store" })
                    // Setcontent(!content);
                    console.log(res.data);
                    pixelsGet();
                    navigate("/tiktok");
                })
                .catch((error) => {
                    console.error("API Error:", error);
                    openNotification("bottomRight", "Error creating pixel");
                });
        } catch (error) {
            console.error("Form Submission Error:", error);
        }
    };

    ///////////////Call When Page Render////////
    useEffect(() => {
        pixelsGet();
        getCollections();
        getTags();
        // openNotification(
        //     "bottomRight",
        //     "Pixel Created Successfully"
        // );
        // getUserPlans();
    }, []);

    const handleStatus = (pixelId) => {
        axioshttp
            .post("/updateTiktokStatus", { id: pixelId })
            .then((res) => {});
    };

    const getStatusBadge = (id, status) => (
        // <label className="switch switch-green">
        //     <input
        //         type="checkbox"
        //         defaultChecked={status == 1 ? true : false}
        //         className="switch-input"
        //         onChange={() => handleStatus(id)}
        //     />
        //     <span className="switch-label" data-on="On" data-off="Off"></span>
        //     <span className="switch-handle"></span>
        // </label>
        <ButtonGroup variant="segmented">
        <Button
            pressed={isFirstButtonActive}
            onClick={handleFirstButtonClick}
        >
            Off
        </Button>
        <Button
            pressed={!isFirstButtonActive}
            onClick={handleSecondButtonClick}
        >
            On
        </Button>
    </ButtonGroup>
    );

    const getConversionApiStatus = (access_token) => (
        <Icon tone={access_token ? "success" : "default"} source={TickMinor} />
    );

    const getTestEventIdStatus = (test_token) => (
        <Icon tone={test_token ? "success" : "default"} source={TickMinor} />
    );
    const [deletedPixelId, setDeletedPixelId] = useState("");
    const getActionsButtons = (pixelId) => (
        <InlineStack gap={100}>
            {/* <Link to={`/editTikTokPixels/${pixelId}`}>
                <Button icon={EditMajor}>Edit</Button>
            </Link> */}
            <Button onClick={() => setShow(true)} icon={EditMajor}>
                    Edit
            </Button>
            <Button onClick={() => handleDelete(pixelId)} icon={DeleteMinor}>
                Delete
            </Button>
        </InlineStack>
    );

    const handleDelete = (pixelId) => {
        toggleModal();
        setDeletedPixelId(pixelId);
    };

    async function handleDeletePixel() {
        await axioshttp
            .post("/deleteTiktokPixel", { id: deletedPixelId })
            .then(async (res) => {
                toggleModal();
                pixelsGet();
            });
        openNotification("bottomRight", "Pixel Deleted Successfully");
    }

    //////////////////// End of Backend Functionality///////

    return (
        <>
                <Page
                    backAction={{ content: "Settings", onAction: showForm }}
                    title="Create Pixel"
                >
                    <Box>
                       
                        <Layout>
                            <Layout.Section>
                                <div className="">
                                    <div>
                                        <Layout>
                                            <Layout.AnnotatedSection
                                                id="Merchant Details"
                                                title="Merchant Details"
                                                description="Following are Details of Connected Tiktok Shop."
                                            >
                                                <Card sectioned>
                                                    <InlineGrid
                                                        columns={{ xs: 2 }}
                                                    >
                                                        <div className="dis-Last"></div>
                                                    </InlineGrid>
                                                    <div className="margtop10">
                                                        <InlineGrid
                                                            columns={{ xs: 1 }}
                                                            gap={200}
                                                        >
                                                            <TextField
                                                                label={
                                                                    <InlineStack>
                                                                        <span>
                                                                            Pixel
                                                                            Name{" "}
                                                                        </span>
                                                                        <Tooltip
                                                                            content="This order has shipping labels."
                                                                            className="flex"
                                                                        >
                                                                            <Icon
                                                                                source={
                                                                                    QuestionMarkInverseMajor
                                                                                }
                                                                                tone="base"
                                                                            />
                                                                        </Tooltip>
                                                                    </InlineStack>
                                                                }
                                                                value={
                                                                    tikTokPixelName
                                                                }
                                                                type="text"
                                                                onChange={
                                                                    handleTiktokPixelNameChange
                                                                }
                                                                selectTextOnFocus
                                                                autoComplete="off"
                                                            />

                                                            <TextField
                                                                label={
                                                                    <InlineStack>
                                                                        <span>
                                                                            Pixel
                                                                            ID
                                                                        </span>
                                                                        <Tooltip
                                                                            content="This order has shipping labels."
                                                                            className="flex"
                                                                        >
                                                                            <Icon
                                                                                source={
                                                                                    QuestionMarkInverseMajor
                                                                                }
                                                                                tone="base"
                                                                            />
                                                                        </Tooltip>
                                                                    </InlineStack>
                                                                }
                                                                value={
                                                                    tikTokPixelId
                                                                }
                                                                onChange={
                                                                    handleTikTokPixelIdChange
                                                                }
                                                                selectTextOnFocus
                                                                autoComplete="off"
                                                            />
                                                            <Select
                                                                label={
                                                                    <InlineStack>
                                                                        <span>
                                                                            Target
                                                                            Area
                                                                        </span>
                                                                        <Tooltip
                                                                            content="This order has shipping labels."
                                                                            className="flex"
                                                                        >
                                                                            <Icon
                                                                                source={
                                                                                    QuestionMarkInverseMajor
                                                                                }
                                                                                tone="base"
                                                                            />
                                                                        </Tooltip>
                                                                    </InlineStack>
                                                                }
                                                                options={
                                                                    targetArea
                                                                }
                                                                onChange={
                                                                    handleSelectTargetAreaChange
                                                                }
                                                                value={selected}
                                                            />
                                                            {selected ===
                                                            "Tags" ? (
                                                                <>
                                                                    <div className="hide-scroll">
                                                                        <Autocomplete
                                                                            allowMultiple
                                                                            options={optionsTag.map(
                                                                                (
                                                                                    option,
                                                                                    index
                                                                                ) => ({
                                                                                    key: index,
                                                                                    value: option,
                                                                                    label: option,
                                                                                })
                                                                            )}
                                                                            selected={
                                                                                selectedOptions
                                                                            }
                                                                            textField={
                                                                                textField
                                                                            }
                                                                            onSelect={
                                                                                setSelectedOptions
                                                                            }
                                                                            listTitle="Suggested Tags"
                                                                        />
                                                                    </div>
                                                                </>
                                                            ) : null}
                                                            {selected ===
                                                            "Collections" ? (
                                                                <>
                                                                    <div className="hide-scroll">
                                                                        <Autocomplete
                                                                            allowMultiple
                                                                            options={optionCollections.map(
                                                                                (
                                                                                    option,
                                                                                    index
                                                                                ) => ({
                                                                                    key: index,
                                                                                    value: option.handle,
                                                                                    label: option.handle,
                                                                                })
                                                                            )}
                                                                            selected={
                                                                                selectedOptions
                                                                            }
                                                                            textField={
                                                                                textField
                                                                            }
                                                                            onSelect={
                                                                                setSelectedOptions
                                                                            }
                                                                            listTitle="Suggested Collection"
                                                                        />
                                                                    </div>
                                                                </>
                                                            ) : null}
                                                        </InlineGrid>
                                                    </div>
                                                </Card>
                                            </Layout.AnnotatedSection>
                                        </Layout>
                                    </div>
                                    <div className="marginTop20">
                                        <Layout>
                                            <Layout.AnnotatedSection
                                                id="Merchant Details"
                                                title="Merchant Details"
                                                description="Following are Details of Connected Tiktok Shop."
                                            >
                                                <Card sectioned>
                                                    <InlineGrid
                                                        columns={{ xs: 2 }}
                                                    >
                                                        <div className="dis-Last"></div>
                                                    </InlineGrid>
                                                    <div className="margtop10">
                                                        <InlineGrid
                                                            columns={{ xs: 1 }}
                                                            gap={200}
                                                        >
                                                            <TextField
                                                                label={
                                                                    <InlineStack>
                                                                        <span>
                                                                            Access
                                                                            Token
                                                                        </span>
                                                                        <Tooltip
                                                                            content="This order has shipping labels."
                                                                            className="flex"
                                                                        >
                                                                            <Icon
                                                                                source={
                                                                                    QuestionMarkInverseMajor
                                                                                }
                                                                                tone="base"
                                                                            />
                                                                        </Tooltip>
                                                                    </InlineStack>
                                                                }
                                                                value={
                                                                    tokenValue
                                                                }
                                                                type="text"
                                                                onChange={
                                                                    handleTokenValueChange
                                                                }
                                                                selectTextOnFocus
                                                                autoComplete="off"
                                                            />
                                                            <TextField
                                                                label={
                                                                    <InlineStack>
                                                                        <span>
                                                                            Test
                                                                            Event
                                                                            Code
                                                                        </span>
                                                                        <Tooltip
                                                                            content="This order has shipping labels."
                                                                            className="flex"
                                                                        >
                                                                            <Icon
                                                                                source={
                                                                                    QuestionMarkInverseMajor
                                                                                }
                                                                                tone="base"
                                                                            />
                                                                        </Tooltip>
                                                                    </InlineStack>
                                                                }
                                                                value={
                                                                    eventCode
                                                                }
                                                                onChange={
                                                                    handleEventCodeChange
                                                                }
                                                                selectTextOnFocus
                                                                autoComplete="off"
                                                            />
                                                        </InlineGrid>
                                                    </div>
                                                </Card>
                                            </Layout.AnnotatedSection>
                                        </Layout>
                                    </div>
                                </div>
                            </Layout.Section>
                        </Layout>

                        <Box as="div" className=" dis-center">
                            <div className="dis-center">
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        createPixel();
                                        showForm();
                                    }}
                                >
                                    {" "}
                                    Add Pixel
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Page>
            
        </>
    );
}
export default EditPixel;
