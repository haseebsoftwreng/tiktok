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
import { toast } from "react-toastify";
import { Frame, ContextualSaveBar } from "@shopify/polaris";
import { Link, useParams } from "react-router-dom";
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
import { useTranslation } from "react-i18next";
import axioshttp from "../../../httpaxios";
import TableSkeleton from "../../../Components/_pixelComponents/TableSkeleton";
const Context = React.createContext({ name: "Default" });

function PixelTable() {
    const { t } = useTranslation();
    const [api, contextHolder] = notification.useNotification();
    const [selectedOptions, setSelectedOptions] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [active, setActive] = useState(false);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(t("pixelPage.searchHere"));
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
    const [selected, setSelected] = useState("Entire Store");
    const [eventCode, setEventCode] = useState("");
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
            placeholder={
                selected === "Collections" ? t('createPixelPage.suggestedCollection') : t('createPixelPage.suggestedTag')
            }
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
            <Button
                fullWidth
                onClick={() => toggleActive("popover1")}
                variant="primary"
            >
                Change
            </Button>
        </>
    
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
        setSelectedOptions("");
        if (value === "Collections") {
            togglePopoverActive();
        }
    }, []);

    const targetArea = [
        { label: t("pixelPage.entireStore"), value: "Entire Store" },
        { label: t("pixelPage.collection"), value: "Collections" },
        { label: t("pixelPage.tag"), value: "Tags" },
    ];
    // tiktok   Test Event Code

    const handleEventCodeChange = useCallback(
        (value) => setEventCode(value),
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

    const createPixel = async () => {
        try {
            let formData = new FormData();
            if (
                typeof tikTokPixelName == "undefined" ||
                tikTokPixelName == ""
            ) {
                toast.error(t('pixelPage.toast.error.pixelNameRequired'));
                return;
            }
            if (typeof tikTokPixelId == "undefined" || tikTokPixelId == "") {
                toast.error(t('pixelPage.toast.error.pixelIdRequired'));
                return;
            }
            if (typeof tokenValue == "undefined" || tokenValue == "") {
                toast.error(t('pixelPage.toast.error.pixelAccessTokenRequired'));
                return;
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
                    toast.success(t('pixelPage.toast.pixelCreate'));
                    pixelsGet();
                    // navigate("/pixel/tiktok");
                })
                .catch((error) => {
                    console.error("API Error:", error);
                    toast.error(t('pixelPage.toast.error.formSubmit'), error);
                });
        } catch (error) {
            toast.error(t('pixelPage.toast.error.formSubmit'), error);
        }
    };

    const handleSearchBar = () => {
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
    }, []);

    const handleStatus = (pixelId) => {
        axioshttp.post("/updateTiktokStatus", { id: pixelId }).then((res) => {
            toast.success(t("pixelPage.toast.pixelStatusUpdate"));
            pixelsGet();
        });
    };

    const getStatusBadge = (id, status) => (
        <ButtonGroup variant="segmented">
            <Button pressed={status == false} onClick={() => handleStatus(id)}>
                {t("pixelPage.off")}
            </Button>
            <Button pressed={status == true} onClick={() => handleStatus(id)}>
                {t("pixelPage.on")}
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
                <Button icon={EditMajor}>{t("pixelPage.edit")}</Button>
            </Link>
            <Button onClick={() => handleDelete(pixelId)} icon={DeleteMinor}>
                {t("pixelPage.delete")}
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
        toast.success(t("pixelPage.toast.deleteToast"));
    }

    const [contactualBar, setContactualBar] = useState(false);

    // const contextualSaveBarStatus=(){

    // }
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
                                label={t("pixelPage.searchHere")}
                                labelHidden
                                value={value}
                                onChange={handleChange}
                                onKeyUp={handleSearchBar}
                                autoComplete="off"
                            />
                            <Button variant="primary" onClick={showForm}>
                                {t("pixelPage.addNewPixel")}
                            </Button>
                        </InlineGrid>
                    </div>

                    <Card>
                        {test === true ? (
                            // <SkeletonThumbnail size="small"/>
                            <TableSkeleton />
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
                                    t("pixelPage.status"),
                                    t("pixelPage.pixelName"),
                                    t("pixelPage.pixelId"),
                                    t("pixelPage.targetArea"),
                                    t("pixelPage.serverSide"),
                                    t("pixelPage.testEvent"),
                                    t("pixelPage.action"),
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
                           />
                        )}
                    </Card>

                    <Modal
                        open={active}
                        onClose={toggleModal}
                        title={t("pixelPage.delete")}
                        primaryAction={{
                            destructive: true,
                            content: t("pixelPage.delete"),
                            onAction: handleDeletePixel,
                        }}
                        secondaryActions={[
                            {
                                content: t("pixelPage.cancel"),
                                onAction: toggleModal,
                            },
                        ]}
                    >
                        <Modal.Section>
                        {t("pixelPage.deleteModelDescription")}
                        </Modal.Section>
                    </Modal>
                </>
            ) : (
                // contactualBar == true ? (
                <>
                    <div style={{ height: "10px" }}>
                        <Frame
                            logo={{
                                width: 86,
                                contextualSaveBarSource:
                                    "https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png",
                            }}
                        >
                            <ContextualSaveBar
                                fullWidth
                                message={t('createPixelPage.unsavedChanges')}
                                saveAction={{
                                    onAction: () => {
                                        createPixel(), showForm();
                                    },
                                    content:t('createPixelPage.save'),
                                    loading: false,
                                    disabled: false,
                                }}
                                discardAction={{
                                    content:t('createPixelPage.cancel'),
                                    onAction: () =>{
                                        showForm()
                                    }
                                        
                                }}
                            />
                        </Frame>
                    </div>

                    <Page
                        backAction={{ content: "Settings", onAction: showForm }}
                        title={t("createPixelPage.title")}
                    >
                        <Box>
                            <Layout>
                                <Layout.Section>
                                    <div className="">
                                        <div>
                                            <Layout>
                                                <Layout.AnnotatedSection
                                                    id="Merchant Details"
                                                    title={t(
                                                        "createPixelPage.merchantDetails"
                                                    )}
                                                    description={t(
                                                        "createPixelPage.merchantDetailsText"
                                                    )}
                                                >
                                                    <Card sectioned>
                                                        <InlineGrid
                                                            columns={{ xs: 2 }}
                                                        >
                                                            <div className="dis-Last"></div>
                                                        </InlineGrid>
                                                        <div className="margtop10">
                                                            <InlineGrid
                                                                columns={{
                                                                    xs: 1,
                                                                }}
                                                                gap={200}
                                                            >
                                                                <TextField
                                                                    label={
                                                                        <InlineStack>
                                                                            <span>
                                                                                {t(
                                                                                    "createPixelPage.pixelName"
                                                                                )}
                                                                            </span>
                                                                            <Tooltip
                                                                                content={t(
                                                                                    "createPixelPage.content.pixelNameToolTip"
                                                                                )}
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
                                                                                {t(
                                                                                    "createPixelPage.pixelId"
                                                                                )}
                                                                            </span>
                                                                            <Tooltip
                                                                                content={t(
                                                                                    "createPixelPage.content.pixelIdToolTip"
                                                                                )}
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
                                                                                {t(
                                                                                    "createPixelPage.targetArea"
                                                                                )}
                                                                            </span>
                                                                            <Tooltip
                                                                                content={t(
                                                                                    "createPixelPage.content.selectTargetAreaToolTip"
                                                                                )}
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
                                                                    value={
                                                                        selected
                                                                    }
                                                                />
                                                                {selected ===
                                                                "Tags" ? (
                                                                    // setSelectedOptions(""),
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
                                                                                listTitle={t('createPixelPage.suggestedTag')}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                ) : null}
                                                                {selected ===
                                                                "Collections" ? (
                                                                    // setSelectedOptions(""),
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
                                                                                listTitle={t('createPixelPage.suggestedCollection')}
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
                                                    title={t(
                                                        "createPixelPage.merchantDetails"
                                                    )}
                                                    description={t(
                                                        "createPixelPage.merchantDetailsText"
                                                    )}
                                                >
                                                    <Card sectioned>
                                                        <InlineGrid
                                                            columns={{ xs: 2 }}
                                                        >
                                                            <div className="dis-Last"></div>
                                                        </InlineGrid>
                                                        <div className="margtop10">
                                                            <InlineGrid
                                                                columns={{
                                                                    xs: 1,
                                                                }}
                                                                gap={200}
                                                            >
                                                                <TextField
                                                                    label={
                                                                        <InlineStack>
                                                                            <span>
                                                                                {t(
                                                                                    "createPixelPage.accessToken"
                                                                                )}
                                                                            </span>
                                                                            <Tooltip
                                                                                content={t(
                                                                                    "createPixelPage.content.pixelAccessTokenToolTip"
                                                                                )}
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
                                                                                {t(
                                                                                    "createPixelPage.testEvent"
                                                                                )}
                                                                            </span>
                                                                            <Tooltip
                                                                                content={t(
                                                                                    "createPixelPage.content.pixelEventCodeToolTip"
                                                                                )}
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

                            {/* <Box as="div" className=" dis-center">
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
                        </Box> */}
                        </Box>
                    </Page>
                </>
            )}
        </>
    );
}
export default PixelTable;
