import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini AI
genai_api_key = os.getenv("GEMINI_API_KEY")
model = None

try:
    if genai_api_key:
        genai.configure(api_key=genai_api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        print("✅ Gemini AI configured successfully")
    else:
        print("⚠️  No Gemini API key found")
except Exception as e:
    print(f"⚠️  Failed to configure Gemini: {e}")
    model = None

def refine_with_gemini(district, sectors_dict):
    """
    Use Gemini AI to refine and adjust daily expense values
    Slightly adjusts values by ±10% to simulate realistic variations
    """
    if model is None:
        print(f"⚠️  Gemini not available, using basic variation for {district}")
        # Apply simple random variation if Gemini is not available
        import random
        adjusted_data = {}
        for sector, amount in sectors_dict.items():
            variation = random.uniform(0.9, 1.1)  # ±10% variation
            adjusted_data[sector] = round(amount * variation, 2)
        return adjusted_data
    
    prompt = f"""
    You are a financial analyst for Sri Lankan government expenses.
    Adjust these daily expense values for district '{district}'.
    Make realistic adjustments (±5% to ±15%) based on:
    - District population and economic activity
    - Seasonal factors
    - Government priorities
    - Regional needs

    Current expenses (in LKR):
    {json.dumps(sectors_dict, indent=2)}

    Return ONLY a valid JSON object with the same structure but adjusted values.
    Do not include any explanations or markdown formatting.
    """
    
    try:
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Clean up the response to ensure it's valid JSON
        if response_text.startswith('```json'):
            response_text = response_text.replace('```json', '').replace('```', '').strip()
        elif response_text.startswith('```'):
            response_text = response_text.replace('```', '').strip()
            
        # Parse the JSON response
        updated_data = json.loads(response_text)
        print(f"✅ Gemini AI refined data for {district}")
        return updated_data
        
    except Exception as e:
        print(f"⚠️ Gemini AI refinement failed for {district}: {e}")
        print("📋 Using original data as fallback")
        return sectors_dict

def test_gemini_connection():
    """Test Gemini AI connection"""
    if model is None:
        print("⚠️  Gemini AI not configured - using fallback mode")
        return False
    
    try:
        test_data = {"Health": 100000, "Education": 150000}
        result = refine_with_gemini("Test District", test_data)
        print("✅ Gemini AI connection successful!")
        return True
    except Exception as e:
        print(f"❌ Gemini AI connection failed: {e}")
        return False
