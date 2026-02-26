import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-stone-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-md group-hover:bg-primary-700 transition-colors">
                †
            </div>
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-stone-800 tracking-tight group-hover:text-primary-700 transition-colors">كنوز</h1>
                <span className="text-xs text-stone-500 hidden sm:block">تأملات وتفاسير الكتاب المقدس</span>
            </div>
        </Link>
        
        <nav className="flex gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            <Link 
                to="/" 
                className={`whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${isActive('/') ? 'text-primary-700 font-bold' : 'text-stone-600 hover:text-primary-600'}`}
            >
                الرئيسية
            </Link>
            <Link 
                to="/bible" 
                className={`whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${isActive('/bible') ? 'text-primary-700 font-bold' : 'text-stone-600 hover:text-primary-600'}`}
            >
                الكتاب المقدس
            </Link>
             <Link 
                to="/agpeya" 
                className={`whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${isActive('/agpeya') ? 'text-primary-700 font-bold' : 'text-stone-600 hover:text-primary-600'}`}
            >
                الأجبية
            </Link>
            <Link 
                to="/library" 
                className={`whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${isActive('/library') ? 'text-primary-700 font-bold' : 'text-stone-600 hover:text-primary-600'}`}
            >
                المكتبة
            </Link>
            <Link 
                to="/ask" 
                className={`whitespace-nowrap text-sm sm:text-base font-medium transition-colors ${isActive('/ask') ? 'text-primary-700 font-bold' : 'text-stone-600 hover:text-primary-600'}`}
            >
                اسأل مرشد
            </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;