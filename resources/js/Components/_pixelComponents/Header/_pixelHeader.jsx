import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { CashDollarMajor,AnalyticsMajor ,CheckoutMajor,SettingsMajor,PhoneMajor,TiktokMinor,StoreMajor,SimplifyMajor} from "@shopify/polaris-icons";
import { Icon, Popover, ActionList, Divider, InlineStack, ButtonGroup,Button } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
export default function PixelHeader() {
  const {t} = useTranslation();
  const CurrentURl = window.location.href;
  const Link = ['https://de63-154-192-195-108.ngrok-free.app/pixel','https://de63-154-192-195-108.ngrok-free.app/pixel/tiktok','https://de63-154-192-195-108.ngrok-free.app/pixel/intrestfinder','https://de63-154-192-195-108.ngrok-free.app/pixel/help','https://pixel.aipixels.app/pixel/faq',]
  // const Link = [
  //   process.env.DOMAIN + '/pixel',
  //   process.env.DOMAIN + '/pixel/tiktok',
  //   process.env.DOMAIN + '/pixel/intrestfinder',
  //   process.env.DOMAIN + '/pixel/help',
  //   process.env.DOMAIN + '/pixel/faq',
  //   ]
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
        {t('header.analytics')}
      </InlineStack>,
      <InlineStack className="navLink" gap={200}>
        <Icon
          source={TiktokMinor}
          tone="base"
        />
        {t('header.pixels')}
      </InlineStack>,
      <InlineStack className="navLink" gap={200}>
      <Icon
        source={CashDollarMajor}
        tone="base"
      />
      
      {t('header.interestFinder')}
    </InlineStack>,
      <InlineStack className="navLink" gap={200}>
        <Icon
          source={PhoneMajor}
          tone="base"
        />
      
      {t('header.helpCenter')}
      </InlineStack>,
    
    <InlineStack className="navLink" gap={200}>
    <Icon
      source={CashDollarMajor}
      tone="base"
    />
    {t('header.faq')}
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
