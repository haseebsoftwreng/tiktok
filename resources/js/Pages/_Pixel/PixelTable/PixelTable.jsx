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
    SkeletonBodyText,
    SkeletonThumbnail,
} from "@shopify/polaris";
import { ToastContainer, toast } from 'react-toastify';
import { Link,useParams  } from "react-router-dom";
import { notification } from "antd";
import { Tag, Autocomplete } from "@shopify/polaris";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
    TickMinor,
    MobileCancelMajor,
    StoreMajor,
    EditMajor,
    SimplifyMajor,
    DeleteMinor,
    MobileBackArrowMajor,
} from "@shopify/polaris-icons";
import {
    QuestionMarkInverseMajor,
    MobilePlusMajor,
} from "@shopify/polaris-icons";
import { ChevronDownMinor } from "@shopify/polaris-icons";
import axioshttp from "../../../httpaxios";
import TableSkeleton from "../../../Components/_pixelComponents/TableSkeleton";
const Context = React.createContext({ name: "Default" });

function PixelTable() {
    const [api, contextHolder] = notification.useNotification();
    const notify = () => toast("This is a toast notification !");
    // const [messageApi, contextHolder2] = message.useMessage();
    const [selectedOptions, setSelectedOptions] = useState(["rustic"]);
    const [inputValue, setInputValue] = useState("");
    const [active, setActive] = useState(false);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("Search Here");
    // tiktok pixel name  value
    const [tikTokPixelName, setTikTokPixelName] = useState("");
    const [test, settest] = useState(false);
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
    const [SourceValue, setSourceValue] = useState("");
    const [MediumValue, setMediumValue] = useState("");
    const [CampaignValue, setCampaignValue] = useState("");
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
        }
    }, []);

    const handleSelectTargetAreaChange = useCallback((value) => {
        setSelected(value);
        if (value === "Collections") {
            togglePopoverActive();
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

    const getCollections = () => {
        axioshttp.get("/getCollections").then((res) => {
            setOptioncollection(res.data);
        });
    };

    //////////// Shop Tags//////////////
    const getTags = () => {
        axioshttp.get("/getTags").then((res) => {
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

    const getPixelPage = () => {
        settest(true);
        axioshttp.get("/getTikTokPixel").then((res) => {
            setP_pixels(res.data);
            settest(false);
        });
    };
    ////////////////////Create Pixel///////////////////
    const openNotificationSuccess = (notifyText) => {
        console.log(notifyText);
        api.success({
            message: notifyText,
            placement: "bottomRight",
            duration: 2.5,
        });
    };

    const openNotificationWarning = (notifyText1) => {
        console.log('sdsdsds');
        api.warning({
            message: notifyText1,
            placement: "bottomRight",
            duration: 2.0,
        });
    };
    const contextValue = useMemo(
        () => ({
            name: "Ant Design",
        }),
        []
    );
    // const success = (d, text) => {
    //     messageApi.open({
    //         style: {
    //             position: "absolute",
    //             top: "80vh",
    //             left: "40%",
    //         },
    //         duration: 3,
    //         type: "success",
    //         content: text,
    //     });
    // };
    const createPixel = async () => {
        try {
            let formData = new FormData();
            if(typeof tikTokPixelName == "undefined" ||
            tikTokPixelName == ""){
                console.log('i am here');
                openNotificationSuccess('Pixel Name is Required');
                return
            }
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
            axioshttp
                .post("/saveTiktokPixel", formData)
                .then((res) => {
                    handleTiktokPixelNameChange("");
                    handleTikTokPixelIdChange("");
                    handleSelectTargetAreaChange("Entire Store");
                    handleTokenValueChange("");
                    handleEventCodeChange("");
                    openNotificationSuccess(
                        "Pixel Created Successfully"
                    );
                    pixelsGet();
                    
                    // navigate("/tiktok");
                })
                .catch((error) => {
                    console.error("API Error:", error);
                    openNotificationSuccess("Error creating pixel");
                });
        } catch (error) {
            console.error("Form Submission Error:", error);
        }
    };

    const handleSearchBar = (event) => {
        // if (event.key === 'Enter' || event.keyCode === 13) {
        if (value != "") {
            axioshttp
                .post("/getTiktoPixelBySearch", { string: value })
                .then((res) => {
                    setP_pixels(res.data);
                });
        } else {
            pixelsGet();
        }
        // }
    };
    ///////////////Call When Page Render////////
    useEffect(() => {
        getPixelPage();
        getCollections();
        getTags();
        // openNotificationSuccess(
        //     "bottomRight",
        //     "Pixel Created Successfully"
        // );
        // getUserPlans();
    }, []);

    const handleStatus = (pixelId) => {
        axioshttp.post("/updateTiktokStatus", { id: pixelId }).then((res) => {
            pixelsGet();
        });
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
            <Button pressed={status == false} onClick={() => handleStatus(id)}>
                Off
            </Button>
            <Button pressed={status == true} onClick={() => handleStatus(id)}>
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
            <Link to={`/pixel/edittiktokpixels/${pixelId}`}>
                <Button icon={EditMajor}>Edit</Button>
            </Link>
            {/* <Button onClick={() => setShow(true)} icon={EditMajor}>
                Edit
            </Button> */}
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
            openNotificationSuccess("Pixel Deleted Successfully");
    }

    //////////////////// End of Backend Functionality///////
    return (
        <>
            {show == false ? (
                <>
                    <div className="marginTop20">
                        <InlineGrid
                            columns={["twoThirds", "oneThird"]}
                            gap={400}
                        >
                            <TextField
                                label="Store name"
                                labelHidden
                                value={value}
                                onChange={handleChange}
                                onKeyUp={handleSearchBar}
                                autoComplete="off"
                            />
                            <Button variant="primary" onClick={showForm}>
                                Add New Pixel
                            </Button>
                        </InlineGrid>
                    </div>

                    <Card>
                        {test === true ? (
                            // <SkeletonThumbnail size="small"/>
                            <TableSkeleton/>
                        ) : (
                            <DataTable
                                columnContentTypes={[
                                    "text",
                                    "text",
                                    "text",
                                    "text",
                                    "jsx",
                                    "jsx",
                                    "jsx",
                                ]}
                                headings={[
                                    "Status",
                                    "Pixel Name",
                                    "Pixel ID",
                                    "Target Area",
                                    "Server Side",
                                    "Test Events",
                                    "Actions",
                                ]}
                                rows={pixels.map((pixel) => [
                                    getStatusBadge(pixel.id, pixel.status),
                                    pixel.pixel_name,
                                    pixel.pixel_id,
                                    pixel.type,
                                    getConversionApiStatus(pixel.access_token),
                                    getTestEventIdStatus(pixel.test_token),
                                    getActionsButtons(pixel.id),
                                ])}
                                pagination={{
                                    hasNext: true,
                                    onNext: () => {},
                                }}
                                footerContent={`Showing ${pixels.length} of ${pixels.length} results`}
                            />
                        )}
                    </Card>
                    <Context.Provider value={contextValue}>
                        {contextHolder}
                    </Context.Provider>
                    <Modal
                        // activator={activator}
                        open={active}
                        onClose={toggleModal}
                        title="Delete"
                        primaryAction={{
                            destructive: true,
                            content: "Delete",
                            onAction: handleDeletePixel,
                        }}
                        secondaryActions={[
                            {
                                content: "Cancel",
                                onAction: toggleModal,
                            },
                        ]}
                    >
                        <Modal.Section>
                            Are you sure you want to delete this pixel?
                        </Modal.Section>
                    </Modal>
                </>
            ) : (
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
                                                                           content="Pixel Name is Required."
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
                                                                required
                                                            />

                                                            <TextField
                                                                label={
                                                                    <InlineStack>
                                                                        <span>
                                                                            Pixel
                                                                            ID
                                                                        </span>
                                                                        <Tooltip
                                                                            content="Pixel Id is Required."
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
                                                                required
                                                            />
                                                            <Select
                                                                label={
                                                                    <InlineStack>
                                                                        <span>
                                                                            Target
                                                                            Area
                                                                        </span>
                                                                        <Tooltip
                                                                            content="Select Target Area."
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
                                                                            content="Access Token is Required."
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
                                                                required
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
                                    Create Pixel
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Page>
            )}
        </>
    );
}
export default PixelTable;
