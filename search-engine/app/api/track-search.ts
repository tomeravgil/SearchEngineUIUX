import { NextResponse } from 'next/server';

/**
 * Handles the GET request to fetch a unique query ID.
 *
 * @returns {Promise<Response>} - A promise that resolves to a response object containing the query ID or an error message.
 */
export async function GET() {
  try {
    const response = await fetch('http://lspt-data-eval.cs.rpi.edu:8080/v0/GetQueryID', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    console.log('Query ID:', data.query_ID);

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch query ID', details: error.message },
      { status: 500 }
    );
  }
}