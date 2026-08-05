import { NextRequest, NextResponse } from 'next/server';

// ==========================================
// SMART AI - Now with Gemini!
// ==========================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Smart fallback responses if no API key is set
function getSmartMock(message: string): string {
  const lower = message.toLowerCase();
  
  if (lower.includes('risk') || lower.includes('danger') || lower.includes('reliable')) {
    return `🔍 **Risk Analysis:**\n\nI analyzed your supplier data. Here's what I found:\n- **ABC Electronics** has an 82% on-time delivery rate (below industry average of 95%)\n- **Global Steel** is your most reliable supplier with 98% on-time delivery\n- **Recommendation:** Consider finding a backup supplier for electronics to mitigate risk.`;
  }
  
  if (lower.includes('saving') || lower.includes('cost') || lower.includes('spend') || lower.includes('money')) {
    return `💰 **Cost Saving Opportunities:**\n\nBased on your spending patterns:\n- **Office Supplies:** Consolidating vendors could save $4,200/year\n- **IT Hardware:** Volume discounts available - negotiate with Dell/HP\n- **Shipping:** Optimizing freight routes could save ~8%\n\n**Total estimated savings: $12,500 annually**`;
  }
  
  if (lower.includes('contract') || lower.includes('renewal') || lower.includes('expire')) {
    return `📄 **Contract Intelligence:**\n\n- **Microsoft contract** expires in 45 days (renewal required)\n- **AWS contract** has unused credits worth $3,200\n- **Adobe license** can be renegotiated for better terms\n\n**Action:** Start renewal discussions 60 days before expiry for best rates.`;
  }
  
  if (lower.includes('supplier') || lower.includes('vendor') || lower.includes('best')) {
    return `🏢 **Supplier Intelligence:**\n\nTop performers in your network:\n1. **Global Steel** - Risk: Low | Delivery: 98%\n2. **Nova Parts** - Risk: Medium | Delivery: 88%\n3. **ABC Electronics** - Risk: High | Delivery: 82%\n\n**Recommendation:** Diversify electronics suppliers to reduce dependency on high-risk vendors.`;
  }
  
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `👋 Hello! I'm your AI Procurement Copilot.\n\nI can help you with:\n- **Supplier risk analysis**\n- **Cost optimization**\n- **Contract management**\n- **Spend insights**\n\nWhat would you like to explore today?`;
  }
  
  // Default smart response
  return `🤖 **Procurement AI Assistant:**\n\nI'm analyzing your procurement data. To get the best answers, try asking about:\n- "Which suppliers have the highest risk?"\n- "How can we reduce costs?"\n- "What contracts are expiring?"\n- "Who are our top suppliers?"\n\nI'll give you data-driven answers with specific recommendations.`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // ----- 1. TRY GEMINI AI (SMART) -----
    if (GEMINI_API_KEY) {
      try {
        // Dynamic import to reduce initial load time
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Context about procurement - makes AI smarter
        const systemPrompt = `You are an expert AI Procurement Assistant for a mid-sized company.
        
          Your company has:
          - Total annual spend: ~$184,000
          - 23 active suppliers
          - 45 managed contracts
          - Key suppliers: ABC Electronics, Global Steel, Nova Parts, Microsoft, Amazon

          Your job is to give specific, actionable, data-driven answers. Be concise (2-3 paragraphs max). Use bullet points. Never say "I don't have data" - instead, give general procurement best practices.

          User question: "${message}"`;

        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: systemPrompt }] }],
        });

        const reply = result.response.text();
        return NextResponse.json({ response: reply });

      } catch (geminiError) {
        console.error('Gemini Error:', geminiError);
        // Fall through to mock if Gemini fails
      }
    }

    // ----- 2. FALLBACK: SMART MOCK (No API Key) -----
    console.warn('⚠️ No GEMINI_API_KEY found. Using smart mock responses.');
    const mockReply = getSmartMock(message);
    await new Promise(resolve => setTimeout(resolve, 400)); // Simulate thinking
    return NextResponse.json({ response: mockReply });

  } catch (error) {
    console.error('Chat Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}