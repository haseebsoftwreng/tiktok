import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { CashDollarMajor,AnalyticsMajor ,CheckoutMajor,SettingsMajor,PhoneMajor,TiktokMinor,StoreMajor,SimplifyMajor} from "@shopify/polaris-icons";
import { Icon, Popover, ActionList, Divider, InlineStack, ButtonGroup,Button } from "@shopify/polaris";

export default function PixelHeader() {
  const CurrentURl = window.location.href;
  const Link = ['https://pixel.aipixels.app/pixel','https://pixel.aipixels.app/pixel/tiktok','https://pixel.aipixels.app/pixel/intrestfinder','https://pixel.aipixels.app/pixel/help','https://pixel.aipixels.app/pixel/faq']
 
  const [activeItem, setActiveItem] = useState(
    function findIndexOfCurrentURL() {
      for (let i = 0; i < Link.length; i++) {
        if (Link[i] === CurrentURl) {
          return i; 
        }
      }
      return 0; // 
    }
  );
  const handleItemClick = (index) => {
    setActiveItem(index);
  };
  // last button  
  const [active, setActive] = React.useState(null);

  const toggleActive = (id) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };

  const archiveItems = [

      <InlineStack className="navLink" gap={200}>
      <Icon
        source={AnalyticsMajor}
        tone="base"
      />
        Analytics
      </InlineStack>,
      <InlineStack className="navLink" gap={200}>
        <Icon
          source={TiktokMinor}
          tone="base"
        />
        Pixels
      </InlineStack>,
      <InlineStack className="navLink" gap={200}>
      <Icon
        source={CashDollarMajor}
        tone="base"
      />
      Intrest Finder
    </InlineStack>,
      <InlineStack className="navLink" gap={200}>
        <Icon
          source={PhoneMajor}
          tone="base"
        />
      Help Center
      </InlineStack>,
    
    <InlineStack className="navLink" gap={200}>
    <Icon
      source={CashDollarMajor}
      tone="base"
    />
    Faq
  </InlineStack>
  ];
 

  return (
    <>
    <div className="inline">
      <ul className="archive-navbar">
        {archiveItems.map((item, index) => (
          <NavLink to={Link[index]} passhref="true" key={index}>
               <li
            className={`archive-item ${activeItem === index  || Link[index] === CurrentURl ? "active" : ""}`}
            onClick={() => handleItemClick(index)}
          >
            {item}
          </li>
          </NavLink>
        ))}
      </ul>
        </div>
      <div className="my-2">
        <Divider borderColor="border"/>
      </div>
    </>
  );
}
