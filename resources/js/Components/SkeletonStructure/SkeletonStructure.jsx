import {
    SkeletonPage,
    Layout,
    LegacyCard,
    SkeletonBodyText,
    TextContainer,
    SkeletonDisplayText,
  } from '@shopify/polaris';
  import React from 'react';
  
  function SkeletonStructure() {
    return (
        <SkeletonPage primaryAction>
            <LegacyCard sectioned>
              <SkeletonBodyText />
            </LegacyCard>
            <LegacyCard sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </LegacyCard>
            <LegacyCard sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </LegacyCard>
      </SkeletonPage>
    );
  }
  export default SkeletonStructure;