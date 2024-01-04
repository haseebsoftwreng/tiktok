<?php

namespace App\Http\Controllers\Pixel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pixel\TiktokPixel;
use App\Models\Pixel\TikTokAnalytic;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Carbon;

class TiktokPixelController extends Controller
{
    public function saveTiktokPixel (Request $request){
        $shop = auth()->user();
        $input = new TiktokPixel();
        $input->type =  $request->type;
        $input->pixel_id = $request->pixel_id;
        $input->pixel_name = $request->pixel_name;
        $input->shop_id = $shop->id;
        $input->access_token = $request->access_token;
        $input->utm_campaign = isset($request->utm_campaign) ?str_replace(' ', '', $request->utm_campaign): null ;
        $input->utm_source = isset($request->utm_source) ? str_replace(' ', '', $request->utm_source) : null;
        $input->utm_medium = isset($request->utm_medium) ? str_replace(' ', '', $request->utm_medium) : null;
        if (isset($request->test_token)) :
            $input->test_token = $request->test_token;
        endif;
        if ($request->type == "Collections") {
            $dataArray = explode(',', trim($request->collections, '"'));
            $input->collection = json_encode($dataArray);
        } elseif ($request->type == "Tags") {
            $dataArray = explode(',', trim($request->tags, '"'));
            $input->tag = json_encode($dataArray);
        }
        $input->save();
        return response()->json([
            'pixel' => $input
        ], 200);
    }

    public function getCollections()
    {
        $shop = Auth::user();
        $collections = [];
        $custom_collection = $shop->api()->rest('GET', '/admin/custom_collections.json')['body']['custom_collections'];
        $smart_collection = $shop->api()->rest('GET', '/admin/smart_collections.json')['body']['smart_collections'];
        if (count($custom_collection) > 0) {
            foreach ($custom_collection as $data) {
                array_push($collections, ['id' => $data['id'], 'title' => $data['title'], 'handle' => $data['handle'], 'type' => 'custom_collections']);
            }
        }
        if (count($smart_collection) > 0) {
            foreach ($smart_collection as $data) {
                array_push($collections, ['id' => $data['id'], 'title' => $data['title'], 'handle' => $data['handle'], 'type' => 'smart_collections']);
            }
        }
        return $collections;
    }

    public function getTags()
    {
        $shop = Auth::user();
        // FOr getting product Tags
        $response = $shop->api()->graph(
            'query{
                    products(first: 10) {
                        nodes {
                            tags
                        }
                        pageInfo {
                            endCursor
                            hasNextPage
                        }
                    }
        
                }'
        );
        // $product_tags = [];
        // foreach ($response['body']['data']['products']['nodes'] as $node) {
        //     foreach ($node['tags'] as $tag) {
        //         if (isset($tag)) {
        //             array_push($product_tags, $tag);
        //         }
        //     }
        // }
        // $cursor = $response['body']['data']['products']['pageInfo']['endCursor'];
        // return ['tags' => $product_tags, 'cursor' => $cursor];

        $product_tags = [];
        foreach ($response['body']['data']['products']['nodes'] as $node) {
            foreach ($node['tags'] as $tag) {
                if (isset($tag)) {
                    array_push($product_tags, $tag);
                }
            }
        }

        $product_tags = array_unique($product_tags);
        $product_tags = array_values($product_tags);
        $cursor = $response['body']['data']['products']['pageInfo']['endCursor'];
        return ['tags' => $product_tags, 'cursor' => $cursor];
    }

    public function tikTokPixelsGet(){
        $shop = Auth::user();
        $req = $shop->api()->graph('mutation {
            webPixelCreate(webPixel: { settings: "{\"accountID\":\"' . $shop->id . '\"}" }) {
                userErrors {
                    code
                    field
                    message
                }
                webPixel {
                    settings
                    id
                }
            }
          }');
        $pixels = TikTokPixel::where('shop_id', $shop->id)->get();
        return $pixels;
    }

    public function deleteTiktokPixel(Request $request){
        TikTokPixel::where('id', $request->id)->delete();
        return response()->json([
            'data_request'=>$request->id,
            'success' => "Pixel Updated Successfully"
        ], 200);
    }
    public function updateTiktokStatus(Request $request){
        $status =  TikTokPixel::where('id', $request->id)->first();
        if ($status->status != 1) {
            TikTokPixel::where('id', $request->id)->update(['status' => true]);
        } else {
            TikTokPixel::where('id', $request->id)->update(['status' => false]);
        }
        return response()->json([
            'success' => "Status Updated Successfully"
        ], 200);
    }

    public function tiktokInterestFinder(Request $request){
        $data = [
            'advertiser_id' => '7065820657761796097',
            'keyword' => $request->string,
            'limit' => 50
        ];
        $headers=[
            'Access-Token' => "0c182b9a8817dcc3368cc15d13e06a9e7a8dce32",
            'Content-Type' =>'application/json',
        ];
        $result=Http::withHeaders($headers)->GET('https://business-api.tiktok.com/open_api/v1.3/tool/interest_keyword/recommend/',$data);
        return $result;
    }

    public function getTiktokPixelBySearch(Request $request){
        $shop = Auth::user();
        $pixels = TikTokPixel::where([['shop_id', $shop->id],
        ['pixel_name', 'like', "%{$request->string}%"]])->get();
        return $pixels;
    }

    public function getTiktokAnalytics(Request $request){
        $date = Carbon::now()->format('Y-m-d');
        $analytics =  TikTokAnalytic::where([['titokPixelId', '=', $request->id], ['eventDate', '=', $date],['pixel_id', '=', $request->T_id ]])->first();
        return $analytics;
    }
    public function getTiktokAnalyticsByRange(Request $request){
        $startDate = date('y-m-d', strtotime($request->start));
        $endDate = date('y-m-d', strtotime($request->end));
        $analyies = TikTokAnalytic:: where([['titokPixelId', '=', $request->pixelId],['pixel_id', '=', $request->T_id],['eventDate', '>=', "20".$startDate],['eventDate', '<=', "20".$endDate]])->get();
        $countAnalyse = (object)[
            'compeletePayment' => 0,
            'initiateCheckout' => 0,
            'addtoCart' => 0,
            'viewContent' => 0,
            'search' => 0,
        ];
        foreach($analyies as $an):
            $countAnalyse->compeletePayment = $countAnalyse->compeletePayment + intval($an['compeletePayment']);
            $countAnalyse->initiateCheckout = $countAnalyse->initiateCheckout + intval($an['initiateCheckout']);
            $countAnalyse->addtoCart = $countAnalyse->addtoCart + intval($an['addtoCart']);
            $countAnalyse->viewContent = $countAnalyse->viewContent + intval($an['viewContent']);
            $countAnalyse->search = $countAnalyse->search + intval($an['search']);
        endforeach;

        $startDateGraph = Carbon::parse($startDate)->startOfDay();
        $endDateGraph = Carbon::parse($endDate)->endOfDay();
        $interval = $startDateGraph->diff($endDateGraph);

        $allValues = $this->generateAllValues($startDateGraph, $endDateGraph, $interval);
        

        // $analyies = $this->adjustQueryBasedOnInterval($analyies,$interval);

        $result = $this->selectStatementBasedOnInterval($interval,$request)
            ->groupBy($this->groupByFieldBasedOnInterval($interval))->get();

        $mergedData = $this->mergeDataWithAllValues($allValues, $result, $interval,$analyies);

        
        return [
            'countAnalyse' => $countAnalyse,
            'mergedData' => $mergedData,
        ];
    }

    /////////////////Graph Function/////////////
    private function generateAllValues($startDate, $endDate, $interval)
    {
        $allValues = [];
        $currentDate = clone $startDate;
        
        while ($currentDate <= $endDate) {
            switch (true) {
                case $interval->y > 1:
                    $allValues[] = $currentDate->format('Y');
                    $currentDate->modify('+1 year');
                    break;
                case $interval->m > 1  || $interval->y == 1:
                    $allValues[] = $currentDate->format('Y-m');
                    $currentDate->modify('+1 month');
                    break;
                case $interval->d > 7 || $interval->m == 1:
                    $allValues[] =  $currentDate->format('Y-m-d');
                    $currentDate->modify('+1 day');
                    break;
                case $interval->d > 1 && $interval->d < 8:
                    $allValues[] = (int) $currentDate->format('N');
                    $currentDate->modify('+1 day');
                    break;
                default:
                    $allValues[] = $currentDate->format('h:00:00');
                    $currentDate->modify('+1 hour');
                    break;
            }
        }

        return $allValues;
    }

    private function adjustQueryBasedOnInterval($query, $interval)
    {
        // Adjust query based on interval type
        switch (true) {
            case $interval->y > 1:
                //yearly data
                break;
            
            case $interval->m > 1 || $interval->y == 1:
               //monthly data
                break;
            case $interval->d > 7 || $interval->m == 1:

            case $interval->d > 1 && $interval->d < 8:
                //days data
                break;
            default:
               //hourly data
                break;
        }

        return $interval;
        
    }

    private function selectStatementBasedOnInterval($interval,$request)
    {
        $startDate = date('y-m-d', strtotime($request->start));
        $endDate = date('y-m-d', strtotime($request->end));
        $query = TikTokAnalytic::where([
            ['titokPixelId', '=', $request->pixelId],
            ['pixel_id', '=', $request->T_id],
            ['eventDate', '>=', "20" . $startDate],
            ['eventDate', '<=', "20" . $endDate]
        ]);
    
        switch (true) {
            case $interval->y > 1:
                $query->selectRaw('DATE_FORMAT(created_at, "%Y") as year, COUNT(*) as count');
                break;
            case $interval->m > 1 || $interval->y == 1:
                $query->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count');
                break;
            case $interval->d > 7 || $interval->m == 1:
                $query->selectRaw('DATE_FORMAT(created_at, "%Y-%m-%d") as day, COUNT(*) as count');
                break;
            case $interval->d > 1 && $interval->d < 8:
                $query->selectRaw('DAYOFWEEK(created_at) as day, COUNT(*) as count');
                break;
            default:
                $query->selectRaw('DATE_FORMAT(created_at, "%h:00:00") as hour, COUNT(*) as count');
                break;
        }
    
        return $query;
    }

    private function groupByFieldBasedOnInterval($interval)
    {
        switch (true) {
            case $interval->y > 1:
                return 'year';
                break;
            case $interval->m > 1  || $interval->y == 1:
                return 'month';
                break;
            case $interval->d > 1   || $interval->m == 1:
                return 'day';
                break;
            default:
                return 'hour';
                break;
        }
    }

    private function mergeDataWithAllValues($allValues, $result, $interval,$analyies)
    {
        $mergedDataForAnalytic = [];
     
        foreach ($allValues as $value) {
            $exists = $result->contains(function ($item) use ($value, $interval) {
                return $item->{$this->groupByFieldBasedOnInterval($interval)} === $value;
            });
            
            if ($exists && $analyies[0] !== null) {
                $purchaseCounts=$analyies[0]->initiateCheckout;
            } else {
                $purchaseCounts = 0;
            }
            if($interval->d > 1 && $interval->d < 8){
                $mergedDataForAnalytic[] = (object) [
                    "key" => Carbon::now()->startOfWeek()->addDays($value - 1)->format('l'),
                    'value' => $purchaseCounts,
                ];
            }else{
                $mergedDataForAnalytic[] = (object) [
                    "key" => $value,
                    'value' => $purchaseCounts,
                ];
            }
            // $mergedData[] = (object) [
            //     $this->groupByFieldBasedOnInterval($interval) => $value,
            //     'count' => $count,
            // ];
            
        }

        return [
            $mergedDataForAnalytic,
        ];
        
    }

    ////////////////////////////////////////////
}
