import React from 'react';
// 🔴 修复点：这里原来是 Fapaw，改为 FaPaw (大写P)
import { FaUserFriends, FaPaw, FaBookmark } from 'react-icons/fa';

const Sidebar = () => {
  const SidebarRow = ({ Icon, title }) => (
    <div className="flex items-center gap-4 p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition-all">
      <Icon className="text-catbookBlue text-2xl" />
      <h4 className="font-medium hidden lg:block">{title}</h4>
    </div>
  );

  return (
    <div className="hidden md:block w-1/4 lg:w-1/5 h-screen sticky top-14 pl-2 pt-4 overflow-y-auto scrollbar-hide">
        {/* 🔴 修复点：这里也要把 Fapaw 改为 FaPaw */}
        <SidebarRow Icon={FaPaw} title="我的领地 (Profile)" />
        <SidebarRow Icon={FaUserFriends} title="喵帮派 (Clowders)" />
        <SidebarRow Icon={FaBookmark} title="收藏的罐头 (Saved)" />
        <hr className="my-4 border-gray-300 mr-4"/>
        <span className="text-gray-500 font-medium pl-3">你的快捷方式</span>
    </div>
  );
};
export default Sidebar;