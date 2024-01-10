/** @format */

import {
    Divider,
    IndexTable,
    Card,
    useIndexResourceState,
    Text,
    useBreakpoints,
    TextField,
    Button,
    InlineGrid,
    EmptyState,
    ButtonGroup,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import React, { useCallback, useState, useEffect } from "react";
import axioshttp from "../../../httpaxios";
import { useTranslation } from "react-i18next";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
function IntrestFinder() {
    // Search value data
    const { t } = useTranslation();
    const [csvData, setCsvData] = useState([]);
    const [copyText, setCopyText] = useState("");
    const [value, setValue] = useState(t("interestFinderPage.searchHere"));
    const [searchResult, setSearchResult] = useState("");
    const [searchString, setSearchString] = useState("");
    const handleChange = useCallback((newValue) => setValue(newValue), []);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    //   Intrest Finder Button
    const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);
    const handleSearchString = (event) => {
        setSearchString(event.target.value);
    };
    const handleFirstButtonClick = useCallback(() => {
        if (isFirstButtonActive) return;
        setIsFirstButtonActive(true);
        setSearchType("adinterest");
        axioshttp
            .post("/tiktokInterestFinder", {
                string: value,
            })
            .then((res) => {
                setSearchResult(res.data.data.recommended_keywords);
            });
    }, [isFirstButtonActive]);

    const handleSecondButtonClick = useCallback(() => {
        if (!isFirstButtonActive) return;
        setIsFirstButtonActive(false);
        setSearchType("adinterestsuggestion");
        axioshttp
            .post("/tiktokInterestFinder", {
                string: value,
            })
            .then((res) => {
                setSearchResult(res.data.data.recommended_keywords);
            });
    }, [isFirstButtonActive]);

    const resourceName = {
        singular: "order",
        plural: "orders",
    };

    const orders = [];
    if (searchResult != "") {
        searchResult.map((values, index) =>
            orders.push({
                key: index + 1,
                id: values.keyword_id,
                name: values.keyword,
                status: values.status,
            })
        );
    }

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(orders);

    const onSelectChange = (newSelectedRowKeys) => {
        handleSelectionChange(newSelectedRowKeys);
        const filteredSearchResult = searchResult.filter((item) =>
            selectedResources.includes(item.keyword_id)
        );
        const unique = [];
        const csvDataArray = [];
        if (newSelectedRowKeys.length != 0) {
            filteredSearchResult.map((search) => {
                csvDataArray.push({
                    name: search.keyword,
                    status: search.status,
                });
                setCsvData(csvDataArray);
                unique.push(search.keyword);
                setCopyText(unique.toString());
            });
        }
    };

    const handleCopyText = () => {
        toast.success("Selected Text Copied!");
        navigator.clipboard.writeText(copyText);
    };

    useEffect(() => {
        if (selectedResources.length > 0) {
            onSelectChange(selectedResources);
        }
    }, [selectedResources]);

    const rowMarkup = orders.map(({ id, name, status }, index) => (
        <IndexTable.Row
            id={id}
            key={index + 1}
            selected={selectedResources.includes(id)}
            position={index}
            // onSelectionChange={rowSelection}
        >
            <IndexTable.Cell>
                <Text variant="bodyMd" fontWeight="bold" as="span">
                    {name}
                </Text>
            </IndexTable.Cell>
            <IndexTable.Cell>{status}</IndexTable.Cell>
        </IndexTable.Row>
    ));

    const [searchType, setSearchType] = useState("adinterest");
    const handleSearchResult = () => {
        // setValue(value);
        axioshttp
            .post("/tiktokInterestFinder", { string: value, type: searchType })
            .then((res) => {
                setSearchResult(res.data.data.recommended_keywords);
            });
    };
    
    const headers = [
        { label: "Name", key: "name" },
        { label: "Status", key: "status" },
    ];
    const csvReport = {
        data: csvData,
        headers: headers,
        filename: "Interest_Report.csv",
    };
    return (
        <div className="marginTop20">
            <div className="marginTop20">
                <InlineGrid columns={["twoThirds", "oneThird"]} gap={400}>
                    <TextField
                        label={t("interestFinderPage.searchHere")}
                        labelHidden
                        value={value}
                        onChange={setValue}
                        autoComplete="off"
                    />
                    <Button icon={SearchMinor} onClick={handleSearchResult}>
                        {t("interestFinderPage.search")}
                    </Button>
                </InlineGrid>
            </div>
            <Divider />
            <Card>
                <div className="marginTop20">
                    <ButtonGroup variant="segmented">
                        <Button
                            pressed={isFirstButtonActive}
                            onClick={handleFirstButtonClick}
                        >
                            {t("interestFinderPage.interest")}
                        </Button>
                        <Button
                            pressed={!isFirstButtonActive}
                            onClick={handleSecondButtonClick}
                        >
                            {t("interestFinderPage.interestSuggested")}
                        </Button>
                    </ButtonGroup>
                </div>
                <div>
                    {/* <div>Selected {selectedResources.length} Items</div> */}
                    {/* {selectedResources.length > 0 ? ( */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "10px",
                            }}
                        >
                            <>
                                <div>
                                    Selected {selectedResources.length} Items
                                </div>
                                 {selectedResources.length > 0 ? (
                                    <div style={{}}>
                                    {" "}
                                    <ButtonGroup variant="segmented">
                                        <Button onClick={handleCopyText}>
                                            {t("interestFinderPage.copy")}
                                        </Button>
                                        <CSVLink {...csvReport}>
                                            {" "}
                                            <Button>
                                                {t(
                                                    "interestFinderPage.download"
                                                )}
                                            </Button>{" "}
                                        </CSVLink>
                                    </ButtonGroup>
                                </div>
                                 ):null}
                                
                            </>
                        </div>
                    {/* ) : null} */}
                </div>
                <Divider />

                <div className="marginTop20">
                    {isFirstButtonActive ? (
                        <Card>
                            <IndexTable
                                resourceName={resourceName}
                                itemCount={orders.length}
                                selectedItemsCount={
                                    allResourcesSelected
                                        ? "All"
                                        : selectedResources.length
                                }
                                onSelectionChange={handleSelectionChange}
                                headings={[
                                    { title: "Name" },
                                    { title: "Status" },
                                ]}
                                emptyState={[
                                    <EmptyState
                                        heading={t("interestFinderPage.data")}
                                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                                        fullWidth
                                    >
                                        <p>
                                            {t(
                                                "interestFinderPage.description"
                                            )}
                                        </p>
                                    </EmptyState>,
                                ]}
                            >
                                {rowMarkup}
                            </IndexTable>
                        </Card>
                    ) : (
                        <Card>
                            <IndexTable
                                resourceName={resourceName}
                                itemCount={orders.length}
                                selectedItemsCount={
                                    allResourcesSelected
                                        ? "All"
                                        : selectedResources.length
                                }
                                onSelectionChange={handleSelectionChange}
                                headings={[
                                    { title: "Name" },
                                    { title: "Status" },
                                ]}
                                emptyState={[
                                    <EmptyState
                                        heading={t("interestFinderPage.data")}
                                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                                        fullWidth
                                    >
                                        <p>
                                            {t(
                                                "interestFinderPage.description"
                                            )}
                                        </p>
                                    </EmptyState>,
                                ]}
                            >
                                {rowMarkup}
                            </IndexTable>
                        </Card>
                    )}
                </div>
            </Card>
        </div>
    );
}
export default IntrestFinder;
