import {MediaCard, VideoThumbnail} from '@shopify/polaris';
import React from 'react';
import {
    PlayMinor
  } from '@shopify/polaris-icons';
 function VideoCard ({frameData,text,link}){
    return(
       
     <MediaCard
      title={text}
      description={`In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business.`}
        >
        <a href={link} target='blank' className='underlineRemove'>
        <VideoThumbnail
        videoLength={80}
        thumbnailUrl={frameData}
        align={"right"}
      />
      </a>
    </MediaCard>
    )
 }
 export default VideoCard;