import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { AGPEYA_HOURS } from '../constants';
import { AGPEYA_PRAYERS } from './AgpeyaData';

const AgpeyaPrayer: React.FC = () => {
  const { hourId } = useParams<{ hourId: string }>();
  const hour = AGPEYA_HOURS.find(h => h.id === hourId);
  
  // Get data directly from local constant
  const data = hourId && AGPEYA_PRAYERS[hourId] ? AGPEYA_PRAYERS[hourId] : null;

  if (!hour) return <div className="text-center p-8">الساعة غير موجودة</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between border-b border-stone-200 pb-6 gap-4">
        <div className="flex items-center gap-4">
             <Link to="/agpeya" className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
             </Link>
             <div>
                <h1 className="text-3xl font-bold text-stone-800">{hour.name}</h1>
                <span className="text-stone-500">{hour.time}</span>
             </div>
        </div>
      </div>

      {!data ? (
        <div className="bg-yellow-50 text-yellow-800 p-6 rounded-xl border border-yellow-200 text-center">
             <p>عذراً، نصوص هذه الساعة غير متوفرة حالياً.</p>
             <Link to="/agpeya" className="mt-4 inline-block text-sm font-bold underline">العودة للقائمة</Link>
        </div>
      ) : (
        <div className="space-y-8 animate-slideUp">
            
            {/* Intro */}
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-primary-700 mb-4 border-b border-stone-100 pb-2 flex items-center gap-2">
                    <span>🙏</span> المقدمة
                </h2>
                <div className="prose prose-stone max-w-none text-lg leading-loose whitespace-pre-line">
                    {data.intro}
                </div>
            </section>

            {/* Psalms */}
            <section className="bg-stone-50 rounded-2xl border border-stone-200 p-6 md:p-8">
                <h2 className="text-xl font-bold text-primary-700 mb-6 flex items-center gap-2">
                    <span>📖</span> المزامير
                </h2>
                <div className="space-y-8">
                    {data.psalms.map((psalm, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="font-bold text-stone-800 mb-3 text-center text-lg">{psalm.title}</h3>
                            <p className="text-stone-700 leading-loose text-justify">{psalm.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Gospel */}
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8 border-r-4 border-r-red-400">
                <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                    <span>✝️</span> الإنجيل المقدس
                </h2>
                <h3 className="font-bold text-stone-800 mb-4 text-lg">{data.gospel.title}</h3>
                <div className="prose prose-stone max-w-none text-lg leading-loose text-justify">
                    {data.gospel.text}
                </div>
            </section>

            {/* Litanies (Qita) */}
            <section className="bg-amber-50 rounded-2xl border border-amber-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
                    <span>🕯️</span> القطع
                </h2>
                <div className="space-y-6">
                    {data.litanies.map((litany, idx) => (
                        <div key={idx} className="pb-4 border-b border-amber-200 last:border-0">
                            <p className="text-stone-800 leading-loose">{litany}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Kyrie & Trisagion (Simplified View) */}
            <section className="bg-stone-100 rounded-xl p-6 text-center">
                 <p className="font-bold text-stone-600 mb-2">كيرياليسون</p>
                 <p className="text-stone-800">{data.kyrie}</p>
            </section>

            {/* Absolution (Analysis) */}
            <section className="bg-white rounded-2xl shadow-lg border border-primary-200 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary-600 text-white px-4 py-1 rounded-bl-xl text-sm font-bold">التحليل</div>
                <h2 className="text-xl font-bold text-primary-800 mb-4 mt-2">تحليل {hour.name}</h2>
                <div className="text-lg leading-loose text-stone-800 text-justify whitespace-pre-line">
                    {data.absolution}
                </div>
            </section>
            
            {/* Conclusion */}
            <section className="bg-stone-800 text-stone-200 rounded-2xl p-6 md:p-8 text-center">
                <h2 className="text-lg font-bold text-white mb-4">الختام</h2>
                <p className="leading-loose opacity-90">{data.conclusion}</p>
            </section>

        </div>
      )}
    </div>
  );
};

export default AgpeyaPrayer;