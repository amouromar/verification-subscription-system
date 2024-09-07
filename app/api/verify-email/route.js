import axios from "axios";

export async function POST(req) {
  const { email } = await req.json();

  try {
    const response = await axios.get(
      `https://api.hunter.io/v2/email-verifier`,
      {
        params: {
          email: email,
          api_key: process.env.HUNTER_API_KEY,
        },
      }
    );

    const { data } = response;
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400 }
    );
  }
}
