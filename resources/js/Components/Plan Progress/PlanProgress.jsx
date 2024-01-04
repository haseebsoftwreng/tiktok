/** @format */

import React from "react";
import { Banner, Modal, Text, TextField } from "@shopify/polaris";
import { ProgressBar } from "@shopify/polaris";

export default function PlanProgress() {
  return (
    <>
      <div className="PlanPro">
        <Banner
          title={
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <div style={{ width: "100%" }}>
                <Text variant="bodyMd" as="p" fontWeight="semibold">
                  Current plan: Free
                </Text>
              </div>
              <div style={{ width: "100%", textAlign: "right" }}>
                <Text variant="bodyMd" as="p" fontWeight="semibold">
                  44/50 Orders per month
                </Text>
              </div>
            </div>
          }
          tone="info"
          action={{ content: "Upgrade Plan", url: "" }}>
          <div style={{ width: "100%" }}>
            <div style={{ width: "100%", textAlign: "right" }}>
              <Text variant="bodyMd" as="p" fontWeight="semibold">
                12%
              </Text>
            </div>
            <ProgressBar tone="primary" progress={12} size="small" />
          </div>
        </Banner>
      </div>
    </>
  );
}
