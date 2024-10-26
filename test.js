const axios = require('axios');
const apiKey = "l0rMwHVqEnhXh7UBaDPKsiu0FuwiRzcr"; // Hardcoded API key

// Function to create a chat session
async function createChatSession(externalUserId) {
  try {
    console.log('Creating chat session...');
    const response = await axios.post('https://api.on-demand.io/chat/v1/sessions', {
      pluginIds: [],
      externalUserId: externalUserId
    }, {
      headers: {
        apikey: apiKey
      }
    });

    if (response.data && response.data.data && response.data.data.id) {
      const sessionId = response.data.data.id;
      console.log('Chat session created with ID:', sessionId);
      return sessionId;
    } else {
      console.error('Unexpected response structure:', response.data);
      throw new Error('Session ID not found in response');
    }
  } catch (error) {
    console.error('Error creating chat session:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
    throw error;
  }
}

// Function to submit a query using the session ID
async function submitQuery(sessionId, query) {
  try {
    console.log(`Submitting query "${query}" to session ID ${sessionId}...`);
    const response = await axios.post(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
      endpointId: 'predefined-openai-gpt4turbo',
      query: query,
      pluginIds: [
        'plugin-1712327325',
        'plugin-1713962163',
        'plugin-1716434059',
        'plugin-1728287833',
        'plugin-1728314839',
        'plugin-1716455998',
        'plugin-1715808194'
      ],
      responseMode: 'sync'
    }, {
      headers: {
        apikey: apiKey
      }
    });

    if (response.data) {
      console.log('Query Response:', response.data);
      return response.data;
    } else {
      console.error('Unexpected response structure:', response);
      throw new Error('No data found in response');
    }
  } catch (error) {
    console.error('Error submitting query:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
    throw error;
  }
}

// Example usage
(async () => {
  const externalUserId = '123';
  const query = 'arpit ki mkc';

  try {
    const sessionId = await createChatSession(externalUserId);
    const queryResponse = await submitQuery(sessionId, query);
    console.log('Final Query Response:', queryResponse);
  } catch (error) {
    console.error('Error in chat process:', error.message);
  }
})();
