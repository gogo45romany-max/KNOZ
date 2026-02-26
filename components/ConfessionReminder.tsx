import React, { useState, useEffect } from 'react';

const ConfessionReminder: React.FC = () => {
  const [daysInput, setDaysInput] = useState<string>('40');
  const [targetDate, setTargetDate] = useState<string | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<string>(Notification.permission);
  const [isDue, setIsDue] = useState(false);

  useEffect(() => {
    // Load saved date
    const savedDate = localStorage.getItem('confessionTargetDate');
    if (savedDate) {
      setTargetDate(savedDate);
      checkIfDue(savedDate);
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert("عذراً، متصفحك لا يدعم التنبيهات");
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationStatus(permission);
    if (permission === 'granted') {
      new Notification("كنوز", { body: "تم تفعيل التنبيهات بنجاح" });
    }
  };

  const setReminder = () => {
    const days = parseInt(daysInput);
    if (isNaN(days) || days <= 0) return;

    const date = new Date();
    date.setDate(date.getDate() + days);
    
    const dateString = date.toISOString();
    localStorage.setItem('confessionTargetDate', dateString);
    setTargetDate(dateString);
    setIsDue(false);

    if (notificationStatus === 'granted') {
      new Notification("تذكير الاعتراف", { 
        body: `تم ضبط التذكير. موعد اعترافك القادم: ${new Date(dateString).toLocaleDateString('ar-EG')}` 
      });
    } else if (notificationStatus === 'default') {
        requestPermission();
    }
  };

  const clearReminder = () => {
    localStorage.removeItem('confessionTargetDate');
    setTargetDate(null);
    setIsDue(false);
  };

  const checkIfDue = (dateStr: string) => {
    const now = new Date();
    const target = new Date(dateStr);
    
    if (now >= target) {
      setIsDue(true);
      if (Notification.permission === 'granted') {
        new Notification("تنبيه روحي", { 
          body: "حان موعد الاعتراف الذي حددته. لا تؤجل توبة اليوم.",
          icon: "/favicon.ico" // Assuming favicon exists, or browser default
        });
      }
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-EG', { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="absolute top-0 right-0 w-20 h-20 bg-accent-50 rounded-bl-full -mr-10 -mt-10 opacity-50 transition-transform group-hover:scale-110"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center text-xl">
            🔔
          </div>
          <h3 className="text-xl font-bold text-stone-800">منبه الاعتراف</h3>
        </div>

        {isDue ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center mb-4 animate-bounce">
            <p className="text-red-800 font-bold text-lg mb-2">⚠️ حان وقت الاعتراف!</p>
            <p className="text-red-600 text-sm">"إِنِ اعْتَرَفْنَا بِخَطَايَانَا فَهُوَ أَمِينٌ وَعَادِلٌ"</p>
            <button 
              onClick={clearReminder}
              className="mt-3 text-xs text-red-700 underline hover:text-red-900"
            >
              إعادة ضبط
            </button>
          </div>
        ) : targetDate ? (
          <div className="bg-stone-50 border border-stone-100 rounded-xl p-4 text-center mb-4">
            <p className="text-stone-500 text-sm mb-1">موعدك القادم:</p>
            <p className="text-primary-700 font-bold">{formatDate(targetDate)}</p>
            <button 
              onClick={clearReminder}
              className="mt-3 text-xs text-stone-400 hover:text-red-500 transition-colors"
            >
              إلغاء التذكير
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-stone-600 text-sm leading-relaxed">
              حدد مدة زمنية لتذكيرك بموعد الاعتراف القادم للحفاظ على نقاوة القلب.
            </p>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                value={daysInput}
                onChange={(e) => setDaysInput(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-800 focus:ring-2 focus:ring-accent-500 outline-none"
                placeholder="عدد الأيام"
              />
              <button
                onClick={setReminder}
                className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg font-bold transition-colors text-sm"
              >
                ضبط
              </button>
            </div>
          </div>
        )}

        {notificationStatus !== 'granted' && (
          <button 
            onClick={requestPermission}
            className="w-full mt-2 py-2 text-xs text-stone-400 hover:text-accent-600 flex items-center justify-center gap-1 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            تفعيل التنبيهات
          </button>
        )}
      </div>
    </div>
  );
};

export default ConfessionReminder;