import React, { useState } from 'react';
import { FaRegCommentAlt, FaShare } from 'react-icons/fa';
import { GiCat } from "react-icons/gi";
import { FaPaw } from "react-icons/fa";
import confetti from 'canvas-confetti'; // 引入撒花库
import BoopButton from './BoopButton'; // 引入Q弹按钮

const PostCard = ({ catName, time, content, imageSrc, avatarSrc }) => {
  const [purrCount, setPurrCount] = useState(0);

  // 触发“呼噜”特效
  const handlePurr = (e) => {
    setPurrCount(c => c + 1);
    
    // 在鼠标点击的位置喷射
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    confetti({
      origin: { x, y },
      particleCount: 15,
      spread: 60,
      gravity: 0.8,
      colors: ['#4267B2', '#FF9F43', '#FFFFFF'], // 品牌色
      shapes: ['circle'], // 可惜canvas-confetti不支持自定义形状(emoji)，用圆形代替猫粮
      ticks: 100
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg mt-6 overflow-hidden border-2 border-transparent hover:border-catbookBlue/20 transition-all duration-300">
      {/* 头部 */}
      <div className="flex items-center p-4 bg-gradient-to-r from-white to-blue-50">
        <img src={avatarSrc} alt="" className="w-12 h-12 rounded-full border-2 border-catbookBlue shadow-sm object-cover"/>
        <div className="ml-3">
          <h3 className="font-bold text-gray-800 text-lg">{catName}</h3>
          <p className="text-gray-400 text-xs font-semibold">{time}</p>
        </div>
      </div>

      {/* 内容 */}
      <div className="px-5 pb-3 text-gray-700 leading-relaxed text-base">
        {content}
      </div>
      
      {/* 图片 */}
      {imageSrc && (
          <div className="w-full max-h-96 overflow-hidden cursor-pointer">
              <img src={imageSrc} alt="Post content" className="w-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"/>
          </div>
      )}

      {/* 底部互动栏 */}
      <div className="px-6 py-3 bg-gray-50 flex justify-between items-center">
        <BoopButton 
            onClick={handlePurr}
            className="flex items-center gap-2 text-gray-500 hover:text-catbookBlue font-bold"
        >
            <div className="relative">
                <FaPaw className={`text-xl ${purrCount > 0 ? 'text-catbookBlue' : ''}`}/>
                {purrCount > 0 && (
                    <span className="absolute -top-3 -right-2 text-xs bg-red-400 text-white px-1 rounded-full animate-bounce">
                        {purrCount}
                    </span>
                )}
            </div>
            <span className="hidden sm:block">Purr</span>
        </BoopButton>

        <BoopButton className="flex items-center gap-2 text-gray-500 hover:text-red-500">
            <GiCat className="text-2xl"/>
            <span className="hidden sm:block">Hiss</span>
        </BoopButton>

        <BoopButton className="flex items-center gap-2 text-gray-500 hover:text-green-500">
            <FaRegCommentAlt />
            <span className="hidden sm:block">Meow</span>
        </BoopButton>

        <BoopButton className="flex items-center gap-2 text-gray-500 hover:text-purple-500">
            <FaShare />
        </BoopButton>
      </div>
    </div>
  );
};

export default PostCard;