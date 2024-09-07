import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(req) {
  const { phoneNumber } = await req.json();

  try {
    const result = await client.lookups
      .phoneNumbers(phoneNumber)
      .fetch({ type: ["carrier"] });
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400 }
    );
  }
}
