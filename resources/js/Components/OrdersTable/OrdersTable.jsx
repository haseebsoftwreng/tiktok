import {
    TextField,
    IndexTable,
    Popover,
    ActionList,
    Icon,
    useIndexResourceState,
    Text,
    Box,
    Button,
    Grid,
    
  } from '@shopify/polaris';
  import {useState,useCallback} from 'react';
  import {
    ImportMinor, TickSmallMinor, ExportMinor,ArrowDownMinor,ArrowUpMinor
  } from '@shopify/polaris-icons';



  function OrdersTable({orders}) {
    const [items, setItems] = useState([
      {id:'1',  title: 'ShopifyOrderName',value:"Shopify Order Name", checked:true},
      {id:'2', title: 'TTOrderID', value:" TikTok Order ID", checked:true},
      {id:'3', title: 'CustomerName', value:"Customer Name", checked:true},
      {id:'4', title: 'FulfillmentType',value:'Fulfillment Type', checked:true},
      {id:'5', title: 'CreatedAt',value:"Created At", checked:true},
      {id:'6', title:'OrderValue',value:"Order Value", checked:true},
      {id:'7', title:'OrderStatus',value:"Order Status", checked:true},
      {id:'8', title: 'CanceledBy',value:"Canceled By	", checked:true},
      {id:'9', title: 'CancelReason',value:" Cancel Reason", checked:true},
      {id:'10', title: 'Action',value:"Action", checked:true},
    ]);

    

    const {selectedResources, allResourcesSelected, handleSelectionChange} =
      useIndexResourceState(orders);

      
  const rowMarkup = orders.map(
    (
      {id, ShopifyOrderName, TTOrderID, CustomerName, FulfillmentType, CreatedAt, OrderValue,OrderStatus,CanceledBy,CancelReason,Action},
      index,
    ) => (
      
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {ShopifyOrderName}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{TTOrderID}</IndexTable.Cell>
        <IndexTable.Cell>{CustomerName}</IndexTable.Cell>
        <IndexTable.Cell>{FulfillmentType}</IndexTable.Cell>
        <IndexTable.Cell>{CreatedAt}</IndexTable.Cell>
        <IndexTable.Cell>{OrderValue}</IndexTable.Cell>
       <IndexTable.Cell>{OrderStatus}</IndexTable.Cell>
       <IndexTable.Cell>{CanceledBy}</IndexTable.Cell>
        <IndexTable.Cell>{CancelReason}</IndexTable.Cell>
       <IndexTable.Cell>{Action}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
      // Data Table Search 
      const [searchValue, setSearchValue] = useState('');
    
      const handleSearchChange = (value) => {
        setSearchValue(value);
      }; 
    
      const resourceName = {
        singular: 'order',
        plural: 'orders',
      };
      // sort options
      const sortOptions= [
        {label: 'Order', value: 'order asc', directionLabel: 'Ascending'},
        {label: 'Order', value: 'order desc', directionLabel: 'Descending'},
        {label: 'Customer', value: 'customer asc', directionLabel: 'A-Z'},
        {label: 'Customer', value: 'customer desc', directionLabel: 'Z-A'},
        {label: 'Date', value: 'date asc', directionLabel: 'A-Z'},
        {label: 'Date', value: 'date desc', directionLabel: 'Z-A'},
        {label: 'Total', value: 'total asc', directionLabel: 'Ascending'},
        {label: 'Total', value: 'total desc', directionLabel: 'Descending'},
      ];
      const [sortSelected, setSortSelected] = useState(['order asc']);


      const [active, setActive] = useState(false);

      const toggleActive = useCallback(() => setActive((active) => !active), []);
    
      const activator = (
        <Button onClick={toggleActive} disclosure>
          More actions
        </Button>
      );
    return (
      <Box>
      <div className='mTopBott20'>
        <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 8, xl: 8}}>
          <TextField
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search items"
          />
          </Grid.Cell>
          <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
            <div className='dis-Last'>
              {/* <Button size='large' icon={RefreshMinor}>Sync </Button> */}
                <Popover
                  active={active}
                  activator={activator}
                  autofocusTarget="first-node"
                  onClose={toggleActive}
                >
                  <ActionList
                    actionRole="menuitem"
                    items={[
                      {
                        // active: true,
                        content: 'Sort By Asc',
                        icon: ArrowUpMinor,
                        // suffix: <Icon source={ArrowUpMinor} />,
                      },
                      {content: 'Sort By Dsc', icon: ArrowDownMinor},
                      {content: 'Export', icon: ExportMinor},
                    ]}
                  />
                </Popover>
            </div>
          </Grid.Cell>
        </Grid>
          <Box>
          <div className='mTopBott20'>
            <IndexTable
              resourceName={resourceName}
              itemCount={orders.length}
              selectedItemsCount={
                selectedResources.length === orders.length ? 'All' : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={items}
              pagination={true}
            >
              {rowMarkup}
            </IndexTable>
          </div>
          </Box>
      </div>
      </Box>
    );
  
  }
  export default OrdersTable;

