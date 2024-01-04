
import {InlineGrid} from '@shopify/polaris';
import React from 'react';
import VideoCard from '../VideoCard/VideoCard';

function Videos() {
   
  return (
    <div className='marginTop20'>
    <InlineGrid gap={200} columns={{xs:1,sm:1}}>
        <VideoCard frameData={'src/Images/video.jpg'} text={"How to create a dedicated link for a influencer/affiliate"} link={"https://www.youtube.com/watch?v=uCsAuJDP3aY"}/>
        <VideoCard frameData={'src/Images/video.jpg'} text={"Create short links with discount for Social media and email campaigns"} link={"https://www.youtube.com/watch?v=9ECTDT36PHs&t=2s"}/> 
        <VideoCard frameData={'src/Images/video.jpg'} text={"Create short links with custom announcement bar for Social media and email campaigns"} link={"https://www.youtube.com/watch?v=5DL8wKVqvCk"}/> 
    </InlineGrid>
    </div>
   
    
  );
}
export default Videos;