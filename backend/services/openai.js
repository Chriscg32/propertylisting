const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '7+1wvRkEHzOLVbkORV/Ws8wTyWN6FQ0UBtWrQ6PkWbKtOxTsYcvLTXLGoz/lbl9W',
});

const openaiService = {
  async generatePropertyDescription(propertyData) {
    const prompt = `
      Generate a compelling, SEO-optimized property description for the following property:
      
      Title: ${propertyData.title}
      Property Type: ${propertyData.propertyType}
      Bedrooms: ${propertyData.bedrooms}
      Bathrooms: ${propertyData.bathrooms}
      Floor Size: ${propertyData.floorSize} m²
      Features: ${propertyData.features ? propertyData.features.join(', ') : 'None specified'}
      Location: ${propertyData.location}
      
      The description should be between 150-250 words, highlight the key features, and include relevant keywords for SEO. 
      Make it engaging and persuasive to potential buyers.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional real estate copywriter with expertise in creating compelling property descriptions that sell.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  },

  async generatePropertyTitle(propertyData) {
    const prompt = `
      Generate a catchy and SEO-optimized property title for the following property:
      
      Property Type: ${propertyData.propertyType}
      Bedrooms: ${propertyData.bedrooms}
      Bathrooms: ${propertyData.bathrooms}
      Location: ${propertyData.location}
      
      The title should be under 60 characters, include key features, and be attention-grabbing.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional real estate copywriter with expertise in creating catchy property titles.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 60,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  },

  async enhanceImageDescription(imageDescription) {
    const prompt = `
      Enhance the following image description to make it more appealing and descriptive for a property listing:
      
      Original Description: ${imageDescription}
      
      The enhanced description should be more vivid, highlight the best features, and create an emotional connection with potential buyers.
    `;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are a professional real estate copywriter with expertise in creating vivid and appealing image descriptions.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  },
};

module.exports = { openaiService };