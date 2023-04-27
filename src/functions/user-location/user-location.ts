import { Handler } from '@netlify/functions';
import fetch from 'node-fetch'


export const handler: Handler = async (event, _) => {
  const ip = event.headers['x-forwarded-for'];
  const url = `https://ipapi.co/${ip}/json/`;

  try {
    const response = await fetch(url);
    const data = await response.json() as any;

    return {
      statusCode: 200,
      body: JSON.stringify({
        location: {
          city: data.city,
          region: data.region,
          country: data.country,
        },
      }),
    };
  } catch (error) {
    return { statusCode: 500, body: `Error fetching user location` };
  }
};