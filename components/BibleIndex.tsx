import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BIBLE_BOOKS } from '../constants';
import { Testament } from '../types';

const BibleIndex: React.FC = () => {
  const [activeTestament, setActiveTestament] = useState<Testament>(Testament.OLD);
  const [searchQuery, setSearchQuery] = useState('');

  // Determine which books to display based on search query or active testament
  const displayedBooks = searchQuery.trim() !== ''
    ? BIBLE_BOOKS.filter(b => b.name.includes(searchQuery.trim()))
    : BIBLE_BOOKS.filter(b => b.testament === activeTestament);

  const categories = Array.from(new Set(displayedBooks.map(b => b.category)));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'شريعة': return '📜';
      case 'تاريخ': return '🏰';
      case 'شعر وحكمة': return '🎻';
      case 'أنبياء كبار': return '📢';
      case 'أنبياء صغار': return '📣';
      case 'أناجيل': return '✝️';
      case 'رسائل بولس': return '✉️';
      case 'رسائل عامة': return '📝';
      case 'نبوة': return '👁️';
      default: return '📖';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-stone-800 mb-3">الكتاب المقدس</h2>
            <p className="text-stone-500">تصفح الأسفار المقدسة بحسب التقسيم الكنسي</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8 relative">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن سفر (مثال: تكوين، متى)..."
                className="w-full px-5 py-3 pr-12 rounded-xl border border-stone-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white shadow-sm transition-all text-stone-800"
            />
             <svg 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5 pointer-events-none" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        {/* Testament Switcher - Only visible if not searching */}
        {searchQuery.trim() === '' && (
            <div className="flex justify-center mb-10 overflow-x-auto pb-2">
                <div className="bg-stone-100 p-1.5 rounded-xl inline-flex shadow-inner whitespace-nowrap">
                    <button
                        onClick={() => setActiveTestament(Testament.OLD)}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
                            activeTestament === Testament.OLD 
                            ? 'bg-white text-stone-800 shadow-md transform scale-105' 
                            : 'text-stone-500 hover:text-stone-700'
                        }`}
                    >
                        العهد القديم
                    </button>
                    <button
                        onClick={() => setActiveTestament(Testament.DEUTERO)}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
                            activeTestament === Testament.DEUTERO 
                            ? 'bg-white text-stone-800 shadow-md transform scale-105' 
                            : 'text-stone-500 hover:text-stone-700'
                        }`}
                    >
                        الأسفار القانونية الثانية
                    </button>
                    <button
                        onClick={() => setActiveTestament(Testament.NEW)}
                        className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
                            activeTestament === Testament.NEW 
                            ? 'bg-white text-primary-700 shadow-md transform scale-105' 
                            : 'text-stone-500 hover:text-stone-700'
                        }`}
                    >
                        العهد الجديد
                    </button>
                </div>
            </div>
        )}

        {/* Categories Grid */}
        <div className="space-y-12">
            {categories.length === 0 && (
                 <div className="text-center py-12 text-stone-500 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                    لا توجد أسفار تطابق بحثك "{searchQuery}"
                 </div>
            )}

            {categories.map((category) => {
                const categoryBooks = displayedBooks.filter(b => b.category === category);
                return (
                    <div key={category} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-100">
                        <div className="flex items-center gap-3 mb-6 border-b border-stone-100 pb-4">
                            <span className="text-3xl bg-primary-50 w-12 h-12 flex items-center justify-center rounded-full">
                                {getCategoryIcon(category)}
                            </span>
                            <h3 className="text-xl font-bold text-primary-800">{category}</h3>
                            <span className="mr-auto text-xs text-stone-400 bg-stone-50 px-3 py-1 rounded-full">
                                {categoryBooks.length} سفر
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {categoryBooks.map((book) => (
                                <Link 
                                    key={book.id}
                                    to={`/book/${book.id}`}
                                    className="group relative bg-stone-50 hover:bg-white border border-stone-100 hover:border-primary-200 rounded-xl p-4 text-center transition-all hover:shadow-md hover:-translate-y-1"
                                >
                                    <h4 className="font-bold text-stone-700 group-hover:text-primary-700 transition-colors mb-1">{book.name}</h4>
                                    <span className="text-[10px] text-stone-400 block">{book.chapters} أصحاح</span>
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-primary-500 transform scale-x-0 group-hover:scale-x-50 transition-transform rounded-b-xl"></div>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};

export default BibleIndex;