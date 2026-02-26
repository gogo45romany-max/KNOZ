import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ChapterData, CommentaryStyle, VerseOfDayData, AgpeyaPrayerData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-3-flash-preview";
// Use Pro model for heavy text generation like Agpeya
const heavyModelId = "gemini-3-pro-preview"; 

const systemInstruction = `
أنت خادم مسيحي حكيم ولاهوتي مطلع. دورك هو تقديم شروحات وتأملات للكتاب المقدس ونصوص الأجبية المقدسة باللغة العربية.
يجب أن تكون إجاباتك متوافقة مع الإيمان المسيحي القويم (الأرثوذكسي القبطي)، وتستند إلى تعاليم الكتاب المقدس وكتابات الآباء.
استخدم لغة عربية فصحى جميلة وروحانية.
`;

// Helper to attempt repairing truncated JSON
const safeJsonParse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    // If text is truncated, try to close it minimally to salvage data
    try {
      // Very naive repair: close the last string if open, then close objects/arrays
      // This is not perfect but can save a partial response
      let fixed = str.trim();
      // Check if ending in a quote, if not, might be inside a string
      if (!fixed.endsWith('"') && !fixed.endsWith('}') && !fixed.endsWith(']')) {
          fixed += '"';
      }
      // Count brackets to close
      const openBraces = (fixed.match(/{/g) || []).length;
      const closeBraces = (fixed.match(/}/g) || []).length;
      const openBrackets = (fixed.match(/\[/g) || []).length;
      const closeBrackets = (fixed.match(/\]/g) || []).length;
      
      fixed += '}'.repeat(openBraces - closeBraces);
      fixed += ']'.repeat(openBrackets - closeBrackets);
      fixed += '}'.repeat(Math.max(0, (openBraces - closeBraces) - (openBrackets - closeBrackets))); // Final closure adjustment
      
      return JSON.parse(fixed);
    } catch (e2) {
      console.error("Failed to repair JSON:", e2);
      throw e;
    }
  }
};

export const getChapterInterpretation = async (
  bookName: string, 
  chapter: number, 
  style: CommentaryStyle
): Promise<ChapterData> => {
  
  const prompt = `
    قم بتقديم دراسة وشرح للإصحاح رقم ${chapter} من سفر ${bookName}.
    النمط المطلوب للشرح: ${style}.

    المخرجات يجب أن تكون بتنسيق JSON يحتوي على الحقول التالية:
    - interpretation: نص الشرح والتأمل (استخدم Markdown للتنسيق). اجعلها غنية ومفصلة (حوالي 400-600 كلمة).
    - keyVerses: قائمة بـ 3 آيات مفتاحية في هذا الإصحاح.
    - practicalApplication: تطبيق عملي للحياة اليومية من هذا الإصحاح.
    - scriptureText: نص الإصحاح الكتابي كاملاً بالتشكيل مع أرقام الآيات (أو أهم الأجزاء إذا كان طويلاً جداً). يرجى تنسيقه بشكل فقرات مريحة للقراءة.
    - videoResources: قائمة بـ 2-3 مقترحات لفيديوهات شرح لهذا الإصحاح أو السفر (لمفسرين معروفين مثل القمص داود لمعي، أبونا تادرس يعقوب، أبونا بولس جورج). لكل اقتراح اذكر "title" (عنوان الفيديو المقترح) و "preacher" (اسم الواعظ).
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      scriptureText: { type: Type.STRING },
      interpretation: { type: Type.STRING },
      keyVerses: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      practicalApplication: { type: Type.STRING },
      videoResources: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            preacher: { type: Type.STRING }
          },
          required: ["title", "preacher"]
        }
      }
    },
    required: ["scriptureText", "interpretation", "keyVerses", "practicalApplication", "videoResources"]
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");

    const data = JSON.parse(text) as ChapterData;
    // Inject metadata back so we have it
    data.bookName = bookName;
    data.chapterNumber = chapter;
    return data;

  } catch (error) {
    console.error("Error fetching interpretation:", error);
    throw new Error("حدث خطأ أثناء جلب التفسير. يرجى المحاولة مرة أخرى.");
  }
};

export const askSpiritualQuestion = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: `سؤال المستخدم: ${query}\n\nأجب إجابة روحية كتابية مشجعة مع ذكر شواهد كتابية إن أمكن.`,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text || "عذراً، لم أتمكن من الإجابة في الوقت الحالي.";
  } catch (error) {
    console.error("Error answering question:", error);
    return "حدث خطأ غير متوقع.";
  }
};

export const getVerseOfDay = async (): Promise<VerseOfDayData> => {
  const prompt = `
    اختر آية مشجعة ومناسبة لليوم من الكتاب المقدس، مع تأمل روحي قصير جداً (حوالي 40 كلمة).
    المخرجات JSON:
    - verseText: نص الآية مشكلاً.
    - reference: الشاهد (مثل: مزمور 23: 1).
    - devotional: تأمل قصير.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      verseText: { type: Type.STRING },
      reference: { type: Type.STRING },
      devotional: { type: Type.STRING }
    },
    required: ["verseText", "reference", "devotional"]
  };

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text) as VerseOfDayData;
  } catch (error) {
    console.error("Error fetching verse of the day:", error);
    // Fallback data in case of error
    return {
        verseText: "الرَّبُّ رَاعِيَّ فَلاَ يُعْوِزُنِي شَيْءٌ.",
        reference: "مزامير 23: 1",
        devotional: "ثق أن الله يعتني بك في كل تفاصيل حياتك."
    };
  }
};

export const getAgpeyaPrayer = async (hourTitle: string): Promise<AgpeyaPrayerData> => {
  const prompt = `
    أحتاج إلى النص الكامل والدقيق لصلاة "${hourTitle}" من الأجبية المقدسة (كتاب الصلوات القبطي).
    
    المطلوب: نصوص كاملة حرفياً. لا تقم بالتلخيص أو الحذف نهائياً.
    
    1. intro: مقدمة الصلاة كاملة (البسملة، الصلاة الربانية، صلاة الشكر، المزمور الخمسين).
    2. psalms: قائمة بجميع المزامير الخاصة بهذه الساعة (العنوان والنص كاملاً). *يجب ذكر النص كاملاً لكل مزمور*.
    3. gospel: فصل الإنجيل المقدس (العنوان والنص كاملاً).
    4. litanies: القطع (الأواشي) (نص القطع كاملاً).
    5. kyrie: كيرياليسون (اكتب النص والعدد المقرر).
    6. absolution: التحليل (نص التحليل كاملاً).
    7. conclusion: ختام الصلاة (طلبة ارحمنا يا الله، الصلاة الربانية).

    تنبيه: إذا كان الرد طويلاً جداً، حاول ضغط التنسيق (إزالة المسافات الزائدة) ولكن *لا تحذف النصوص*. المستخدم يعتمد على هذا التطبيق للصلاة.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      intro: { type: Type.STRING },
      psalms: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            text: { type: Type.STRING }
          }
        }
      },
      gospel: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          text: { type: Type.STRING }
        }
      },
      litanies: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      kyrie: { type: Type.STRING },
      absolution: { type: Type.STRING },
      conclusion: { type: Type.STRING }
    },
    required: ["title", "intro", "psalms", "gospel", "litanies", "kyrie", "absolution", "conclusion"]
  };

  try {
    // Using gemini-3-pro-preview for larger output capacity and better instruction following
    const response = await ai.models.generateContent({
      model: heavyModelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    // Use safe parse to handle potential truncation of very large responses
    const data = safeJsonParse(text) as AgpeyaPrayerData;
    
    data.title = hourTitle;
    return data;
  } catch (error) {
    console.error("Error fetching Agpeya prayer:", error);
    throw new Error("حدث خطأ أثناء جلب نصوص الأجبية (النص طويل جداً). حاول تحديث الصفحة.");
  }
};