import React from 'react';
import { FaUserFriends, FaPaw, FaBookmark } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const SidebarRow = ({ Icon, title }) => (
  <motion.div 
    whileHover={{ x: 10, backgroundColor: '#e4e6eb' }}
    className="flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-colors mb-1"
  >
    <div className="bg-white p-2 rounded-full shadow-sm text-catbookBlue">
        <Icon className="text-xl" />
    </div>
    <h4 className="font-bold text-gray-700 hidden lg:block">{title}</h4>
  </motion.div>
);

  return (
    <div className="hidden md:block w-1/4 lg:w-1/5 h-screen sticky top-14 pl-2 pt-4 overflow-y-auto scrollbar-hide">
        <SidebarRow Icon={FaPaw} title="我的领地 (Profile)" />
        <SidebarRow Icon={FaUserFriends} title="喵帮派 (Clowders)" />
        <SidebarRow Icon={FaBookmark} title="收藏的罐头 (Saved)" />
        <hr className="my-4 border-gray-300 mr-4"/>
        <span className="text-gray-500 font-medium pl-3">你的快捷方式</span>
    </div>
  );
};
export default Sidebar;