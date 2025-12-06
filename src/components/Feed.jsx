import React from 'react';
import PostCard from './PostCard';
import { FaVideo, FaPhotoVideo } from 'react-icons/fa';
import { MdEmojiEmotions } from "react-icons/md";

const Feed = () => {
  return (
    <div className="flex-1 mx-auto max-w-2xl py-4 px-2 md:px-0">
      {/* 发布框 */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex gap-4 border-b border-gray-100 pb-4">
           <img src="https://i.pravatar.cc/150?img=63" alt="" className="w-10 h-10 rounded-full"/>
           <input 
             type="text" 
             placeholder="What's on your mind? 碗又空了？" 
             className="flex-1 bg-gray-100 rounded-full px-4 outline-none hover:bg-gray-200 cursor-pointer"
            />
        </div>
        <div className="flex justify-evenly pt-3 text-gray-500 font-medium">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md flex-1 justify-center">
                <FaVideo className="text-red-500 text-xl"/> <span className="hidden sm:block">睡播(Live)</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md flex-1 justify-center">
                <FaPhotoVideo className="text-green-500 text-xl"/> <span className="hidden sm:block">炫耀战利品/丑照</span>
            </div>
             <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md flex-1 justify-center">
                <MdEmojiEmotions className="text-yellow-500 text-xl"/> <span className="hidden sm:block">心情/求救</span>
            </div>
        </div>
      </div>

      {/* 帖子列表 (模拟数据) */}
      <PostCard 
        catName="橘猫大黄 (Orange Braincell)"
        time="刚刚"
        content="紧急求助！碗底已经露出大概2毫米了，我感觉我已经三天没吃饭了，我会饿死吗？在线等，挺急的。"
        avatarSrc="https://placekitten.com/50/50" // 使用 placekitten 作为占位符
      />
       <PostCard 
        catName="高冷黑猫 (The Void)"
        time="2小时前"
        content="今天的人类幼崽又想摸我的肚子。我使用了三级抓挠防御。现在家里清净了。"
        imageSrc="https://placekitten.com/600/400"
        avatarSrc="https://placekitten.com/51/51"
      />
      <PostCard 
        catName="奶牛猫警长"
        time="昨天"
        content="通报：发现一个红色光点在客厅墙上非法移动。已进行长达3小时的追捕，但目标极为狡猾。行动仍在继续。"
        avatarSrc="https://placekitten.com/52/52"
      />
    </div>
  );
};

export default Feed;