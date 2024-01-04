import { LineChart, PolarisVizProvider } from "@shopify/polaris-viz";
import "@shopify/polaris-viz/build/esm/styles.css";
export default function LineGraphData() {
    const polarisData = [
        {
          data: [
            {
              key: "January",
              value: 5663
            },
            {
              key: "February",
              value: 7349
            },
            {
              key: "March",
              value: 9795
            },
            {
              key: "April",
              value: 7396
            },
            {
              key: "May",
              value: 14000
            },
            {
              key: "June",
              value: 12484
            },
            {
              key: "July",
              value: 4878
            }
          ],
          name: "Purchase",
          color: "lightseagreen"
        },
        {
          data: [
            {
              key: "January",
              value: 4237
            },
            {
              key: "February",
              value: 5024
            },
            {
              key: "March",
              value: 5730
            },
            {
              key: "April",
              value: 5587
            },
            {
              key: "May",
              value: 5303
            },
            {
              key: "June",
              value: 5634
            },
            {
              key: "July",
              value: 3238
            }
          ],
          name: "inti.Checkout",
          color: "lightgreen"
        },
        {
            data: [
              {
                key: "January",
                value: 437
              },
              {
                key: "February",
                value: 524
              },
              {
                key: "March",
                value: 530
              },
              {
                key: "April",
                value: 587
              },
              {
                key: "May",
                value: 503
              },
              {
                key: "June",
                value: 564
              },
              {
                key: "July",
                value: 238
              }
            ],
            name: "Add to cart",
            color: "lightblue"
          },
          {
            data: [
              {
                key: "January",
                value: 2837
              },
              {
                key: "February",
                value: 1924
              },
              {
                key: "March",
                value: 2730
              },
              {
                key: "April",
                value: 3487
              },
              {
                key: "May",
                value: 2503
              },
              {
                key: "June",
                value: 4764
              },
              {
                key: "July",
                value: 21238
              }
            ],
            name: "C.View",
            color: "lightpink"
          },
          {
            data: [
              {
                key: "January",
                value: 1837
              },
              {
                key: "February",
                value: 4924
              },
              {
                key: "March",
                value: 7730
              },
              {
                key: "April",
                value: 5487
              },
              {
                key: "May",
                value: 1503
              },
              {
                key: "June",
                value: 3764
              },
              {
                key: "July",
                value: 5238
              }
            ],
            name: "p.view",
            color: "purple"
          },
          {
            data: [
              {
                key: "January",
                value: 3837
              },
              {
                key: "February",
                value: 4432
              },
              {
                key: "March",
                value: 2577
              },
              {
                key: "April",
                value: 1687
              },
              {
                key: "May",
                value: 4803
              },
              {
                key: "June",
                value: 7364
              },
              {
                key: "July",
                value: 3058
              }
            ],
            name: "Search",
            color: "brown"
          },
          
      ];
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
