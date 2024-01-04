import React, { useState } from "react";
import { Text, Icon, Link } from "@shopify/polaris";
import { ChevronDownMinor } from "@shopify/polaris-icons";

const Accordion = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const [openSection, setOpenSection] = useState(null);

  const handleSectionClick = (sectionIndex) => {
    if (sectionIndex === openSection) {
      // If the clicked section is already open, close it
      setOpenSection(null);
    } else {
      // Otherwise, open the clicked section
      setOpenSection(sectionIndex);
      //   change toggle
      toggleAccordion();
    }
  };

  return items.map((item, index) => {
    return (
      <div className="accordion" key={index}>
        <div
          className="accordion-header"
          onClick={() => handleSectionClick(index)}
        >
          <Link url={`#${item.hash}`} monochrome>
            {" "}
            <Text variant="bodyLg" as="p" fontWeight="medium">
              {item?.title}
            </Text>
          </Link>
          <span className={`icon ${isOpen ? "open" : "closed"}`}>
            <Icon source={ChevronDownMinor} tone="base" />
          </span>
        </div>
        {openSection === index && (
          <div className="accordion-content">{item?.content}</div>
        )}
      </div>
    );
  });
};

export default Accordion;
