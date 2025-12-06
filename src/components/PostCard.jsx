import React from 'react';
import { FaRegThumbsUp, FaRegCommentAlt, FaShare } from 'react-icons/fa';
// 🔴 修复点：GiAngryCat 不存在，改为 GiCat (或者你可以换成 FaBomb)
import { GiCat } from "react-icons/gi"; 

const PostCard = ({ catName, time, content, imageSrc, avatarSrc }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm mt-4">
      {/* 头部信息 */}
      <div className="flex items-center p-4">
        <img src={avatarSrc} alt="" className="w-10 h-10 rounded-full border border-gray-200"/>
        <div className="ml-3">
          <h3 className="font-bold text-gray-800">{catName}</h3>
          <p className="text-gray-500 text-sm">{time}</p>
        </div>
      </div>

      {/* 帖子内容 */}
      <div className="px-4 pb-3 text-gray-800">
        {content}
      </div>
      
      {/* 如果有图片则显示 */}
      {imageSrc && (
          <div className="w-full max-h-96 overflow-hidden">
              <img src={imageSrc} alt="Post content" className="w-full object-cover"/>
          </div>
      )}

      {/* 底部互动栏 */}
      <div className="px-4 py-2 mt-2 border-t border-gray-100">
        <div className="flex justify-between text-gray-500 text-sm font-medium">
            <ReactionButton icon={<FaRegThumbsUp className="text-catbookBlue"/>} label="Purr (呼噜)" activeColor="text-catbookBlue"/>
            {/* 🔴 修复点：这里组件名也要改成 GiCat */}
            <ReactionButton icon={<GiCat className="text-red-500 text-lg"/>} label="Hiss (哈气)" hoverColor="hover:text-red-500"/>
            <ReactionButton icon={<FaRegCommentAlt />} label="Meow (评论)" />
            <ReactionButton icon={<FaShare />} label="Share" />
        </div>
      </div>
    </div>
  );
};

const ReactionButton = ({icon, label, activeColor, hoverColor = "hover:text-catbookBlue"}) => (
    <div className={`flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 flex-1 justify-center transition-all ${activeColor ? activeColor : ''} ${hoverColor}`}>
        {icon}
        <span className="hidden sm:block">{label}</span>
    </div>
)

export default PostCard;