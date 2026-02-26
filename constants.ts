import { Book, Testament } from './types';

export const BIBLE_BOOKS: Book[] = [
  // --- Old Testament ---
  // Pentateuch
  { id: "gen", name: "التكوين", testament: Testament.OLD, chapters: 50, category: "شريعة" },
  { id: "exo", name: "الخروج", testament: Testament.OLD, chapters: 40, category: "شريعة" },
  { id: "lev", name: "اللاويين", testament: Testament.OLD, chapters: 27, category: "شريعة" },
  { id: "num", name: "العدد", testament: Testament.OLD, chapters: 36, category: "شريعة" },
  { id: "deu", name: "التثنية", testament: Testament.OLD, chapters: 34, category: "شريعة" },
  // History
  { id: "jos", name: "يشوع", testament: Testament.OLD, chapters: 24, category: "تاريخ" },
  { id: "jdg", name: "القضاة", testament: Testament.OLD, chapters: 21, category: "تاريخ" },
  { id: "rut", name: "راعي", testament: Testament.OLD, chapters: 4, category: "تاريخ" },
  { id: "1sa", name: "صموئيل الأول", testament: Testament.OLD, chapters: 31, category: "تاريخ" },
  { id: "2sa", name: "صموئيل الثاني", testament: Testament.OLD, chapters: 24, category: "تاريخ" },
  { id: "1ki", name: "ملوك الأول", testament: Testament.OLD, chapters: 22, category: "تاريخ" },
  { id: "2ki", name: "ملوك الثاني", testament: Testament.OLD, chapters: 25, category: "تاريخ" },
  { id: "1ch", name: "أخبار الأيام الأول", testament: Testament.OLD, chapters: 29, category: "تاريخ" },
  { id: "2ch", name: "أخبار الأيام الثاني", testament: Testament.OLD, chapters: 36, category: "تاريخ" },
  { id: "ezr", name: "عزرا", testament: Testament.OLD, chapters: 10, category: "تاريخ" },
  { id: "neh", name: "نحميا", testament: Testament.OLD, chapters: 13, category: "تاريخ" },
  { id: "est", name: "أستير", testament: Testament.OLD, chapters: 10, category: "تاريخ" },
  // Poetry & Wisdom
  { id: "job", name: "أيوب", testament: Testament.OLD, chapters: 42, category: "شعر وحكمة" },
  { id: "psa", name: "المزامير", testament: Testament.OLD, chapters: 151, category: "شعر وحكمة" },
  { id: "pro", name: "الأمثال", testament: Testament.OLD, chapters: 31, category: "شعر وحكمة" },
  { id: "ecc", name: "الجامعة", testament: Testament.OLD, chapters: 12, category: "شعر وحكمة" },
  { id: "son", name: "نشيد الأنشاد", testament: Testament.OLD, chapters: 8, category: "شعر وحكمة" },
  // Major Prophets
  { id: "isa", name: "إشعياء", testament: Testament.OLD, chapters: 66, category: "أنبياء كبار" },
  { id: "jer", name: "إرميا", testament: Testament.OLD, chapters: 52, category: "أنبياء كبار" },
  { id: "lam", name: "مراثي إرميا", testament: Testament.OLD, chapters: 5, category: "أنبياء كبار" },
  { id: "eze", name: "حزقيال", testament: Testament.OLD, chapters: 48, category: "أنبياء كبار" },
  { id: "dan", name: "دانيال", testament: Testament.OLD, chapters: 12, category: "أنبياء كبار" },
  // Minor Prophets
  { id: "hos", name: "هوشع", testament: Testament.OLD, chapters: 14, category: "أنبياء صغار" },
  { id: "joe", name: "يوئيل", testament: Testament.OLD, chapters: 3, category: "أنبياء صغار" },
  { id: "amo", name: "عاموس", testament: Testament.OLD, chapters: 9, category: "أنبياء صغار" },
  { id: "oba", name: "عوبديا", testament: Testament.OLD, chapters: 1, category: "أنبياء صغار" },
  { id: "jon", name: "يونان", testament: Testament.OLD, chapters: 4, category: "أنبياء صغار" },
  { id: "mic", name: "ميخا", testament: Testament.OLD, chapters: 7, category: "أنبياء صغار" },
  { id: "nah", name: "ناحوم", testament: Testament.OLD, chapters: 3, category: "أنبياء صغار" },
  { id: "hab", name: "حبقوق", testament: Testament.OLD, chapters: 3, category: "أنبياء صغار" },
  { id: "zep", name: "صفنيا", testament: Testament.OLD, chapters: 3, category: "أنبياء صغار" },
  { id: "hag", name: "حجي", testament: Testament.OLD, chapters: 2, category: "أنبياء صغار" },
  { id: "zec", name: "زكريا", testament: Testament.OLD, chapters: 14, category: "أنبياء صغار" },
  { id: "mal", name: "ملاخي", testament: Testament.OLD, chapters: 4, category: "أنبياء صغار" },

  // --- Deuterocanonical Books (Agpeya/Orthodox Tradition) ---
  { id: "tob", name: "طوبيا", testament: Testament.DEUTERO, chapters: 14, category: "تاريخ" },
  { id: "jdt", name: "يهوديت", testament: Testament.DEUTERO, chapters: 16, category: "تاريخ" },
  { id: "est_add", name: "تتمة أستير", testament: Testament.DEUTERO, chapters: 6, category: "تاريخ" },
  { id: "wis", name: "حكمة سليمان", testament: Testament.DEUTERO, chapters: 19, category: "شعر وحكمة" },
  { id: "sir", name: "يشوع بن سيراخ", testament: Testament.DEUTERO, chapters: 51, category: "شعر وحكمة" },
  { id: "bar", name: "باروخ", testament: Testament.DEUTERO, chapters: 6, category: "أنبياء كبار" },
  { id: "dan_add", name: "تتمة دانيال", testament: Testament.DEUTERO, chapters: 2, category: "أنبياء كبار" },
  { id: "1ma", name: "المكابيين الأول", testament: Testament.DEUTERO, chapters: 16, category: "تاريخ" },
  { id: "2ma", name: "المكابيين الثاني", testament: Testament.DEUTERO, chapters: 15, category: "تاريخ" },

  // --- New Testament ---
  // Gospels
  { id: "mat", name: "متى", testament: Testament.NEW, chapters: 28, category: "أناجيل" },
  { id: "mar", name: "مرقس", testament: Testament.NEW, chapters: 16, category: "أناجيل" },
  { id: "luk", name: "لوقا", testament: Testament.NEW, chapters: 24, category: "أناجيل" },
  { id: "joh", name: "يوحنا", testament: Testament.NEW, chapters: 21, category: "أناجيل" },
  // History
  { id: "act", name: "أعمال الرسل", testament: Testament.NEW, chapters: 28, category: "تاريخ" },
  // Pauline Epistles
  { id: "rom", name: "رومية", testament: Testament.NEW, chapters: 16, category: "رسائل بولس" },
  { id: "1cor", name: "كورنثوس الأولى", testament: Testament.NEW, chapters: 16, category: "رسائل بولس" },
  { id: "2cor", name: "كورنثوس الثانية", testament: Testament.NEW, chapters: 13, category: "رسائل بولس" },
  { id: "gal", name: "غلاطية", testament: Testament.NEW, chapters: 6, category: "رسائل بولس" },
  { id: "eph", name: "أفسس", testament: Testament.NEW, chapters: 6, category: "رسائل بولس" },
  { id: "phi", name: "فيلبي", testament: Testament.NEW, chapters: 4, category: "رسائل بولس" },
  { id: "col", name: "كولوسي", testament: Testament.NEW, chapters: 4, category: "رسائل بولس" },
  { id: "1th", name: "تسالونيكي الأولى", testament: Testament.NEW, chapters: 5, category: "رسائل بولس" },
  { id: "2th", name: "تسالونيكي الثانية", testament: Testament.NEW, chapters: 3, category: "رسائل بولس" },
  { id: "1ti", name: "تيموثاوس الأولى", testament: Testament.NEW, chapters: 6, category: "رسائل بولس" },
  { id: "2ti", name: "تيموثاوس الثانية", testament: Testament.NEW, chapters: 4, category: "رسائل بولس" },
  { id: "tit", name: "تيطس", testament: Testament.NEW, chapters: 3, category: "رسائل بولس" },
  { id: "phm", name: "فيلمون", testament: Testament.NEW, chapters: 1, category: "رسائل بولس" },
  { id: "heb", name: "العبرانيين", testament: Testament.NEW, chapters: 13, category: "رسائل بولس" },
  // General Epistles
  { id: "jam", name: "يعقوب", testament: Testament.NEW, chapters: 5, category: "رسائل عامة" },
  { id: "1pe", name: "بطرس الأولى", testament: Testament.NEW, chapters: 5, category: "رسائل عامة" },
  { id: "2pe", name: "بطرس الثانية", testament: Testament.NEW, chapters: 3, category: "رسائل عامة" },
  { id: "1jo", name: "يوحنا الأولى", testament: Testament.NEW, chapters: 5, category: "رسائل عامة" },
  { id: "2jo", name: "يوحنا الثانية", testament: Testament.NEW, chapters: 1, category: "رسائل عامة" },
  { id: "3jo", name: "يوحنا الثالثة", testament: Testament.NEW, chapters: 1, category: "رسائل عامة" },
  { id: "jud", name: "يهوذا", testament: Testament.NEW, chapters: 1, category: "رسائل عامة" },
  // Prophecy
  { id: "rev", name: "رؤيا يوحنا", testament: Testament.NEW, chapters: 22, category: "نبوة" },
];

export const APP_NAME = "كنوز";
export const APP_DESC = "موقع تفاعلي للتأملات والشروحات المسيحية";

export const AGPEYA_HOURS = [
  { id: "prime", name: "صلاة باكر", time: "6:00 ص", icon: "🌅" },
  { id: "terce", name: "صلاة الساعة الثالثة", time: "9:00 ص", icon: "☀️" },
  { id: "sext", name: "صلاة الساعة السادسة", time: "12:00 م", icon: "🕛" },
  { id: "none", name: "صلاة الساعة التاسعة", time: "3:00 م", icon: "🕒" },
  { id: "vespers", name: "صلاة الغروب", time: "5:00 م", icon: "🌇" },
  { id: "compline", name: "صلاة النوم", time: "6:00 م", icon: "🌑" },
  { id: "midnight1", name: "صلاة نصف الليل (الخدمة الأولى)", time: "12:00 ص", icon: "🕯️" },
  { id: "midnight2", name: "صلاة نصف الليل (الخدمة الثانية)", time: "12:15 ص", icon: "🕯️" },
  { id: "midnight3", name: "صلاة نصف الليل (الخدمة الثالثة)", time: "12:30 ص", icon: "🕯️" },
];