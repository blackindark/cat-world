import React from 'react';

const Rightbar = () => {
  return (
    <div className="hidden lg:block w-1/4 h-screen sticky top-14 pt-4 pr-2 overflow-y-auto">
      <h3 className="text-gray-500 font-medium mb-4">赞助商 (Sponsored)</h3>
       <div className="bg-white p-2 rounded-lg mb-4 shadow-sm cursor-pointer">
         <img src="https://placekitten.com/300/150" alt="ad" className="rounded-md"/>
         <p className="font-bold mt-2">皇家顶级猫粮</p>
         <p className="text-sm text-gray-500">吃了毛色发亮，拉粑粑不臭！</p>
       </div>

      <hr className="my-4 border-gray-300"/>
      <h3 className="text-gray-500 font-medium mb-4">附近的一只猫 (Contacts)</h3>
       <ul className="space-y-2">
           <li className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                <img src="https://placekitten.com/30/30" className="w-8 h-8 rounded-full"/>
                <span className="font-medium">隔壁小花</span>
                <span className="w-2 h-2 bg-green-500 rounded-full ml-auto"></span>
           </li>
           {/* 更多联系人... */}
       </ul>
    </div>
  );
};
export default Rightbar;