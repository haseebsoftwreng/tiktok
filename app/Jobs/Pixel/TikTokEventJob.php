<?php

namespace App\Jobs\Pixel;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Pixel\TikTokPixel;
use App\Models\Pixel\TikTokAnalytic;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class TikTokEventJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $shop;
    protected $event;
    protected $date;
    protected $shopId;
    protected $userIp;
    protected $userAgent;
    protected $ttclid;
    protected $ttp;

    /**
     * Create a new job instance.
     */
    public function __construct($shopId ,$shop, $event, $date, $userIp, $userAgent, $ttclid, $ttp)
    {
        $this->shop = $shop;
        $this->event = $event;
        $this->date = $date;
        $this->shopId = $shopId;
        $this->userIp = $userIp;
        $this->userAgent = $userAgent;
        $this->ttclid = $ttclid;
        $this->ttp = $ttp;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $pixels = TikTokPixel::where('shop_id', $this->shopId)->where('status', 1)->get();
        foreach ($pixels as $pixel) :
            if (isset($pixel->access_token) && isset($pixel->pixel_id)) :
                $eventPixels = TikTokAnalytic::where([
                    ['pixel_id', '=', $pixel->id],
                    ['titokPixelId', '=', $pixel->pixel_id],
                    ['eventDate', '=', $this->date ]
                ])->first();
                $headers = [
                    'Access-Token' => $pixel->access_token,
                    'Content-Type' => 'application/json',
                ];
                $data = [
                    "pixel_code" => $pixel->pixel_id,
                    "event_id" => $this->event['id'],
                    "timestamp" => isset($this->event['timestamp']) ? $this->event['timestamp'] : Carbon::now('UTC')->format('Y-m-d\TH:i:s.u\Z'),
                    "context" => [
                        "page" => [
                            'url' => $this->event['context']['document']['location']['href'],
                            'referrer' => $this->event['context']['window']['location']['origin']
                        ],
                        "user_agent" =>isset($this->userAgent)  && $this->userAgent != 'null' ?$this->userAgent : " ",
                        "ip" => isset($this->userIp) && $this->userIp != 'null' ? $this->userIp : " ",
                    ],
                ];
                if (isset($pixel->utm_source) && isset($pixel->utm_medium) && isset($pixel->utm_campaign)) :
                    $data['context']['page']['url'] = $this->event['context']['document']['location']['href'] . "?utm_source=" . $pixel->utm_source . "&utm_medium=" . $pixel->utm_medium . "&utm_campaign=" . $pixel->utm_campaign;
                endif;
                if (isset($pixel->test_token)) :
                    $data["test_event_code"] = $pixel->test_token;
                endif;
                if (isset($this->ttclid) && !empty($this->ttclid)) {
                    $data['context']['ad']['callback'] = $this->ttclid;
                }
                if (isset($this->ttp) && !empty($this->ttp)) {
                    $data['context']['user']['ttp'] = $this->ttp;
                }
                $data['context']["user"]["external_id"] = isset($this->event['clientId']) ? hash("sha256", $this->event['clientId']) : hash("sha256", rand(1, 100000)) ;
                // if($this->event['name'] =='page_viewed'){
                //     $data['event'] = 'Page View';
                //     $result=Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/',$data);
                //     info($result);
                // }
                if ($this->event['name'] == "search_submitted") :
                    $data['event'] = 'Search';
                    $data['properties']['query'] = $this->event['data']['searchResult']['query'];
                    $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                    // info($result);
                    if (isset($result['message'])) :
                        if ($result['message'] == "OK") {
                            if ($eventPixels != null) {
                                TikTokAnalytic::where([
                                    ['titokPixelId', '=', $pixel->pixel_id],
                                    ['eventDate', '=', $this->date],
                                    ['pixel_id', '=', $pixel->id]
                                ])->update(['search' => intval($eventPixels->search) + 1]);
                            } else {
                                TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'search' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                            }
                        }
                    endif;
                endif;
                if ($this->event['name'] == 'product_viewed') :
                    if ($pixel->type == 'Collections') :
                        $collections = json_decode($pixel->collection);
                        foreach ($collections as $collection) {
                            $response = $this->shop->api()->graph(
                                'query{
                                    collectionByHandle(handle: "' . $collection . '") {
                                        hasProduct(id: "gid://shopify/Product/' . $this->event['data']['productVariant']['product']['id'] . '")
                                    }
                                }'
                            );
                            sleep(2);
                            $flag = 0;
                            if (isset($response['body']['data']['collectionByHandle']['hasProduct'])) {
                                $flag = $response['body']['data']['collectionByHandle']['hasProduct'];
                            }

                            if ($flag == 1) :
                                $data['event'] = 'ViewContent';
                                $data['properties']['contents'] = [
                                    [
                                        "price" => isset($this->event['data']['productVariant']['price']['amount']) ? $this->event['data']['productVariant']['price']['amount'] : "defaultPrice". rand(1, 100000),
                                        "content_type" => "product_group",
                                        "content_id" => isset($this->event['data']['productVariant']['product']['id']) ?$this->event['data']['productVariant']['product']['id'] : "defaultId". rand(1, 100000),
                                        "quantity" => 1,
                                        "content_name"  => isset($this->event['data']['productVariant']['product']['title']) ? $this->event['data']['productVariant']['product']['title'] : "defaultTitle". rand(1, 100000),
                                    ],
                                ];
                                $data['properties']['currency'] = isset($this->event['data']['productVariant']['price']['currencyCode']) ? $this->event['data']['productVariant']['price']['currencyCode'] : $this->shop->currency;
                                $data['properties']['value'] = isset($this->event['data']['productVariant']['price']['amount']) ? $this->event['data']['productVariant']['price']['amount'] : "1";
                                $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                                // info($result);
                                if (isset($result['message'])) :
                                    if ($result['message'] == "OK") {
                                        if ($eventPixels != null) {
                                            TikTokAnalytic::where([
                                                ['titokPixelId', '=', $pixel->pixel_id],
                                                ['eventDate', '=', $this->date],
                                                ['pixel_id', '=', $pixel->id]
                                            ])->update(['viewContent' => intval($eventPixels->viewContent) + 1]);
                                        } else {
                                            TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'viewContent' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                        }
                                    }
                                endif;
                                break;
                            endif;
                        }
                    elseif ($pixel->type == 'Entire Store') :
                        $data['event'] = 'ViewContent';
                        $data['properties']['contents'] = [
                            [
                                "price" => isset($this->event['data']['productVariant']['price']['amount']) ? $this->event['data']['productVariant']['price']['amount'] : "defaultPrice". rand(1, 100000),
                                "content_type" => "product_group",
                                "content_id" => isset($this->event['data']['productVariant']['product']['id']) ? $this->event['data']['productVariant']['product']['id'] : "defaultId". rand(1, 100000),
                                "quantity" => 1,
                                "content_name"  => isset($this->event['data']['productVariant']['product']['title']) ?  $this->event['data']['productVariant']['product']['title'] : "defaultTitle" . rand(1, 100000),
                            ],
                        ];
                        $data['properties']['currency'] = isset($this->event['data']['productVariant']['price']['currencyCode']) ? $this->event['data']['productVariant']['price']['currencyCode'] : $this->shop->currency;
                        $data['properties']['value'] = isset($this->event['data']['productVariant']['price']['amount']) ? $this->event['data']['productVariant']['price']['amount']: "1";
                        $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                        // info($result);
                        if (isset($result['message'])) :
                            if ($result['message'] == "OK") {
                                if ($eventPixels != null) {
                                    TikTokAnalytic::where([
                                        ['titokPixelId', '=', $pixel->pixel_id],
                                        ['eventDate', '=', $this->date],
                                        ['pixel_id', '=', $pixel->id]
                                    ])->update(['viewContent' => intval($eventPixels->viewContent) + 1]);
                                } else {
                                    TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'viewContent' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                }
                            }
                        endif;
                    elseif ($pixel->type == 'Tags') :
                        $tags = json_decode($pixel->tag);
                        foreach ($tags as $tag) {
                            $response = $this->shop->api()->graph(
                                'query{
                                    product(id:"gid://shopify/Product/' . $this->event['data']['productVariant']['product']['id'] . '") {
                                        tags
                                      }
                                }'
                            );
                            $flag = $response['body']['data']['product']['tags'];
                            $tagsArray = $flag->toArray();
                            if (in_array($tag, $tagsArray)) :
                                $data['event'] = 'ViewContent';
                                $data['properties']['contents'] = [
                                    [
                                        "price" => isset($this->event['data']['productVariant']['price']['amount']) ? $this->event['data']['productVariant']['price']['amount'] : "1",
                                        "content_type" => "product_group",
                                        "content_id" => isset($this->event['data']['productVariant']['product']['id']) ?$this->event['data']['productVariant']['product']['id'] : "defaultId". rand(1, 100000),
                                        "quantity" => 1,
                                        "content_name"  => isset($this->event['data']['productVariant']['product']['title']) ?  $this->event['data']['productVariant']['product']['title'] : "defaultTitle". rand(1, 100000),
                                    ],
                                ];
                                $data['properties']['currency'] = isset($this->event['data']['productVariant']['price']['currencyCode']) ? $this->event['data']['productVariant']['price']['currencyCode'] : $this->shop->currency;
                                $data['properties']['value'] = isset($this->event['data']['productVariant']['price']['amount']) ? $this->event['data']['productVariant']['price']['amount'] : "1";
                                $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                                // info($result);
                                if (isset($result['message'])) :
                                    if ($result['message'] == "OK") {
                                        if ($eventPixels != null) {
                                            TikTokAnalytic::where([
                                                ['titokPixelId', '=', $pixel->pixel_id],
                                                ['eventDate', '=', $this->date],
                                                ['pixel_id', '=', $pixel->id]
                                            ])->update(['viewContent' => intval($eventPixels->viewContent) + 1]);
                                        } else {
                                            TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'viewContent' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                        }
                                    }
                                endif;
                                break;
                            endif;
                        }
                    endif;
                endif;
                if ($this->event['name'] == 'product_added_to_cart') :
                    if ($pixel->type == 'Collections') :
                        $collections = json_decode($pixel->collection);
                        foreach ($collections as $collection) {
                            $response = $this->shop->api()->graph(
                                'query{
                                    collectionByHandle(handle: "' . $collection . '") {
                                        hasProduct(id: "gid://shopify/Product/' . $this->event['data']['cartLine']['merchandise']['product']['id'] . '")
                                    }
                                }'
                            );
                            sleep(2);
                            $flag = 0;
                            if (isset($response['body']['data']['collectionByHandle']['hasProduct'])) {
                                $flag = $response['body']['data']['collectionByHandle']['hasProduct'];
                            }

                            if ($flag == 1) :
                                $data['event'] = 'AddToCart';
                                $data['properties']['contents'] = [
                                    [
                                        "price" => isset($this->event['data']['cartLine']['merchandise']['price']['amount']) ? $this->event['data']['cartLine']['merchandise']['price']['amount'] : "1",
                                        "content_type"  => "product_group",
                                        "content_id"    => isset($this->event['data']['cartLine']['merchandise']['id']) ? $this->event['data']['cartLine']['merchandise']['id'] : "defaultId" . rand(1, 100000),
                                        "quantity"      => 1,
                                        "content_name"  => isset($this->event['data']['cartLine']['merchandise']['product']['title']) ? $this->event['data']['cartLine']['merchandise']['product']['title'] : "defaultName" . rand(1, 100000)
                                    ],
                                ];
                                $data['properties']['currency'] = isset($this->event['data']['cartLine']['cost']['totalAmount']['currencyCode']) ? $this->event['data']['cartLine']['cost']['totalAmount']['currencyCode'] : $this->shop->currency;
                                $data['properties']['value'] = isset($this->event['data']['cartLine']['cost']['totalAmount']['amount']) ? $this->event['data']['cartLine']['cost']['totalAmount']['amount'] : "1";
                                $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                                // info($result);
                                if (isset($result['message'])) :
                                    if ($result['message'] == "OK") {
                                        if ($eventPixels != null) {
                                            TikTokAnalytic::where([
                                                ['titokPixelId', '=', $pixel->pixel_id],
                                                ['eventDate', '=', $this->date],
                                                ['pixel_id', '=', $pixel->id]
                                            ])->update(['addtoCart' => intval($eventPixels->addtoCart) + 1]);
                                        } else {
                                            TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'addtoCart' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                        }
                                    }
                                endif;
                                break;
                            endif;
                        }
                    elseif ($pixel->type == 'Entire Store') :
                        $data['event'] = 'AddToCart';
                        $data['properties']['contents'] = [
                            [
                                "price" => isset($this->event['data']['cartLine']['merchandise']['price']['amount']) ? $this->event['data']['cartLine']['merchandise']['price']['amount'] : "1",
                                "content_type"  => "product_group",
                                "content_id"    => isset($this->event['data']['cartLine']['merchandise']['id']) ? $this->event['data']['cartLine']['merchandise']['id'] : "defaultId" . rand(1, 100000),
                                "quantity"      => 1,
                                "content_name"  => isset($this->event['data']['cartLine']['merchandise']['product']['title']) ? $this->event['data']['cartLine']['merchandise']['product']['title'] : "Default Title" . rand(1, 100000)
                            ],
                        ];
                        $data['properties']['currency'] = isset($this->event['data']['cartLine']['cost']['totalAmount']['currencyCode']) ? $this->event['data']['cartLine']['cost']['totalAmount']['currencyCode'] : $this->shop->currency;
                        $data['properties']['value'] = isset($this->event['data']['cartLine']['cost']['totalAmount']['amount']) ? $this->event['data']['cartLine']['cost']['totalAmount']['amount'] : "1";
                        $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                        // info($result);
                        if (isset($result['message'])) :
                            if ($result['message'] == "OK") {
                                if ($eventPixels != null) {
                                    TikTokAnalytic::where([
                                        ['titokPixelId', '=', $pixel->pixel_id],
                                        ['eventDate', '=', $this->date],
                                        ['pixel_id', '=', $pixel->id]
                                    ])->update(['addtoCart' => intval($eventPixels->addtoCart) + 1]);
                                } else {
                                    TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'addtoCart' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                }
                            }
                        endif;
                    elseif ($pixel->type == 'Tags') :
                        $tags = json_decode($pixel->tag);
                        foreach ($tags as $tag) {
                            $response = $this->shop->api()->graph(
                                'query{
                                    product(id: "gid://shopify/Product/' . $this->event['data']['cartLine']['merchandise']['product']['id'] . '") {
                                        tags
                                      }
                                }'
                            );
                            $flag = $response['body']['data']['product']['tags'];
                            $tagsArray = $flag->toArray();
                            if (in_array($tag, $tagsArray)) :
                                $data['event'] = 'AddToCart';
                                $data['properties']['contents'] = [
                                    [
                                        "price" => isset($this->event['data']['cartLine']['merchandise']['price']['amount']) ? $this->event['data']['cartLine']['merchandise']['price']['amount'] : "defaultPrice" . rand(1, 100000),
                                        "content_type"  => "product_group",
                                        "content_id"    => isset($this->event['data']['cartLine']['merchandise']['id']) ? $this->event['data']['cartLine']['merchandise']['id'] : "defaultId" . rand(1, 100000),
                                        "quantity"      => 1,
                                        "content_name"  => isset($this->event['data']['cartLine']['merchandise']['product']['title']) ? $this->event['data']['cartLine']['merchandise']['product']['title'] : "defaultTitle" . rand(1, 100000)
                                    ],
                                ];
                                $data['properties']['currency'] = isset($this->event['data']['cartLine']['cost']['totalAmount']['currencyCode']) ? $this->event['data']['cartLine']['cost']['totalAmount']['currencyCode'] : $this->shop->currency;
                                $data['properties']['value'] = isset($this->event['data']['cartLine']['cost']['totalAmount']['amount']) ? $this->event['data']['cartLine']['cost']['totalAmount']['amount'] : "1";
                                $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                                // info($result);
                                if (isset($result['message'])) :
                                    if ($result['message'] == "OK") {
                                        if ($eventPixels != null) {
                                            TikTokAnalytic::where([
                                                ['titokPixelId', '=', $pixel->pixel_id],
                                                ['eventDate', '=', $this->date],
                                                ['pixel_id', '=', $pixel->id]
                                            ])->update(['addtoCart' => intval($eventPixels->addtoCart) + 1]);
                                        } else {
                                            TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'addtoCart' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                        }
                                    }
                                endif;
                                break;
                            endif;
                        }
                    endif;
                endif;
                if ($this->event['name'] == 'checkout_started') :
                    if ($pixel->type == 'Collections') :
                        $collections = json_decode($pixel->collection);
                        $productIds = $this->event['data']['checkout']['lineItems'];
                        $content_ids = array();
                        $data['event'] = 'InitiateCheckout';
                        $data['properties']['contents'] = [];
                        $totalPrice  = 0;
                        foreach ($collections as $collection) {
                            foreach ($productIds as $productId) :
                                $response = $this->shop->api()->graph(
                                    'query{
                                    collectionByHandle(handle: "' . $collection . '") {
                                        hasProduct(id: "gid://shopify/Product/' . $productId['variant']['product']['id'] . '")
                                        }
                                    }'
                                );
                                sleep(2);
                                $flag = 0;
                                if (isset($response['body']['data']['collectionByHandle']['hasProduct'])) {
                                    $flag = $response['body']['data']['collectionByHandle']['hasProduct'];
                                }
                                if ($flag == 1) :
                                    $title = "";
                                    if (isset($productId['variant']['title'])) {
                                        if ($productId['variant']['title'] != "Default Title") {
                                            $title = $productId['title'] . "-" . $productId['variant']['title'];
                                        } else {
                                            $title = $productId['title'];
                                        }
                                    } else {
                                        $title = $productId['title'];
                                    }
                                    array_push($content_ids, $productId['id']);
                                    array_push(
                                        $data['properties']['contents'],
                                        [
                                            'content_id' => $productId['id'],
                                            'quantity' => $productId['quantity'],
                                            'content_name' => $title,
                                            'content_type'  => "product_group",
                                            'price' => ($productId['variant']['price']['amount'] * $productId['quantity'])
                                        ]
                                    );
                                    $totalPrice = $totalPrice + ($productId['variant']['price']['amount'] * $productId['quantity']);
                                endif;
                            endforeach;
                        }
                        if (count($content_ids) != 0) :
                            $data['properties']['currency'] = $this->event['data']['checkout']['currencyCode'];
                            $data['properties']['value'] = $totalPrice;
                            $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                            // info($result);
                            if (isset($result['message'])) :
                                if ($result['message'] == "OK") {
                                    if ($eventPixels != null) {
                                        TikTokAnalytic::where([
                                            ['titokPixelId', '=', $pixel->pixel_id],
                                            ['eventDate', '=', $this->date],
                                            ['pixel_id', '=', $pixel->id]
                                        ])->update(['initiateCheckout' => intval($eventPixels->initiateCheckout) + 1]);
                                    } else {
                                        TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'initiateCheckout' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                    }
                                }
                            endif;
                        endif;
                    elseif ($pixel->type == 'Entire Store') :
                        $productIds = $this->event['data']['checkout']['lineItems'];
                        $content_idsByEntire = array();
                        $data['event'] = 'InitiateCheckout';
                        $data['properties']['contents'] = [];
                        foreach ($productIds as $productId) :
                            $title = "";
                            if (isset($productId['variant']['title'])) {
                                if ($productId['variant']['title'] != "Default Title") {
                                    $title = $productId['title'] . "-" . $productId['variant']['title'];
                                } else {
                                    $title = $productId['title'];
                                }
                            } else {
                                $title = $productId['title'];
                            }
                            array_push($content_idsByEntire, $productId['id']);
                            array_push($data['properties']['contents'], ['content_id' => $productId['id'], 'quantity' => $productId['quantity'], 'content_name' => $title, 'content_type'  => "product_group", 'price' => ($productId['variant']['price']['amount']) * $productId['quantity']]);
                        endforeach;
                        $data['properties']['currency'] = isset($this->event['data']['checkout']['currencyCode']) ? $this->event['data']['checkout']['currencyCode'] : $this->shop->currency;
                        $data['properties']['value'] = isset($this->event['data']['checkout']['totalPrice']['amount']) ? $this->event['data']['checkout']['totalPrice']['amount']: "1" ;
                        $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                        // info($result);
                        if (isset($result['message'])) :
                            if ($result['message'] == "OK") {
                                if ($eventPixels != null) {
                                    TikTokAnalytic::where([
                                        ['titokPixelId', '=', $pixel->pixel_id],
                                        ['eventDate', '=', $this->date],
                                        ['pixel_id', '=', $pixel->id]
                                    ])->update(['initiateCheckout' => intval($eventPixels->initiateCheckout) + 1]);
                                } else {
                                    TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'initiateCheckout' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                }
                            }
                        endif;
                    elseif ($pixel->type == 'Tags') :
                        $tags = json_decode($pixel->tag);
                        $productIds = $this->event['data']['checkout']['lineItems'];
                        $content_idsBytag = array();
                        $data['event'] = 'InitiateCheckout';
                        $data['properties']['contents'] = [];
                        $totalPriceByTag  = 0;
                        foreach ($productIds as $productId) {
                            $response = $this->shop->api()->graph(
                                'query{
                                    product(id: "gid://shopify/Product/' . $productId['variant']['product']['id'] . '") {
                                        tags
                                      }
                                }'
                            );
                            $flag = $response['body']['data']['product']['tags'];
                            $tagsArray = $flag->toArray();
                            // array_push($totalTags,$tagsArray);
                            $checkTag = array_intersect($tagsArray, $tags);
                            if (count($checkTag) != 0) {
                                $title = "";
                                if (isset($productId['variant']['title'])) {
                                    if ($productId['variant']['title'] != "Default Title") {
                                        $title = $productId['title'] . "-" . $productId['variant']['title'];
                                    } else {
                                        $title = $productId['title'];
                                    }
                                } else {
                                    $title = $productId['title'];
                                }
                                array_push($content_idsBytag, $productId['id']);
                                array_push($data['properties']['contents'], ['content_id' => $productId['id'], 'quantity' => $productId['quantity'], 'content_name' => $title, 'content_type'  => "product_group", 'price' => ($productId['variant']['price']['amount']) * $productId['quantity']]);
                                $totalPriceByTag = $totalPriceByTag + ($productId['variant']['price']['amount'] * $productId['quantity']);
                            }
                        }
                        if (count($content_idsBytag) != 0) :
                            $data['properties']['currency'] = $this->event['data']['checkout']['currencyCode'];
                            $data['properties']['value'] = $totalPriceByTag;
                            $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                            // info($result);
                            if (isset($result['message'])) :
                                if ($result['message'] == "OK") {
                                    if ($eventPixels != null) {
                                        TikTokAnalytic::where([
                                            ['titokPixelId', '=', $pixel->pixel_id],
                                            ['eventDate', '=', $this->date],
                                            ['pixel_id', '=', $pixel->id]
                                        ])->update(['initiateCheckout' => intval($eventPixels->initiateCheckout) + 1]);
                                    } else {
                                        TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'initiateCheckout' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                    }
                                }
                            endif;
                        endif;
                    endif;
                endif;
                if ($this->event['name'] == 'checkout_completed') :
                    $data['event'] = 'CompletePayment';
                    $data['properties']['contents'] = [];
                    if ($pixel->type == 'Collections') :
                        $collections = json_decode($pixel->collection);
                        $productIds = $this->event['data']['checkout']['lineItems'];
                        $content_ids = array();
                        $totalPrice  = 0;
                        $quantityByCollection  = 0;
                        foreach ($collections as $collection) {
                            foreach ($productIds as $productId) :
                                $response = $this->shop->api()->graph(
                                    'query{
                                    collectionByHandle(handle: "' . $collection . '") {
                                        hasProduct(id: "gid://shopify/Product/' . $productId['variant']['product']['id'] . '")
                                        }
                                    }'
                                );
                                sleep(2);
                                $flag = 0;
                                if (isset($response['body']['data']['collectionByHandle']['hasProduct'])) {
                                    $flag = $response['body']['data']['collectionByHandle']['hasProduct'];
                                }

                                if ($flag == 1) :
                                    $title = "";
                                    if (isset($productId['variant']['title'])) {
                                        if ($productId['variant']['title'] != "Default Title") {
                                            $title = $productId['title'] . "-" . $productId['variant']['title'];
                                        } else {
                                            $title = $productId['title'];
                                        }
                                    } else {
                                        $title = $productId['title'];
                                    }
                                    array_push($content_ids, $productId['variant']['id']);
                                    array_push($data['properties']['contents'], ['content_id' => $productId['id'], 'quantity' => $productId['quantity'], 'content_name' => $title, 'price' => $productId['variant']['price']['amount'] * $productId['quantity'], 'content_type'  => "product_group"]);
                                    $totalPrice = $totalPrice + ($productId['variant']['price']['amount'] * $productId['quantity']);
                                    $quantityByCollection = $quantityByCollection + $productId['quantity'];
                                endif;
                            endforeach;
                        }
                        if (count($content_ids) != 0) :

                            if (isset($this->event['data']['checkout']['phone']) && $this->event['data']['checkout']['phone'] != 'null') :
                                $data["context"]["user"]["phone_number"] = hash("sha256", $this->event['data']['checkout']['phone']);
                            endif;
                            if (isset($this->event['data']['checkout']['email']) && $this->event['data']['checkout']['email'] != 'null') :
                                $data["context"]["user"]["email"] = hash("sha256", $this->event['data']['checkout']['email']);
                            endif;
                            $data['properties']['currency'] = isset($this->event['data']['checkout']['currencyCode']) ? $this->event['data']['checkout']['currencyCode'] : $this->shop->currency;
                            $data['properties']['value'] = $totalPrice;
                            $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                            // info($result);
                            if (isset($result['message'])) :
                                if ($result['message'] == "OK") {
                                    if ($eventPixels != null) {
                                        TikTokAnalytic::where([
                                            ['titokPixelId', '=', $pixel->pixel_id],
                                            ['eventDate', '=', $this->date],
                                            ['pixel_id', '=', $pixel->id]
                                        ])->update(['compeletePayment' => intval($eventPixels->compeletePayment) + 1]);
                                    } else {
                                        TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'compeletePayment' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                    }
                                }
                            endif;
                        endif;
                    elseif ($pixel->type == 'Entire Store') :
                        $productIds = $this->event['data']['checkout']['lineItems'];
                        $content_idsByEntire = array();
                        $quatityByEntire = 0;
                        foreach ($productIds as $productId) :
                            $title = "";
                            if (isset($productId['variant']['title'])) {
                                if ($productId['variant']['title'] != "Default Title") {
                                    $title = $productId['title'] . "-" . $productId['variant']['title'];
                                } else {
                                    $title = $productId['title'];
                                }
                            } else {
                                $title = $productId['title'];
                            }
                            array_push($content_idsByEntire, $productId['variant']['id']);
                            array_push($data['properties']['contents'], ['content_id' => $productId['id'], 'quantity' => $productId['quantity'], 'content_name' => $title, 'price' => $productId['variant']['price']['amount'] * $productId['quantity'], 'content_type'  => "product_group"]);
                            $quatityByEntire = $quatityByEntire + $productId['quantity'];
                        endforeach;
                        if (isset($this->event['data']['checkout']['phone']) && $this->event['data']['checkout']['phone'] != 'null') :
                            $data["context"]["user"]["phone_number"] = hash("sha256", $this->event['data']['checkout']['phone']);
                        endif;
                        if (isset($this->event['data']['checkout']['email']) && $this->event['data']['checkout']['email'] != 'null') :
                            $data["context"]["user"]["email"] = hash("sha256", $this->event['data']['checkout']['email']);
                        endif;
                        $data['properties']['currency'] = isset($this->event['data']['checkout']['currencyCode']) ? $this->event['data']['checkout']['currencyCode'] : $this->shop->currency;
                        $data['properties']['value'] = isset($this->event['data']['checkout']['totalPrice']['amount']) ?  $this->event['data']['checkout']['totalPrice']['amount']: "1";
                        $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                        // info($result);
                        if (isset($result['message'])) :
                            if ($result['message'] == "OK") {
                                if ($eventPixels != null) {
                                    TikTokAnalytic::where([
                                        ['titokPixelId', '=', $pixel->pixel_id],
                                        ['eventDate', '=', $this->date],
                                        ['pixel_id', '=', $pixel->id]
                                    ])->update(['compeletePayment' => intval($eventPixels->compeletePayment) + 1]);
                                } else {
                                    TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'compeletePayment' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                }
                            }
                        endif;
                    elseif ($pixel->type == 'Tags') :
                        $tags = json_decode($pixel->tag);
                        $productIds = $this->event['data']['checkout']['lineItems'];
                        $content_idsBytag = array();
                        $totalPriceByTag  = 0;
                        $quantityBytag = 0;
                        $itemsByTag = array();
                        foreach ($productIds as $productId) {
                            $response = $this->shop->api()->graph(
                                'query{
                                    product(id: "gid://shopify/Product/' . $productId['variant']['product']['id'] . '") {
                                        tags
                                      }
                                }'
                            );
                            $flag = $response['body']['data']['product']['tags'];
                            $tagsArray = $flag->toArray();
                            // array_push($totalTags,$tagsArray);
                            $checkTag = array_intersect($tagsArray, $tags);
                            if (count($checkTag) != 0) {
                                $title = "";
                                if (isset($productId['variant']['title'])) {
                                    if ($productId['variant']['title'] != "Default Title") {
                                        $title = $productId['title'] . "-" . $productId['variant']['title'];
                                    } else {
                                        $title = $productId['title'];
                                    }
                                } else {
                                    $title = $productId['title'];
                                }
                                array_push($content_idsBytag, $productId['variant']['id']);
                                array_push($data['properties']['contents'], ['content_id' => $productId['id'], 'quantity' => $productId['quantity'], 'content_name' => $title, 'price' => $productId['variant']['price']['amount'] * $productId['quantity'], 'content_type'  => "product_group"]);
                                $totalPriceByTag = $totalPriceByTag + ($productId['variant']['price']['amount'] * $productId['quantity']);
                                $quantityBytag = $quantityBytag + $productId['quantity'];
                            }
                        }
                        if (count($content_idsBytag) != 0) :
                            if (isset($this->event['data']['checkout']['phone']) && $this->event['data']['checkout']['phone'] != 'null') :
                                $data["context"]["user"]["phone_number"] = hash("sha256", $this->event['data']['checkout']['phone']);
                            endif;
                            if (isset($this->event['data']['checkout']['email']) && $this->event['data']['checkout']['email'] != 'null') :
                                $data["context"]["user"]["email"] = hash("sha256", $this->event['data']['checkout']['email']);
                            endif;
                            $data['properties']['currency'] = isset($this->event['data']['checkout']['currencyCode']) ? $this->event['data']['checkout']['currencyCode'] : $this->shop->currency;
                            $data['properties']['value'] =  $totalPriceByTag;
                            $result = Http::withHeaders($headers)->post('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', $data);
                            // info($result);
                            if (isset($result['message'])) :
                                if ($result['message'] == "OK") {
                                    if ($eventPixels != null) {
                                        TikTokAnalytic::where([
                                            ['titokPixelId', '=', $pixel->pixel_id],
                                            ['eventDate', '=', $this->date],
                                            ['pixel_id', '=', $pixel->id]
                                        ])->update(['compeletePayment' => intval($eventPixels->compeletePayment) + 1]);
                                    } else {
                                        TikTokAnalytic::insert(['pixel_id' => $pixel->id, 'titokPixelId' => $pixel->pixel_id, 'compeletePayment' => 1, 'eventDate' => $this->date, 'created_at' => Carbon::now()]);
                                    }
                                }
                            endif;
                        endif;
                    endif;
                endif;
            endif;
        endforeach;
    }
}
