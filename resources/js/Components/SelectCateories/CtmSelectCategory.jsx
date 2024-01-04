/** @format */

import React from "react";
import { useState } from "react";
// import "rsuite/dist/rsuite.min.css";

// import { Cascader } from "rsuite";
// Sample Options

export default function CtmSelectCategory() {
  const options = [
    {
      label: "M.P",
      value: "M.P",
      children: [
        {
          label: "Mhow",
          value: "mhow",
        },
        {
          label: "Indore",
          value: "Indore",
          children: [
            {
              label: "Vijay Nagar",
              value: "Vijay Nagar",
            },
            {
              label: "Rajiv Gandhi Square",
              value: "Rajiv Gandhi Square",
            },
            {
              label: "MR 10",
              value: "MR 10",
            },
          ],
        },
      ],
    },
    {
      label: "Cars",
      value: "Cars",
      children: [
        {
          label: "Mercedeas",
          value: "Mercedeas",
        },
        {
          label: "Lambo",
          value: "Lambo",
          children: [
            {
              label: "Lambo 1",
              value: "Lambo 1",
            },
            {
              label: "Lambo 2",
              value: "Lambo 2",
            },
            {
              label: "Lambo 3",
              value: "Lambo 3",
            },
          ],
        },
      ],
    },
    {
      label: "Campanies",
      value: "Campanies",
      children: [
        {
          label: "SlashCart",
          value: "SlashCart",
          children: [
            {
              label: "Athar Rasheed",
              value: "Athar Rasheed",

              children: [
                {
                  label: "Maaz",
                  value: "Maaz",
                },
                {
                  label: "Subhan",
                  value: "Subhan",
                },
                {
                  label: "Haseeb",
                  value: "Haseeb",
                },
              ],
            },
            {
              label: "Mazhar Rasheed",
              value: "Mazhar Rasheed",

              children: [
                {
                  label: "Moeed",
                  value: "Moeed",
                },
                {
                  label: "Abdullah",
                  value: "Abdullah",
                },
              ],
            },
          ],
        }, ////
        {
          label: "Wixpa",
          value: "Wixpa",
          children: [
            {
              label: "Zeeshan Haider",
              value: "Zeeshan Haider",

              children: [
                {
                  label: "Rizwan",
                  value: "Rizwan",
                },
                {
                  label: "Waheed",
                  value: "Waheed",
                },
                {
                  label: "Pasha",
                  value: "Pasha",
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const [selectedValues, setSelectedValues] = useState([]);
  const handleCascaderChange = (values) => {
    setSelectedValues(values);
    console.log(values);
  };
  return (
    <>
      {/* <Cascader
        block
        placeholder="Select your Nearest Office"
        data={options}
        onChange={(values) => handleCascaderChange(values)}
      /> */}
    </>
  );
}
