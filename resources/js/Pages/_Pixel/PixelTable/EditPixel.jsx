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
} from "@shopify/polaris";
import { toast} from 'react-toastify';
import { useNavigate,Link,useParams  } from "react-router-dom";
import { Tag, Autocomplete } from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import { useCallback, useMemo } from "react";

import {
    QuestionMarkInverseMajor,
} from "@shopify/polaris-icons";
import axioshttp from "../../../httpaxios";
import {Frame, ContextualSaveBar} from '@shopify/polaris';
import { useTranslation } from "react-i18next";

function EditPixel() {
    const {t} = useTranslation();
    var pixelId = useParams();
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState("");
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
    const [collections, setCollection] = useState([]);
    const [tag, setTag] = useState([]);

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
            // placeholder="Vintage, cotton, summer"
            placeholder={
                selected === "Collections" ? t('updatePixelPage.suggestedCollection') : t('updatePixelPage.suggestedTag')
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

    const updatePixelPageChange = useCallback((newValue) => setValue(newValue), []);

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
        console.log(value);
        if (value === "Collections") {
            togglePopoverActive();
            console.log("sdfjh");
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
        axioshttp.get("/getCollections").then((res) => {
            setCollection(res.data);
        });
    };

    //////////// Shop Tags//////////////
    const getTags = () => {
        axioshttp.get("/getTags").then((res) => {
            setTag(res.data.tags);
        });
    };
    const [pixels, setP_pixels] = useState([]);
    const [pixels_id, setPixelsId] = useState([]);

    const [edit_pixels, setEdit_pixels] = useState('');

    //////////////////Get Pixels/////////////////////
    const pixelsGet = () => {
        axioshttp.post('/getTiktokPixelById',{id : pixelId}).then((res) => {
            setPixelsId(res.data.id);
            setEdit_pixels(res.data);
            setSelected(res.data.type);
            setTikTokPixelName(res.data.pixel_name);
            setTikTokPixelId(res.data.pixel_id);
            setEventCode(res.data.test_token);
            setTokenValue(res.data.access_token);
            // setOptionsTag(res.data.tag != null ? JSON.parse(res.data.tag) : " ");
            // setOptioncollection(res.data.collection != null ? JSON.parse(res.data.collection) : " ");
            if(res.data.collection != null){
                setSelectedOptions(JSON.parse(res.data.collection));
            }else if(res.data.tag != null){
                setSelectedOptions(JSON.parse(res.data.tag));
            }else{
                setSelectedOptions("");
            }
        });  
    }

   
    const handleFormSubmit = async () => {

        try {
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
            let formData = new FormData();
            formData.append("id",pixels_id);
            if (typeof tikTokPixelName == "undefined" || tikTokPixelName !== "") {
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
            if (selectedOptions != null) {
                if (selected === "Tags") {
                    formData.append("tags", selectedOptions);
                } else {
                    formData.append("collections", selectedOptions);
                }
            }
            axioshttp.post('/updateTiktokPixel',formData).then((res) => {
                toast.success(t('pixelPage.toast.pixelUpdate'));
                pixelsGet();
                navigate('/pixel/tiktok');
            }).catch((error) => {
                    console.error("API Error:", error);
                    toast.error(t('pixelPage.toast.error.formSubmit'), error);
                });
        } catch (error) {
            toast.error(t('pixelPage.toast.error.formSubmit'), error);
        }
    };
     
    
    useEffect(() => {
        pixelsGet();
        getTags();
        getCollections();
      }, []);

  

    const handleDelete = (pixelId) => {
        toggleModal();
        setDeletedPixelId(pixelId);
    };
    
    const returnBack=()=>{
        pixelsGet();
        navigate('/pixel/tiktok');
    }
    //////////////////// End of Backend Functionality///////

    return (
        <>

                 <div style={{height: '10px'}}>
                    <Frame
                      logo={{
                        width: 86,
                        contextualSaveBarSource:
                          'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
                      }}
                    >
                      <ContextualSaveBar
                        fullWidth
                        message={t('updatePixelPage.unsavedChanges')}
                        saveAction={{
                         onAction:() => {handleFormSubmit(),
                            showForm()},
                          content:t('updatePixelPage.update'),
                          loading: false,
                          disabled: false,
                        }}
                        discardAction={{
                            content:t('updatePixelPage.cancel'),
                            onAction: () =>{
                                showForm()
                            }
                        }}
                      />
                      
                    </Frame>
                    </div>
                <Page
                    backAction={{ content: "Settings", onAction: returnBack }}
                    title={t('updatePixelPage.title')}
                >
    
                    <Box>
                       
                    <Layout>
                            <Layout.Section>
                                <div className="">
                                    <div>
                                        <Layout>
                                            <Layout.AnnotatedSection
                                                id="Merchant Details"
                                                title={t('updatePixelPage.merchantDetails')}
                                                description={t('updatePixelPage.merchantDetailsText')}
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
                                                                        {t('updatePixelPage.pixelName')}
                                                                        </span>
                                                                        <Tooltip
                                                                           content={t('updatePixelPage.content.pixelNameToolTip')}
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
                                                                onChange={handleTiktokPixelNameChange}
                                                                selectTextOnFocus
                                                                autoComplete="off"
                                                                required
                                                            />

                                                            <TextField
                                                                label={
                                                                    <InlineStack>
                                                                        <span>
                                                                        {t('updatePixelPage.pixelId')}
                                                                        </span>
                                                                        <Tooltip
                                                                            content={t('updatePixelPage.content.pixelIdToolTip')}
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
                                                                        {t('updatePixelPage.targetArea')}
                                                                        </span>
                                                                        <Tooltip
                                                                            content={t('updatePixelPage.content.selectTargetAreaToolTip')}
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
                                                                // setSelectedOptions(""),
                                                                <>
                                                                    <div className="hide-scroll">
                                                                        <Autocomplete
                                                                            allowMultiple
                                                                            options={tag.map(
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
    
                                                                            listTitle={t('updatePixelPage.suggestedTag')}
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
                                                                            options={collections.map(
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
                                                                            
                                                                            listTitle={t('updatePixelPage.suggestedCollection')}
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
                                                title={t('updatePixelPage.merchantDetails')}
                                                description={t('updatePixelPage.merchantDetailsText')}
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
                                                                        {t('updatePixelPage.accessToken')}
                                                                        </span>
                                                                        <Tooltip
                                                                            content={t('updatePixelPage.content.pixelAccessTokenToolTip')}
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
                                                                        {t('updatePixelPage.testEvent')}
                                                                        </span>
                                                                        <Tooltip
                                                                            content={t('updatePixelPage.content.pixelEventCodeToolTip')}
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
                                        handleFormSubmit();
                                        showForm();
                                    }}
                                >
                                    {" "}
                                    Update Pixel
                                </Button>
                            </div>
                        </Box> */}
                    </Box>
                </Page>
            
        </>
    );
}
export default EditPixel;
