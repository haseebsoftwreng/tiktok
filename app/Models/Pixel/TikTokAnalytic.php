<?php

namespace App\Models\Pixel;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TikTokAnalytic extends Model
{
    use HasFactory;
    protected $fillable = [
        'id', 'pixel_id', 'titokPixelId', 'compeletePayment', 'initiateCheckout', 'addtoCart', 'viewContent', 'search', 'eventDate', 'created_at', 'updated_at'
     ];
}
