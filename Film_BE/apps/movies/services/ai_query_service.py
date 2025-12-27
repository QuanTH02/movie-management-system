"""Service for analyzing natural language queries using AI."""

import json
import logging

from django.conf import settings

logger = logging.getLogger(__name__)

# Optional imports for AI services
try:
    import google.generativeai as genai

    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False
    logger.warning("google-generativeai not installed. Gemini API will not be available.")

try:
    import openai

    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False
    logger.warning("openai not installed. OpenAI API will not be available.")


class AIQueryService:
    """Service for analyzing natural language queries with AI."""

    @staticmethod
    def _get_default_filter():
        """Get default empty filter structure."""
        return {
            "movie_name": None,
            "year_min": None,
            "year_max": None,
            "rating_min": None,
            "rating_max": None,
            "genres": [],
            "directors": [],
            "cast": [],
            "countries": [],
            "languages": [],
            "keywords": [],
        }

    @staticmethod
    def _create_prompt(query: str) -> str:  # noqa: E501
        """Create prompt for AI."""
        # Long prompt string - ignore line length warnings
        return f"""You are a movie search filter analyzer. Your task is to analyze a user's natural language query and extract filter parameters for a movie database search.

Analyze the following query and extract relevant filter criteria:
"{query}"

Return ONLY a valid JSON object with the following structure. Do not include any explanatory text, markdown formatting, or code blocks.

Filter fields:
- movie_name: Extract the movie title if mentioned (string or null). Use partial matching, so extract the core title even if not exact.
- year_min: Minimum release year if specified (integer or null). Extract from phrases like "after 2010", "from 2020", "since 2015".
- year_max: Maximum release year if specified (integer or null). Extract from phrases like "before 2020", "until 2019", "up to 2021".
- rating_min: Minimum rating if mentioned (float or null). Rating scale is 0-10. Extract from phrases like "high rated", "above 8", "at least 7.5", "high rating".
- rating_max: Maximum rating if mentioned (float or null). Rating scale is 0-10.
- genres: Array of genre names mentioned (array of strings). Common genres: Action, Comedy, Drama, Horror, Sci-Fi, Romance, Thriller, Adventure, Fantasy, Animation, etc.
- directors: Array of director names if mentioned (array of strings).
- cast: Array of actor/actress names if mentioned (array of strings).
- countries: Array of country names if mentioned (array of strings).
- languages: Array of language names if mentioned (array of strings).
- keywords: Array of keywords to search in movie description/storyline (array of strings). Extract thematic keywords, plot elements, or descriptive terms.

Rules:
1. If a field cannot be determined from the query, set it to null (for single values) or empty array [] (for arrays).
2. For year extraction: "2020" means year_min=2020 and year_max=2020. "after 2010" means year_min=2010. "before 2020" means year_max=2020.
3. For rating extraction: "high rated" or "high rating" typically means rating_min=7.0 or higher. "highly rated" means rating_min=8.0. "top rated" means rating_min=8.5.
4. Extract genre names in English, even if the query is in another language.
5. IMPORTANT: If the query is a single word or name without context (e.g., "James", "Tom Hanks"), it is likely a person's name (actor/director). Put it in the "cast" array if it could be an actor, or "directors" array if it could be a director. Only use "movie_name" if the query explicitly mentions it's a movie title (e.g., "movie James", "film Inception").
6. If the query contains phrases like "with [name]", "starring [name]", "featuring [name]", put the name in the "cast" array.
7. If the query contains phrases like "directed by [name]", "by [director name]", put the name in the "directors" array.
8. Return ONLY the JSON object, no additional text or formatting.

Example output format:
{{
  "movie_name": null,
  "year_min": 2020,
  "year_max": null,
  "rating_min": 8.0,
  "rating_max": null,
  "genres": ["Action", "Sci-Fi"],
  "directors": [],
  "cast": [],
  "countries": [],
  "languages": [],
  "keywords": []
}}

Now analyze this query and return the JSON filter:"""

    @staticmethod
    def _call_gemini(query: str) -> dict:
        """Call Gemini API to analyze query."""
        if not GEMINI_AVAILABLE:
            logger.warning("google-generativeai package not available")
            return AIQueryService._get_default_filter()

        try:
            api_key = getattr(settings, "GEMINI_API_KEY", None)
            if not api_key:
                logger.warning("GEMINI_API_KEY not configured")
                return AIQueryService._get_default_filter()

            logger.info(f"Calling Gemini API with query: {query}")
            genai.configure(api_key=api_key)
            # Use gemini-2.5-flash for better availability and performance
            model = genai.GenerativeModel("gemini-2.5-flash")

            prompt = AIQueryService._create_prompt(query)
            logger.info("Sending prompt to Gemini API...")
            response = model.generate_content(prompt)
            logger.info(
                f"Received response from Gemini API: {response.text[:200] if response and response.text else 'None'}"
            )

            if not response or not response.text:
                logger.warning("Empty response from Gemini API")
                return AIQueryService._get_default_filter()

            # Extract JSON from response
            text = response.text.strip()
            # Remove markdown code blocks if present
            if text.startswith("```json"):
                text = text[7:]
            if text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()

            filter_data = json.loads(text)
            # Merge with default to ensure all fields exist
            default_filter = AIQueryService._get_default_filter()
            default_filter.update(filter_data)
            return default_filter

        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse JSON from Gemini response: {e}")
            return AIQueryService._get_default_filter()
        except Exception as e:
            logger.error(f"Error calling Gemini API: {e}")
            return AIQueryService._get_default_filter()

    @staticmethod
    def _call_openai(query: str) -> dict:
        """Call OpenAI API to analyze query (fallback)."""
        if not OPENAI_AVAILABLE:
            logger.warning("openai package not available")
            return AIQueryService._get_default_filter()

        try:
            api_key = getattr(settings, "GPT_API_KEY", None) or getattr(settings, "OPENAI_API_KEY", None)
            if not api_key:
                logger.warning("GPT_API_KEY/OPENAI_API_KEY not configured")
                return AIQueryService._get_default_filter()

            client = openai.OpenAI(api_key=api_key)
            prompt = AIQueryService._create_prompt(query)

            system_msg = (
                "You are a movie search filter analyzer. "
                "Analyze natural language queries and extract filter parameters. "
                "Return ONLY valid JSON without any additional text, markdown, or code blocks."
            )
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": system_msg,
                    },
                    {"role": "user", "content": prompt},
                ],
                temperature=0.3,
                max_tokens=500,
            )

            if not response or not response.choices:
                logger.warning("Empty response from OpenAI API")
                return AIQueryService._get_default_filter()

            text = response.choices[0].message.content.strip()
            # Remove markdown code blocks if present
            if text.startswith("```json"):
                text = text[7:]
            if text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()

            filter_data = json.loads(text)
            default_filter = AIQueryService._get_default_filter()
            default_filter.update(filter_data)
            return default_filter

        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse JSON from OpenAI response: {e}")
            return AIQueryService._get_default_filter()
        except Exception as e:
            logger.error(f"Error calling OpenAI API: {e}")
            return AIQueryService._get_default_filter()

    @staticmethod
    def analyze_query(query: str) -> dict:
        """
        Analyze natural language query and return filter data.

        Args:
            query: Natural language search query

        Returns:
            Dictionary with filter parameters
        """
        if not query or not query.strip():
            return AIQueryService._get_default_filter()

        query = query.strip()

        # Try Gemini first, fallback to OpenAI if available
        try:
            result = AIQueryService._call_gemini(query)
            if result != AIQueryService._get_default_filter():
                return result
        except Exception as e:
            logger.warning(f"Gemini API failed, trying OpenAI: {e}")

        # Fallback to OpenAI if Gemini fails
        try:
            result = AIQueryService._call_openai(query)
            return result
        except Exception as e:
            logger.error(f"Both AI APIs failed: {e}")
            return AIQueryService._get_default_filter()
