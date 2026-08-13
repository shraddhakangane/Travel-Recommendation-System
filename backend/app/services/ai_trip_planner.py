from google import genai

from app.core.settings import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def generate_trip_plan(destination, days, budget, interests):
    prompt = f"""
You are an expert travel planner.

Destination: {destination}
Days: {days}
Budget: ₹{budget}
Interests: {interests}

Create a detailed day-wise itinerary.
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
        )

        return response.text

    except Exception as e:
        return str(e)
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt,
    )

    return response.text