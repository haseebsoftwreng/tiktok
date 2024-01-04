/** @format */

import React from "react";
import { Checkbox } from "@shopify/polaris";

const CtmCheckbox = ({ disabled, checked, onChange }) => {
  return <Checkbox disabled={disabled} checked={checked} onChange={onChange} />;
};

export default CtmCheckbox;
