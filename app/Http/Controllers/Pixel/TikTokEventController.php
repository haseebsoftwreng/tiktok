<?php

namespace App\Http\Controllers\Pixel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Jobs\Pixel\TikTokEventJob;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class TikTokEventController extends Controller
{
    public function tiktokEvents(Request $request)
    {

        $shop = User::where('id', $request->account_id)->first();
        $event = $request->data;
        $userIp = $request->user_ip;
        $userAgent = $request->user_agent;
        $ttclid = $request->ttclid;
        $ttp = $request->ttp;
        // $date = Carbon::now()->toDateString();
        $date = Carbon::now()->utc()->toDateString();
        if(!isset($event['name'])){
            info($request);
        } 
        if (isset($event['timestamp'])) :
            $dateString = explode("T", $event['timestamp'], 2);
            $date = $dateString[0];
        endif;
        if ($shop) :
            if ($event['name'] == "product_viewed" || $event['name'] == 'checkout_completed' || $event['name'] == "product_added_to_cart" || $event['name'] == 'checkout_started' || $event['name'] == 'payment_info_submitted' || $event['name'] == "page_viewed"  || $event['name'] == 'collection_viewed' || $event['name'] == 'search_submitted' || $event['name'] == 'cart_view') :
                TikTokEventJob::dispatch($shop->id ,$shop, $event, $date, $userIp, $userAgent, $ttclid, $ttp);
            endif;
        endif;
        return [$shop];
    }
}
