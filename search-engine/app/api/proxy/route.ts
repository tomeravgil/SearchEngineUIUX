import { NextResponse } from 'next/server';

/**
 * Handles the GET request to fetch autofill suggestions from an external API.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to a response object containing the autofill suggestions or an error message.
 *
 * The function extracts the 'query' parameter from the request URL and sends a GET request to the external API with the 'Num-Suggestions' and 'Partial-Query' headers.
 * If the external API request is successful, it returns the JSON response.
 * If the external API request fails or an error occurs, it returns an error message with a 500 status code.
 */
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