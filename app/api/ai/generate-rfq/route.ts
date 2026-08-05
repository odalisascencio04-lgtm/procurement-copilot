import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

let supabase: any = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✅ Supabase connected for RFQ');
}

export async function POST(request: NextRequest) {
  try {
    const { request: userRequest } = await request.json();

    if (!userRequest) {
      return NextResponse.json(
        { error: 'Please describe what you need to purchase' },
        { status: 400 }
      );
    }

    console.log('📝 RFQ Request:', userRequest);

    // ==========================================
    // STEP 1: Fetch REAL suppliers from database
    // ==========================================
    let realSuppliers = [];
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('suppliers')
          .select('id, name, category, on_time_delivery_rate, risk_score, contract_value')
          .order('on_time_delivery_rate', { ascending: false });

        if (error) throw error;
        realSuppliers = data || [];
        console.log(`✅ Found ${realSuppliers.length} real suppliers`);
      } catch (error) {
        console.error('Supabase error:', error);
      }
    }

    // If we have real suppliers AND Gemini, use both
    if (GEMINI_API_KEY && realSuppliers.length > 0) {
      try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const suppliersText = realSuppliers
          .slice(0, 20)
          .map((s: any) => 
            `- ${s.name} (${s.category || 'General'}, Delivery: ${s.on_time_delivery_rate || 0}%, Risk: ${s.risk_score || 0})`
          )
          .join('\n');

        const prompt = `
You are a procurement expert. A user needs to purchase something.
Generate a complete RFQ from this request:
"${userRequest}"

**REAL SUPPLIERS AVAILABLE:**
${suppliersText}

Return ONLY JSON with these fields:
{
  "rfq_title": "short clear title",
  "description": "detailed description",
  "category": "product/service category",
  "quantity": number,
  "estimated_budget": number,
  "currency": "USD",
  "delivery_deadline": "YYYY-MM-DD",
  "delivery_location": "city, state",
  "payment_terms": "e.g., Net 30",
  "suggested_suppliers": [
    { 
      "name": "Supplier Name", 
      "category": "category", 
      "delivery_rate": number,
      "risk_score": number,
      "reason": "why this supplier is recommended"
    }
  ]
}

**IMPORTANT:** Only suggest suppliers from the list above. Pick 3-5 that best match the request.
Make sure to explain why each supplier is recommended.
`;

        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' },
        });

        const data = JSON.parse(result.response.text());
        
        // Add IDs from real suppliers
        if (data.suggested_suppliers) {
          data.suggested_suppliers = data.suggested_suppliers.map((s: any) => {
            const real = realSuppliers.find((r: any) => r.name === s.name);
            return {
              ...s,
              id: real?.id || `mock-${Date.now()}`,
              real: !!real,
            };
          });
        }

        console.log('✅ Gemini + Real suppliers used');
        return NextResponse.json(data, { status: 200 });
      } catch (error) {
        console.error('Gemini error:', error);
      }
    }

    // ==========================================
    // STEP 2: Fallback - Gemini only (no real suppliers)
    // ==========================================
    if (GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
You are a procurement expert. Generate a complete RFQ from this request:
"${userRequest}"

Return ONLY JSON with these fields:
{
  "rfq_title": "short clear title",
  "description": "detailed description",
  "category": "product/service category",
  "quantity": number,
  "estimated_budget": number,
  "currency": "USD",
  "delivery_deadline": "YYYY-MM-DD",
  "delivery_location": "city, state",
  "payment_terms": "e.g., Net 30",
  "suggested_suppliers": [
    { "name": "Supplier Name", "category": "category", "delivery_rate": 95, "risk_score": 20 }
  ]
}

Make it realistic. Suggest 3-5 suppliers.
`;

        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' },
        });

        const data = JSON.parse(result.response.text());
        console.log('✅ Gemini used (no real suppliers)');
        return NextResponse.json(data, { status: 200 });
      } catch (error) {
        console.error('Gemini error:', error);
      }
    }

    // ==========================================
    // STEP 3: Ultimate fallback - Mock data
    // ==========================================
    console.log('📝 Using mock fallback');
    const mockRFQ = {
      rfq_title: `RFQ: ${userRequest.slice(0, 40)}...`,
      description: userRequest,
      category: "General Procurement",
      quantity: 1,
      estimated_budget: 25000,
      currency: "USD",
      delivery_deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      delivery_location: "New York, NY",
      payment_terms: "Net 30",
      suggested_suppliers: [
        { name: "Global Steel Corp", category: "Materials", delivery_rate: 98, risk_score: 15, reason: "Top performer" },
        { name: "Nova Parts Inc", category: "Electronics", delivery_rate: 88, risk_score: 45, reason: "Good quality" },
        { name: "ABC Electronics", category: "Electronics", delivery_rate: 82, risk_score: 72, reason: "Available now" },
      ],
    };

    return NextResponse.json(mockRFQ, { status: 200 });
  } catch (error) {
    console.error('RFQ generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate RFQ' },
      { status: 500 }
    );
  }
}