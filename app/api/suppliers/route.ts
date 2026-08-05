import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

let supabase: any = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function GET() {
  try {
    if (supabase) {
      try {
        // Fetch all suppliers with their data
        const { data, error } = await supabase
          .from('suppliers')
          .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
          // Map to frontend format
          const suppliers = data.map((s: any) => ({
            id: s.id,
            name: s.name,
            category: s.category || 'General',
            deliveryRate: s.on_time_delivery_rate || 0,
            riskScore: s.risk_score || 0,
            contractValue: s.contract_value || 0,
            spend: s.spend || 0,
            status: s.status || 'active',
            rating: s.rating || 4.0,
            onTimeDelivery: s.on_time_delivery_rate || 0,
            qualityScore: s.quality_score || 80,
            communicationScore: s.communication_score || 75,
            lastContact: s.last_contact || new Date().toISOString().split('T')[0],
            email: s.email || 'contact@example.com',
            phone: s.phone || '+1-555-0000',
            riskFactors: s.risk_factors || [],
          }));

          return NextResponse.json(suppliers);
        }
      } catch (dbError) {
        console.error('Supabase query error:', dbError);
        // Fall through to mock
      }
    }

    // Mock data (fallback)
    return NextResponse.json([
      {
        id: '1',
        name: 'Global Steel Corp',
        category: 'Materials',
        deliveryRate: 98,
        riskScore: 15,
        contractValue: 450000,
        spend: 45000,
        status: 'active',
        rating: 4.8,
        onTimeDelivery: 98,
        qualityScore: 95,
        communicationScore: 92,
        lastContact: '2026-07-15',
        email: 'contact@globalsteel.com',
        phone: '+1-555-0101',
        riskFactors: [],
      },
      {
        id: '2',
        name: 'Nova Parts Inc',
        category: 'Electronics',
        deliveryRate: 88,
        riskScore: 45,
        contractValue: 280000,
        spend: 28000,
        status: 'active',
        rating: 4.2,
        onTimeDelivery: 88,
        qualityScore: 85,
        communicationScore: 80,
        lastContact: '2026-07-10',
        email: 'info@novaparts.com',
        phone: '+1-555-0102',
        riskFactors: ['Delivery delays', 'Quality concerns'],
      },
      {
        id: '3',
        name: 'ABC Electronics',
        category: 'Electronics',
        deliveryRate: 82,
        riskScore: 72,
        contractValue: 320000,
        spend: 32000,
        status: 'active',
        rating: 3.5,
        onTimeDelivery: 82,
        qualityScore: 75,
        communicationScore: 65,
        lastContact: '2026-07-05',
        email: 'sales@abcelectronics.com',
        phone: '+1-555-0103',
        riskFactors: ['Poor delivery', 'Quality issues', 'Communication problems'],
      },
      {
        id: '4',
        name: 'TechSupply Co',
        category: 'Technology',
        deliveryRate: 92,
        riskScore: 30,
        contractValue: 150000,
        spend: 15000,
        status: 'active',
        rating: 4.5,
        onTimeDelivery: 92,
        qualityScore: 90,
        communicationScore: 88,
        lastContact: '2026-07-12',
        email: 'hello@techsupply.com',
        phone: '+1-555-0104',
        riskFactors: [],
      },
      {
        id: '5',
        name: 'Office Depot',
        category: 'Office Supplies',
        deliveryRate: 96,
        riskScore: 10,
        contractValue: 120000,
        spend: 12000,
        status: 'active',
        rating: 4.7,
        onTimeDelivery: 96,
        qualityScore: 93,
        communicationScore: 90,
        lastContact: '2026-07-18',
        email: 'orders@officedepot.com',
        phone: '+1-555-0105',
        riskFactors: [],
      },
    ]);
  } catch (error) {
    console.error('Suppliers API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch suppliers' },
      { status: 500 }
    );
  }
}