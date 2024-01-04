import { LineChart, PolarisVizProvider } from "@shopify/polaris-viz";
import "@shopify/polaris-viz/build/esm/styles.css";
import { useState, useEffect } from "react";
export default function LineGraphData(pixeldata,analatic) {
    

      const [chartsData, setChartsData] = useState([]);
      const polarisData = [
        {
          data: chartsData[0],
          name: "initiateCheckout",
          color: "lightseagreen"
        },
      ];
      
    useEffect(() => {
      const pixeldataArray = Object.values(pixeldata);
       console.log('pixelDataArray',pixeldataArray);
        if(pixeldataArray!= ""){
          const options = pixeldataArray.map((item) => (
            item[0].map((value, index) => {
                console.log(`item[0][${index}]`, value);
                console.log('value',value.key)
                return value;
            })
           ));

           console.log(options);
           if (options.length > 0) {
               setChartsData(options);
               console.log(chartsData[0]);
           }
        }
        

        //  const options = pixeldataArray.map((item) => ({
        //   key: item.key,
        //   value: item.value,
        //  }));

    },[pixeldata]);
  return (
      <PolarisVizProvider
      themes={{
        Light: {
          legend: {
            backgroundColor: "white"
          }
        }
      }}
    >
      <div
        style={{
          height: 230
        }}
      >
        <LineChart data={polarisData} theme="Light" />
      </div>
    </PolarisVizProvider>
  );
}
