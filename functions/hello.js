exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST',
  };
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Only HTTP POST is allowed!' }),
    };
  } else if (
    JSON.stringify(event.body) === '[object Object]' ||
    !JSON.parse(event.body).name
  ) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Provide me with a name please!' }),
    };
  } else {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(`Hello there, ${JSON.parse(event.body).name}`),
    };
  }
};
