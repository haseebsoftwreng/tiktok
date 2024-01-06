import {register} from "@shopify/web-pixels-extension";

register(async (api) => {
  // Bootstrap and insert pixel script tag here
  // var FB_APP_URL = `https://haseebpixel.aipixels.app/api/web/pixel?account_id=${api.settings.accountID}`;
  var Tiktok_APP_URL = `https://8e48-154-192-195-108.ngrok-free.app/api/titok/events?account_id=${api.settings.accountID}`;
  await getUserIP(api);
  var ttclid='';
  // Sample subscribe to page view
  api.analytics.subscribe('all_events', async(event) => {
    console.log('testPixel', event);
    // tiktok click id get from url
    let location = event.context.window.location.href;
    if(location.indexOf('ttclid')>-1){
      let url = new URL(location);
      ttclid = url.searchParams.get('ttclid');
      api.browser.sessionStorage.setItem('ttclid',ttclid);
    }
    submitTiktokEvent(api, event);
  });

  api.analytics.subscribe('cart_view', async(event) =>{
    if(event.context.document.location.pathname == "/cart"){
      console.log("This is custom", event);
      fetch(FB_APP_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: event,
          source_url: api.init.context.document.location.href,
          user_agent: api.init.context.navigator.userAgent,
          user_ip: await api.browser.localStorage.getItem('fbPixeluserIp'),
          fbp:await api.browser.cookie.get('_fbp'),
          fbc:await api.browser.cookie.get('_fbc'),
          c_user:await api.browser.cookie.get('c_user'),
          cartToken : await api.browser.cookie.get('cart'),
          cartCurrency : await api.browser.cookie.get('cart_currency'),
        }),
      })
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  });
 
  // push customer event for Tiktok to your server for processing
  async function submitTiktokEvent(api, event) {
      if (event.name == 'checkout_completed' || event.name == "product_added_to_cart" || event.name == 'checkout_started' || event.name == 'payment_info_submitted' || event.name == 'collection_viewed'|| event.name == 'product_viewed' || event.name == 'search_submitted' || event.name == 'page_viewed') {
        fetch(Tiktok_APP_URL, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: event,
            source_url: api.init.context.document.location.href,
            user_agent: api.init.context.navigator.userAgent,
            user_ip: await api.browser.localStorage.getItem('fbPixeluserIp'),
            ttclid:(ttclid!=''?ttclid:await api.browser.sessionStorage.getItem('ttclid')),
            ttp:await api.browser.cookie.get('_ttp'),
          }),
        })
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      }
  }
  // Get User IP
  async function getUserIP(api) {
    if (!await api.browser.localStorage.getItem('fbPixeluserIp')) {
      var xhr = new XMLHttpRequest();
      var url = "https://www.cloudflare.com/cdn-cgi/trace";
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log("in get Ip function status 200");
          data = this.responseText.trim().split('\n').reduce(function (obj, pair) {
            pair = pair.split('=');
            return obj[pair[0]] = pair[1], obj;
          }, {});
          api.browser.localStorage.setItem('fbPixeluserIp', data.ip);
        }
      };
      xhr.send();
    }
  }

});

