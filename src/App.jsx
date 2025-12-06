import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Rightbar from './components/Rightbar';

function App() {
  return (
    // 不需要在这里设置背景色，index.css里已经设置了 body 背景
    <div className="min-h-screen">
      <Navbar />
      
      {/* 核心布局容器：使用 Flexbox 实现响应式三栏 */}
      <main className="flex justify-between max-w-screen-2xl mx-auto">
        {/* 左侧栏 - 中等屏幕以上显示 */}
        <Sidebar />

        {/* 中间动态流 - 永远显示 */}
        <Feed />

        {/* 右侧栏 - 大屏幕以上显示 */}
        <Rightbar />
      </main>
    </div>
  );
}

export default App;