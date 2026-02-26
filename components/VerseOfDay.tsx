import React, { useEffect, useState } from 'react';
import { getVerseOfDay } from '../services/geminiService';
import { VerseOfDayData } from '../types';

const VerseOfDay: React.FC = () => {
  const [data, setData] = useState<VerseOfDayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const result = await getVerseOfDay();
        setData(result);
        
        // Notification Logic
        if (result && 'Notification' in window && Notification.permission === 'granted') {
           const hasNotified = sessionStorage.getItem('verseNotified');
           if (!hasNotified) {
               new Notification("آية اليوم", {
                   body: `${result.verseText}\n— ${result.reference}`,
                   icon: "/favicon.ico"
               });
               sessionStorage.setItem('verseNotified', 'true');
           }
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVerse();
  }, []);

  const handleShare = async () => {
    if (!data) return;

    const shareData = {
      title: 'كنوز - آية اليوم',
      text: `"${data.verseText}"\n— ${data.reference}\n\n${data.devotional}\n\nتأمل المزيد على موقع كنوز:`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 text-center animate-pulse">
          <div className="h-4 bg-stone-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-6 bg-stone-200 rounded w-2/3 mx-auto mb-4"></div>
          <div className="h-4 bg-stone-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="container mx-auto px-4 transform -translate-y-8 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden max-w-4xl mx-auto">
        <div className="bg-primary-600 h-2 w-full"></div>
        <div className="p-8 md:p-10 text-center relative">
            
            {/* Share Button */}
            <button 
                onClick={handleShare}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full text-stone-400 hover:text-primary-600 hover:bg-primary-50 transition-all"
                title="مشاركة الآية"
            >
                {shared ? (
                    <span className="text-green-600 font-bold text-xs">تم النسخ!</span>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                    </svg>
                )}
            </button>

            <h2 className="text-sm font-bold tracking-widest text-primary-600 uppercase mb-4 flex items-center justify-center gap-2">
                <span className="w-8 h-[1px] bg-primary-300"></span>
                آية اليوم
                <span className="w-8 h-[1px] bg-primary-300"></span>
            </h2>
            
            <blockquote className="text-2xl md:text-3xl font-serif text-stone-800 leading-relaxed mb-6">
                "{data.verseText}"
            </blockquote>
            
            <cite className="block text-primary-700 font-bold text-lg not-italic mb-8">
                — {data.reference}
            </cite>

            <div className="bg-stone-50 rounded-xl p-6 mx-auto max-w-2xl border border-stone-100 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-stone-300">❦</div>
                <p className="text-stone-600 leading-relaxed font-medium">
                    {data.devotional}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VerseOfDay;