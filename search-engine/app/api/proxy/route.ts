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
      return NextResponse.json({ error: 'Failed to fetch data from API' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
