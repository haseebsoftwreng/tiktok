@extends('shopify-app::layouts.default')
        @viteReactRefresh
        @vite('resources/js/app.js')
@section('content')

        <div id="root"></div>
        {{-- <div  id = "collections" data = '{{ $collectionss  }}'></div>
        <div  id = "productTags" data = '{{ $productTags  }}'></div> --}}
        <div  id = "billingEnabled" data = '{{ env('SHOPIFY_BILLING_ENABLED') }}'></div>
        <div id="shopName" data="{{ $shopDomain ?? Auth::user()->name }}"></div>
@endsection

<!-- Meta Pixel Code -->
<script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '202743885774892');
        fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=202743885774892&ev=PageView&noscript=1"
/></noscript>
        <!-- End Meta Pixel Code -->
 <script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="fe348c98-e814-4df3-a8b6-4950adfcef35";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>
 <!--window.$crisp=[];window.CRISP_WEBSITE_ID="8305e843-f408-4c73-8b4d-c65666845987";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();-->