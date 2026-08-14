from google import genai

from app.core.settings import settings


client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


def generate_trip_plan(destination, days, budget, interests):

    prompt = f"""
You are an expert travel planner.

Create a practical travel itinerary.

Destination: {destination}
Number of days: {days}
Budget: ₹{budget}
Interests: {interests}

Requirements:
- Create a day-by-day itinerary.
- Include morning, afternoon, and evening activities.
- Suggest suitable places to visit.
- Consider the user's interests.
- Keep the plan within the given budget as much as reasonably possible.
- Include food suggestions.
- Include useful local travel suggestions.
- Keep the response easy to read.
- Use clear headings.

Return only the travel plan.
"""

    try:

        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
        )

        return response.text

    except Exception as e:

        return f"Unable to generate trip plan: {str(e)}"