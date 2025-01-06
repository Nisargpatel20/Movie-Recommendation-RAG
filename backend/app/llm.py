import openai

openai.api_key = <API_KEY>

def generate_response(query, context):
    prompt = f"Movies context: {context}\n\nUser query: {query}\n\nRecommendation:"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150,
    )
    return response.choices[0].text.strip()
