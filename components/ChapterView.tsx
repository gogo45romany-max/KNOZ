import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BIBLE_BOOKS } from '../constants';
import { ChapterData, CommentaryStyle } from '../types';
import { getChapterInterpretation } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const ChapterView: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const book = BIBLE_BOOKS.find(b => b.id === bookId);

  const [currentChapter, setCurrentChapter] = useState(1);
  const [style, setStyle] = useState<CommentaryStyle>(CommentaryStyle.SPIRITUAL);
  const [data, setData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reading Preferences State
  const [fontSize, setFontSize] = useState(20);
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [highlightKeys, setHighlightKeys] = useState(false);

  useEffect(() => {
    setCurrentChapter(1);
  }, [bookId]);

  useEffect(() => {
    if (!book) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const result = await getChapterInterpretation(book.name, currentChapter, style);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ غير معروف");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [book, currentChapter, style]);

  if (!book) return <div className="p-8 text-center text-red-500">السفر غير موجود</div>;

  // Render text with optional highlights
  const renderScriptureText = () => {
    if (!data?.scriptureText) return null;

    let textContent = data.scriptureText;

    if (highlightKeys && data.keyVerses && data.keyVerses.length > 0) {
        data.keyVerses.forEach(verse => {
            // Escape regex special characters
            const safeVerse = verse.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Create a regex that finds the verse (case insensitive)
            const regex = new RegExp(`(${safeVerse})`, 'gi');
            
            const highlightClass = theme === 'dark' 
                ? 'bg-yellow-900/60 text-yellow-100 shadow-sm' 
                : 'bg-yellow-200/80 text-stone-900 shadow-sm';
                
            textContent = textContent.replace(regex, `<mark class="${highlightClass} rounded px-1 mx-0.5 box-decoration-clone bg-transparent">$1</mark>`);
        });
    }

    return (
        <div 
            className="whitespace-pre-wrap font-serif leading-loose transition-all duration-300"
            dangerouslySetInnerHTML={{ __html: textContent }}
        />
    );
  };

  const themeClasses = {
      light: 'bg-[#fffcf7] text-stone-800 border-primary-100',
      sepia: 'bg-[#f4ecd8] text-stone-900 border-stone-200',
      dark: 'bg-stone-800 text-stone-200 border-stone-700'
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Navigation Breadcrumb */}
      <div className="mb-6 flex items-center text-sm text-stone-500">
        <Link to="/library" className="hover:text-primary-600 transition-colors">المكتبة</Link>
        <span className="mx-2">/</span>
        <span className="font-bold text-stone-800">{book.name}</span>
      </div>

      {/* Controls Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-4 mb-6 sticky top-20 z-40 backdrop-blur-md bg-opacity-95">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Chapter Selector */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <h2 className="text-lg font-bold text-stone-800 whitespace-nowrap ml-2">{book.name}</h2>
                <select 
                    value={currentChapter} 
                    onChange={(e) => setCurrentChapter(Number(e.target.value))}
                    className="bg-stone-50 border border-stone-300 text-stone-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 min-w-[100px]"
                >
                    {Array.from({ length: book.chapters }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>إصحاح {num}</option>
                    ))}
                </select>
            </div>

            {/* Style Selector */}
            <div className="w-full md:w-auto">
                <select 
                    value={style} 
                    onChange={(e) => setStyle(e.target.value as CommentaryStyle)}
                    className="bg-primary-50 border border-primary-200 text-primary-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 font-medium"
                >
                    {Object.values(CommentaryStyle).map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>
            </div>

            {/* Reading Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-stone-400 font-bold uppercase tracking-wider hidden sm:inline">الخط</span>
                    <div className="flex items-center bg-stone-100 rounded-lg p-1">
                        <button onClick={() => setFontSize(s => Math.max(14, s - 2))} className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-white hover:shadow-sm rounded transition-all text-sm">A-</button>
                        <span className="w-8 text-center text-xs font-bold text-stone-500">{fontSize}</span>
                        <button onClick={() => setFontSize(s => Math.min(32, s + 2))} className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-white hover:shadow-sm rounded transition-all text-lg font-bold">A+</button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-400 font-bold uppercase tracking-wider hidden sm:inline">الوضع</span>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setTheme('light')} 
                            className={`w-6 h-6 rounded-full border shadow-sm transition-transform ${theme === 'light' ? 'ring-2 ring-primary-500 scale-110 bg-white' : 'bg-[#fffcf7] border-stone-200'}`}
                            title="فاتح"
                        />
                        <button 
                            onClick={() => setTheme('sepia')} 
                            className={`w-6 h-6 rounded-full border shadow-sm transition-transform ${theme === 'sepia' ? 'ring-2 ring-primary-500 scale-110 bg-[#f4ecd8]' : 'bg-[#f4ecd8] border-stone-200'}`}
                            title="بني فاتح"
                        />
                        <button 
                            onClick={() => setTheme('dark')} 
                            className={`w-6 h-6 rounded-full border shadow-sm transition-transform ${theme === 'dark' ? 'ring-2 ring-primary-500 scale-110 bg-stone-800' : 'bg-stone-800 border-stone-600'}`}
                            title="داكن"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 border-r border-stone-200 pr-4 mr-auto sm:mr-0">
                    <button 
                        onClick={() => setHighlightKeys(!highlightKeys)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${highlightKeys ? 'bg-yellow-100 text-yellow-700 shadow-inner' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        <span className="hidden sm:inline">تمييز الآيات</span>
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {loading ? (
            <div className="space-y-6 animate-pulse p-4">
                <div className="h-4 bg-stone-200 rounded w-3/4 mx-auto"></div>
                <div className="h-64 bg-stone-100 rounded-xl"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-32 bg-stone-100 rounded-xl"></div>
                    <div className="h-32 bg-stone-100 rounded-xl"></div>
                </div>
            </div>
        ) : error ? (
            <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200 text-center">
                <p>{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                >
                    إعادة المحاولة
                </button>
            </div>
        ) : data ? (
            <div className="space-y-8 animate-fadeIn">
                
                {/* Scripture Text (Full Chapter) */}
                <div 
                    className={`rounded-2xl p-6 md:p-8 shadow-sm border relative transition-colors duration-300 ${themeClasses[theme]}`}
                    style={{ fontSize: `${fontSize}px` }}
                >
                    <div className={`absolute top-4 left-4 opacity-10 text-6xl font-serif select-none ${theme === 'dark' ? 'text-white' : 'text-primary-800'}`}>❝</div>
                    <h3 className={`text-sm font-bold uppercase tracking-wider mb-6 border-b pb-2 inline-block ${theme === 'dark' ? 'text-stone-400 border-stone-600' : 'text-primary-800 border-primary-100'}`}>
                        النص الكتابي
                    </h3>
                    
                    {renderScriptureText()}
                </div>

                {/* Main Interpretation */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-t-4 border-primary-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-primary-100 rounded-br-full -ml-12 -mt-12 opacity-50"></div>
                    <h3 className="text-2xl font-bold text-primary-800 mb-6 relative z-10 flex items-center gap-2">
                        <span>📖</span>
                        <span>{style}</span>
                    </h3>
                    <article className="prose prose-stone prose-lg max-w-none prose-headings:text-primary-800 prose-headings:font-bold prose-p:text-stone-700 prose-p:leading-8 prose-li:text-stone-700 prose-strong:text-primary-700 prose-a:text-primary-600 prose-blockquote:border-primary-300 prose-blockquote:bg-stone-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic">
                        <ReactMarkdown>{data.interpretation}</ReactMarkdown>
                    </article>
                </div>

                {/* Video Resources Section */}
                {data.videoResources && data.videoResources.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                        <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            فيديوهات مختارة
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {data.videoResources.map((video, idx) => (
                                <a 
                                    key={idx}
                                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.preacher + ' ' + video.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl border border-stone-100 hover:border-red-200 hover:bg-red-50 transition-all group"
                                >
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                                        ▶
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-stone-800 group-hover:text-red-700">{video.title}</span>
                                        <span className="text-sm text-stone-500">{video.preacher}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Key Verses */}
                    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                        <h4 className="text-primary-700 font-bold mb-4 flex items-center gap-2">
                            <span>✨</span> آيات مفتاحية
                        </h4>
                        <ul className="space-y-3">
                            {data.keyVerses.map((verse, idx) => (
                                <li key={idx} className="bg-white p-3 rounded-lg border border-stone-100 shadow-sm text-stone-700 italic font-serif">
                                    "{verse}"
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Practical Application */}
                    <div className="bg-accent-50 rounded-2xl p-6 border border-accent-100">
                        <h4 className="text-accent-600 font-bold mb-4 flex items-center gap-2">
                            <span>🌱</span> تطبيق عملي
                        </h4>
                        <p className="text-stone-800 leading-relaxed">
                            {data.practicalApplication}
                        </p>
                    </div>
                </div>

            </div>
        ) : null}
      </div>

      {/* Pagination */}
      {data && (
          <div className="flex justify-between mt-8">
            <button
                disabled={currentChapter <= 1}
                onClick={() => setCurrentChapter(prev => prev - 1)}
                className="px-6 py-3 bg-white border border-stone-200 text-stone-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50 transition-colors flex items-center gap-2"
            >
                <span>→</span> السابق
            </button>
            <button
                disabled={currentChapter >= book.chapters}
                onClick={() => setCurrentChapter(prev => prev + 1)}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 transition-colors shadow-lg flex items-center gap-2"
            >
                التالي <span>←</span>
            </button>
          </div>
      )}
    </div>
  );
};

export default ChapterView;