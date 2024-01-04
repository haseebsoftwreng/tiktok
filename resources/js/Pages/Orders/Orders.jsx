import React from "react";
import { Page ,Card,Tabs,Badge,Icon,ButtonGroup,Button, InlineStack,Text, Link} from "@shopify/polaris";
import { useState,useCallback } from "react";
import {
    ViewMinor
} from '@shopify/polaris-icons';
import DateListPicker from "../../Components/DatePicker/DatePicker";
import OrdersTable from "../../Components/OrdersTable/OrdersTable";
import {useNavigate} from 'react-router-dom';

export default function Orders() {
  // Tabs
  const [itemStrings, setItemStrings] = useState([
    'All',
    'Unfulfilled',
    'Unpaid',
    'Open',
    'Close',
    'Local Delivery',
    'Local Pickup'
  ]);
  
const badge= ['38','10','20','40','0','10','0']
  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    badge: badge[index],
    onAction: () => {},
  id: `${item}-${index}`,
  isLocked: index === 0,
}));

 // Tabs 
 const [selectedTab, setSelectedTab] = useState(0);

 const handleTabChange = useCallback(
   (selectedTabIndex) => setSelectedTab(selectedTabIndex),
   [],
 );
 const navigate = useNavigate();

 const handleShopifyClick = () => {
  navigate('/');
};

const handleTikTokClick = () => {
  navigate('/');
}
//   
 const Allorders = [
  {
    id: '1',
    ShopifyOrderName:'#1006', 
    TTOrderID: '#1545',
    CustomerName: 'Athar Rashid Rashid',
    FulfillmentType: <Badge tone="success"> Fullfilled</Badge>,
    CreatedAt: 'Friday at 02:44 pm',
    OrderValue:'£0.00',
    OrderStatus:<Badge tone="sucess">shipped</Badge>,
    CanceledBy:"",
    CancelReason:"",
        Action: <div className="inline">
        <ButtonGroup>
        <Button icon={ViewMinor} onClick={handleShopifyClick}>View on Shopify</Button>
        <Button icon={ViewMinor} onClick={handleTikTokClick}> View On TikTok</Button>
        </ButtonGroup>
        </div>,
  },
  {
    id: '2',
    ShopifyOrderName:'#1003', 
    TTOrderID: '#1545',
    CustomerName: 'Athar Rashid Rashid',
    FulfillmentType: <Badge tone="success"> Fullfilled</Badge>,
    CreatedAt: 'Friday at 02:44 pm',
    OrderValue:'£0.00',
    OrderStatus:<Badge tone="sucess">shipped</Badge>,
    CanceledBy:"",
    CancelReason:"",
        Action: <div className="inline">
        <ButtonGroup>
        <Button icon={ViewMinor} onClick={handleShopifyClick}>View on Shopify</Button>
        <Button icon={ViewMinor} onClick={handleTikTokClick}> View On TikTok</Button>
        </ButtonGroup>
        </div>,
  },
  {
    id: '3',
    ShopifyOrderName:'#1008', 
    TTOrderID: '#1545',
    CustomerName: 'Athar Rashid Rashid',
    FulfillmentType: <Badge tone="success"> Fullfilled</Badge>,
    CreatedAt: 'Friday at 02:44 pm',
    OrderValue:'£0.00',
    OrderStatus:<Badge tone="sucess">shipped</Badge>,
    CanceledBy:"",
    CancelReason:"",
        Action: <div className="inline">
        <ButtonGroup>
        <Button icon={ViewMinor} onClick={handleShopifyClick}>View on Shopify</Button>
        <Button icon={ViewMinor} onClick={handleTikTokClick}> View On TikTok</Button>
        </ButtonGroup>
        </div>,
  },
];
 
 // Api Data fetch  check
 const [test,settest] = useState (false);
 return (
   (test === true ? (<SkeletonStructure/>):(
    <Page
      title="Orders Page"
    >
        <div className="mTopBott20">
        <Card>
            <InlineStack align="space-between" wrap={true}>
                <div className="order-stats">
                    <DateListPicker/>
                </div>
                <div className="order-stats">
                    <Text>Orders</Text>
                    <Text>6</Text>
                </div>
                <div className="order-stats">
                    <Text>Ordered items</Text>
                    <Text>6</Text>
                </div>
                <div className="order-stats">
                    <Text>Returned items</Text>
                    <Text>6</Text>
                </div>
                <div className="order-stats">
                    <Text>Fullfilled Orders</Text>
                    <Text>6</Text>
                </div>
                <div className="order-stats">
                    <Text>Delivered Orders</Text>
                    <Text>6</Text>
                </div>
                <div className="order-stats">
                    <Text>Time to Fullfill</Text>
                    <Text>6 min</Text>
                </div>
            </InlineStack> 
        </Card>
        </div>
        <div className="mTopBott20">
      <Card>
      <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} >  
         {selectedTab == 0 ? (<OrdersTable orders={Allorders}/>) : (selectedTab == 1 ? (<OrdersTable orders={Allorders}/>): (selectedTab == 2 ? (<OrdersTable orders={Allorders}/>): (selectedTab == 3 ? (<OrdersTable orders={Allorders}/>): (selectedTab == 4 ? (<OrdersTable orders={Allorders}/>):(selectedTab == 5 ? (<OrdersTable orders={Allorders}/>):(<OrdersTable orders={Allorders}/>))))))} 
      </Tabs>
      </Card>
      </div>
    </Page>
   ))
  );
}
