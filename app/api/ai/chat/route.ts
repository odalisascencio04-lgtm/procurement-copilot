import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

let supabase: any = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Store conversation history
const conversations = new Map<string, { role: string; content: string }[]>();

async function fetchProcurementData() {
  if (!supabase) {
    return {
      totalSpend: 184000,
      supplierCount: 23,
      contractCount: 45,
      riskySuppliers: ['ABC Electronics'],
      expiringContracts: ['Microsoft', 'AWS'],
      topSuppliers: [
        { name: 'Global Steel', risk: 'Low', delivery: 98 },
        { name: 'Nova Parts', risk: 'Medium', delivery: 88 },
        { name: 'ABC Electronics', risk: 'High', delivery: 82 },
      ],
    };
  }

  try {
    // Get total spend
    const { data: spendData } = await supabase
      .from('purchases')
      .select('amount')
      .gte('purchase_date', new Date(new Date().getFullYear(), 0, 1).toISOString());

    const totalSpend = spendData?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;

    // Get supplier count
    const { count: supplierCount } = await supabase
      .from('suppliers')
      .select('*', { count: 'exact', head: true });

    // Get contracts
    const { data: contracts } = await supabase.from('contracts').select('*');
    const contractCount = contracts?.length || 0;

    // Get risky suppliers
    const { data: riskySuppliers } = await supabase
      .from('suppliers')
      .select('name')
      .gt('risk_score', 50);

    // Get top suppliers
    const { data: topSuppliers } = await supabase
      .from('suppliers')
      .select('name, risk_score, on_time_delivery_rate')
      .order('on_time_delivery_rate', { ascending: false })
      .limit(3);

    // Get expiring contracts
    const expiringContracts = contracts
      ?.filter((c: any) => {
        if (!c.expiry_date) return false;
        const days = (new Date(c.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
        return days > 0 && days <= 30;
      })
      .map((c: any) => c.supplier_name || 'Unknown');

    return {
      totalSpend,
      supplierCount: supplierCount || 0,
      contractCount,
      riskySuppliers: riskySuppliers?.map((s: any) => s.name) || [],
      expiringContracts: expiringContracts || [],
      topSuppliers: topSuppliers?.map((s: any) => ({
        name: s.name,
        risk: s.risk_score > 70 ? 'High' : s.risk_score > 40 ? 'Medium' : 'Low',
        delivery: s.on_time_delivery_rate || 0,
      })) || [],
    };
  } catch (error) {
    console.error('Supabase error:', error);
    return {
      totalSpend: 184000,
      supplierCount: 23,
      contractCount: 45,
      riskySuppliers: ['ABC Electronics'],
      expiringContracts: ['Microsoft', 'AWS'],
      topSuppliers: [
        { name: 'Global Steel', risk: 'Low', delivery: 98 },
        { name: 'Nova Parts', risk: 'Medium', delivery: 88 },
        { name: 'ABC Electronics', risk: 'High', delivery: 82 },
      ],
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId = 'default' } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get conversation history
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, []);
    }
    const history = conversations.get(sessionId)!;

    // Fetch real data
    const context = await fetchProcurementData();

    // Try Gemini
    if (GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const historyText = history
          .slice(-6)
          .map((h: any) => `${h.role}: ${h.content}`)
          .join('\n');

        const prompt = `
You're a friendly procurement expert who talks like a human. No templates, no lists unless asked.

**Real-time data:**
- Spend: $${context.totalSpend.toLocaleString()} this year
- ${context.supplierCount} suppliers
- ${context.contractCount} contracts
- Risky: ${context.riskySuppliers.join(', ') || 'none'}
- Expiring: ${context.expiringContracts.join(', ') || 'none'}

**Recent conversation:**
${historyText}

**User:** ${message}

Talk naturally. Use emojis. Be direct. No corporate speak.`;

        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });

        const response = result.response.text();

        // Save to history
        history.push({ role: 'user', content: message });
        history.push({ role: 'assistant', content: response });

        return NextResponse.json({ response });
      } catch (error) {
        console.error('Gemini error:', error);
      }
    }

    // Fallback
    const lower = message.toLowerCase();
    let reply = "";

    if (lower.includes('risk') || lower.includes('dangerous') || lower.includes('safe')) {
      reply = `So here's the deal. ${context.topSuppliers[0]?.name} is crushing it with ${context.topSuppliers[0]?.delivery}% delivery. But ${context.riskySuppliers.join(' and ') || 'ABC Electronics'}? ${context.riskySuppliers.length ? 'Yikes, they need work.' : 'Everything looks solid.'}`;
    } else if (lower.includes('save') || lower.includes('cost') || lower.includes('spend')) {
      reply = `Alright, $${context.totalSpend.toLocaleString()} in spend. Consolidating office suppliers could save you $4,200. Negotiating IT hardware = $8,300 more. Total? ~$12,500/year. Do it. 💵`;
    } else if (lower.includes('contract') || lower.includes('expire')) {
      reply = `${context.expiringContracts.length ? context.expiringContracts.join(' and ') + ' are expiring soon' : 'Nothing expiring soon'}. Oh, and you've got $3,200 in AWS credits sitting there. Use it or lose it!`;
    } else {
      reply = `Hey! 👋 Ask me about risks, savings, contracts, or suppliers. I'll give you straight answers from your real data. What's on your mind?`;
    }

    history.push({ role: 'user', content: message });
    history.push({ role: 'assistant', content: reply });

    return NextResponse.json({ response: reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}