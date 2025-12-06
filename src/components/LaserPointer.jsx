// src/App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Rightbar from './components/Rightbar';
import LaserPointer from './components/LaserPointer'; // 引入激光笔

function App() {
  return (
    <div className="min-h-screen relative">
      {/* 🔴 全局特效：激光笔 */}
      <LaserPointer />

      <Navbar />
      
      <main className="flex justify-between max-w-screen-2xl mx-auto pt-4 gap-6 px-4">
        {/* 左侧栏 */}
        <div className="hidden lg:block w-1/5">
            <Sidebar />
        </div>

        {/* 中间动态流 */}
        <div className="flex-1 max-w-2xl mx-auto">
             <Feed />
        </div>

        {/* 右侧栏 */}
        <div className="hidden xl:block w-1/4">
            <Rightbar />
        </div>
      </main>
    </div>
  );
}

export default App;