import {Page,Tabs,Card} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import React from 'react';
import {
    EmailMajor
  } from '@shopify/polaris-icons';
import Videos from '../../../Components/Videos/Videos';
import Contact from '../../../Components/Contact/Contact';


function PixelHelp() {
    const [selected, setSelected] = useState(0);
    const handleTabChange = useCallback(
      (selectedTabIndex) => setSelected(selectedTabIndex),
      [],
    );
    const tabs = [
        {
          id: 'Videos',
          content: 'Videos',
          accessibilityLabel: 'Videos',
          panelID: 'Videos',
        },
        {
          id: 'Contact',
          content: 'Contact',
          panelID: 'Contact',
        },
      ];
  // Api Data fetch  check
  const [test,settest] = useState (false);
  return (
    (test === true ? (<SkeletonStructure/>):(
    <Page
      title="Help Center"
      subtitle="We have some resources that can help you with the Shortly app."
      primaryAction={{content: 'Free Live Chat Support', siize:"large"}}
    >
      <div className='marginTop20'>
        <Card>
            <Tabs
            tabs={tabs}
            selected={selected}
            onSelect={handleTabChange}
            disclosureText="More views"
        >
            <div title={tabs[selected].content}>
            {(tabs[selected].content === "Videos" ? <Videos/>:(tabs[selected].content === "Contact"  ? <Contact/>: ""))}
            </div>
            
        </Tabs>
        </Card>
      </div>
    </Page>
    ))
  );
}
export default PixelHelp;