<?php

namespace App\Models\Pixel;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiktokPixel extends Model
{
    use HasFactory;
    protected $fillable = [
        'pixel_id','pixel_name','shop_id','type','collection','tag','access_token','test_token','utm_campaign','utm_source','utm_medium','status','created_at','updated_at'
    ];
}
