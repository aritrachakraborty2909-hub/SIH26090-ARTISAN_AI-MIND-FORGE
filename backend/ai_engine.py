import os
import json
from PIL import Image
from rembg import remove, new_session
from google import genai
from google.genai import types

# Use lightweight u2netp model on CPU for fast execution without hanging
cpu_session = new_session(model_name="u2netp", providers=['CPUExecutionProvider'])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

def enhance_product_image(input_path: str, output_path: str):
    """Removes background quickly and sets clean white background."""
    input_image = Image.open(input_path)
    
    # Process with lightweight model
    output_image = remove(input_image, session=cpu_session)
    
    background = Image.new("RGBA", output_image.size, (255, 255, 255, 255))
    final_image = Image.alpha_composite(background, output_image).convert("RGB")
    final_image.save(output_path, "JPEG")
    return output_path

def generate_catalog_and_pricing(description: str):
    """Generates SEO descriptions and dynamic pricing safely."""
    fallback_data = {
        "title": f"Handcrafted {description}",
        "description_en": f"A beautiful handcrafted {description} made by skilled traditional artisans.",
        "description_hi": f"पारंपरिक कारीगरों द्वारा निर्मित उत्कृष्ट हस्तनिर्मित {description}।",
        "suggested_price": 1250
    }

    if not client:
        return fallback_data

    try:
        prompt = f"""
        You are an AI e-commerce business manager for rural artisans. 
        Based on this artisan description: '{description}', generate:
        1. Professional Product Title
        2. SEO-friendly English description
        3. Hindi translation of description
        4. Suggested retail price in INR as an integer.
        
        Return response strictly in JSON with keys: title, description_en, description_hi, suggested_price.
        """
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(response_mime_type="application/json")
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return fallback_data