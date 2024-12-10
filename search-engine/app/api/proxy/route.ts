import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  try {
    const response = await fetch(`http://lspt-data-eval.cs.rpi.edu:8080/v0/GetAutofill`, {
      method: 'GET',
      headers: {
        'Num-Suggestions': '3',
        'Partial-Query': query || '',
      },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the data to match our expected format
    const suggestions = data.suggestions.map((suggestion: string) => ({
      label: suggestion,
      value: suggestion.toLowerCase(),
    }));

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch suggestions', details: error.message },
      { status: 500 }
    );
  }
}