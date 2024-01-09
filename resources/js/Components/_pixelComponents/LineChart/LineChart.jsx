import { LineChart, PolarisVizProvider } from "@shopify/polaris-viz";
import "@shopify/polaris-viz/build/esm/styles.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
export default function LineGraphData(pixeldata, analatic) {
    const {t} = useTranslation();
    const [Purchase, setPurchaseData] = useState([]);
    const [Checkout, setCheckoutData] = useState([]);
    const [ViewContent, setviewContentData] = useState([]);
    const [AddtoCart, setaddtoCartData] = useState([]);
    const [Search, setSearchData] = useState([]);

    const polarisData = [
        {
            data: Purchase,
            name: t('graphPage.purchase'),
            color: "lightseagreen",
        },
        {
            data: Checkout,
            name: t('graphPage.checkout'),
            color: "lightgreen",
        },
        {
            data: ViewContent,
            name: t('graphPage.contentView'),
            color: "lightpink",
        },
        {
            data: AddtoCart,
            name: t('graphPage.addToCart'),
            color: "lightblue",
        },
        {
            data: Search,
            name: t('graphPage.search'),
            color: "purple",
        },
    ];

    useEffect(() => {
        const pixeldataArray = Object.values(pixeldata);
        console.log("pixel Array", pixeldataArray[0]);
        // setChartsData(pixeldataArray);

        if(pixeldataArray[0]!==""){
          const purchase = pixeldataArray[0][0].map((item) => ({
            key: item.key,
            value: item.value,
        }));
        if (purchase.length > 0) {
            setPurchaseData(purchase);
        }
        const checkout = pixeldataArray[0][1].map((item) => ({
            key: item.key,
            value: item.value,
        }));
        if (checkout.length > 0) {
            setCheckoutData(checkout);
        }
        const addtoCart = pixeldataArray[0][2].map((item) => ({
            key: item.key,
            value: item.value,
        }));
        if (addtoCart.length > 0) {
            setaddtoCartData(addtoCart);
        }
        const viewContent = pixeldataArray[0][3].map((item) => ({
            key: item.key,
            value: item.value,
        }));
        if (viewContent.length > 0) {
            setviewContentData(viewContent);
        }
        const search = pixeldataArray[0][4].map((item) => ({
            key: item.key,
            value: item.value,
        }));
        if (search.length > 0) {
            setSearchData(search);
        }
        }

        //  const options = pixeldataArray.map((item) => ({
        //   key: item.key,
        //   value: item.value,
        //  }));
    }, [pixeldata]);
    return (
        <PolarisVizProvider
            themes={{
                Light: {
                    legend: {
                        backgroundColor: "white",
                    },
                },
            }}
        >
            <div
                style={{
                    height: 230,
                }}
            >
                <LineChart data={polarisData} theme="Light" />
            </div>
        </PolarisVizProvider>
    );
}
