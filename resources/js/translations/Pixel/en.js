// ur.js
const translations = {
    header: {
        analytics: "Analytics",
        pixels: "Pixels",
        interestFinder: "Interest Finder",
        helpCenter: "Help Center",
        faq:"Faq",
    },
    
    analyticsPages:{
        pageTitle:"Analytics",
        purchase:"Purchase",
        initiateCheckout:"Initiate Checkout",
        addToCart:"Add to Cart",
        contentView:"Content View",
        pageView:"Page View",
        search:"Search",
        selectPixel:"Please Select The Pixel"
    },

    pixelPage:{
          searchHere:"Search Here",
          addNewPixel:"Add New Pixel",
          status:"Status",
          pixelName:"Pixel Name",
          pixelId:"Pixel ID",
          targetArea:"Target Area",
          serverSide:"Server Side",
          testEvent:"Test Event",
          action:"Action",
          edit:"Edit",
          delete:"Delete",
          collection:"Collection",
          tag:"Tag",
          entireStore:"Entire Store",
          on:"On",
          off:"Off",
          delete:"Delete",
          cancle:"Cancle",
          deleteModelDescription:" Are you sure you want to delete this pixel?",
          toast:{
               deleteToast:"Pixel Deleted Successfully",
               pixelStatusUpdate:"Pixel Status Update",
               pixelCreate:"Pixel Created Successfully",
               pixelUpdate:"Pixel Edited Successfully",
               error:{
                pixelNameRequired:"Pixel Name is Required!",
                pixelRequired:"Please Select Pixel!",
                pixelIdRequired:"Pixel Id is Required!",
                pixelAccessTokenRequired:"Access Token is Required!",
                formSubmit:"Form Submission Error:",
               }
          }
    },

    createPixelPage:{
          title:"Create Pixel",
          merchantDetails:"Merchant Details",
          merchantDetailsText:"Following are details of Connected Tiktok Shop.",
          pixelName:"Pixel Name",
          pixelId:"Pixel ID",
          targetArea:"Target Area",
          accessToken:"Access Token",
          testEvent:"Test Event Code",
          save:"Save",
          cancle:"Cancle",
          unsavedChanges:"Unsaved Changes",
          suggestedTag:"Suggested Tags",
          suggestedCollection:"Suggested Collections",
          content:{
            pixelNameToolTip:"Pixel Name is Required.",
            pixelIdToolTip:"Pixel ID is Required.",
            selectTargetAreaToolTip:"Select Target Area..",
            pixelAccessTokenToolTip:"Pixel Access Token is Required.",
            pixelEventCodeToolTip:"Event Code is Optional.",
          }
    },

    updatePixelPage:{
        title:"Edit Pixel",
        merchantDetails:"Merchant Details",
        merchantDetailsText:"Following are details of Connected Tiktok Shop.",
        pixelName:"Pixel Name",
        pixelId:"Pixel ID",
        targetArea:"Target Area",
        accessToken:"Access Token",
        testEvent:"Test Event Code",
        update:"Update",
        cancel:"Cancle",
        unsavedChanges:"Unsaved Changes",
        suggestedTag:"Suggested Tags",
        suggestedCollection:"Suggested Collections",
        content:{
          pixelNameToolTip:"Pixel Name is Required.",
          pixelIdToolTip:"Pixel ID is Required.",
          selectTargetAreaToolTip:"Select Target Area..",
          pixelAccessTokenToolTip:"Pixel Access Token is Required.",
          pixelEventCodeToolTip:"Event Code is Optional.",
        }
   },
   interestFinderPage:{
    interest:"Interest",
    interestSuggested:"Interest Suggestions",
    data:"No Data found",
    description:"Try changing the filters or search term",
    download:"Download",
    copy:"Copy",
    search:"Search",
    searchHere:"Search Here",
   },

   graphPage:{
    purchase:"Purchase",
    checkout:"Checkout",
    addToCart:"Add to Cart",
    contentView:"Content View",
    search:"Search",
   },

   dataPicker:{
     today:"Today",
     yesterDay:"Yesterday",
     lastSevenDays:"Last 7 days",
     lastFiftyenDays:"Last 15 days",
     thirtyDays:"Last 30 days",
     apply:"Apply",
     cancle:"Cancel",
   }
};

export default translations;
