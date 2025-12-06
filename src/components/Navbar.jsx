import React from 'react';
import { FaCat, FaSearch, FaHome, FaBell, FaStore, FaTv } from 'react-icons/fa';
import { MdOutlineCatchingPokemon } from "react-icons/md"; // 用个精灵球假装猫玩具

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm h-14 flex items-center px-4 justify-between">
      {/* 左侧 Logo 和搜索 */}
      <div className="flex items-center gap-2">
        <div className="text-catbookBlue text-3xl">
          <FaCat /> 
        </div>
        {/* Catbook 文字在移动端隐藏 */}
        <span className="text-catbookBlue font-bold text-xl hidden md:block">Catbook</span>
        
        <div className="ml-2 flex items-center rounded-full bg-gray-100 px-3 py-2">
           <FaSearch className="text-gray-500"/>
           <input 
             type="text" 
             placeholder="搜索小鱼干..." 
             className="hidden md:block bg-transparent outline-none ml-2 placeholder-gray-500 shrink-0"
           />
        </div>
      </div>

      {/* 中间导航图标 (移动端隐藏部分) */}
      <div className="hidden md:flex gap-x-8 h-full">
        <NavIcon icon={<FaHome />} active />
        <NavIcon icon={<FaTv />} />
        <NavIcon icon={<FaStore />} />
        <NavIcon icon={<MdOutlineCatchingPokemon title="猫玩具"/>} />
      </div>

      {/* 右侧个人信息 */}
      <div className="flex items-center gap-3">
        <div className="bg-gray-200 p-2 rounded-full text-xl hover:bg-gray-300 cursor-pointer relative">
            <FaBell />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
        </div>
        {/* 头像占位符 */}
        <img 
          src="https://i.pravatar.cc/150?img=63" // 随机用一个人类头像代替，实际应用换成猫
          alt="Profile" 
          className="w-8 h-8 rounded-full cursor-pointer border-2 border-catbookBlue"
        />
      </div>
    </div>
  );
};

// 一个小的辅助组件用于导航图标
const NavIcon = ({ icon, active }) => (
    <div className={`flex items-center px-6 md:px-8 cursor-pointer hover:bg-gray-100 rounded-lg transition-all ${active ? 'text-catbookBlue border-b-4 border-catbookBlue' : 'text-gray-500'}`}>
        <span className="text-2xl">{icon}</span>
    </div>
)

export default Navbar;