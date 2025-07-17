from db import collection, test_connection
from gemini_utils import refine_with_gemini, test_gemini_connection
import random
from datetime import date, datetime
import sys

# Sri Lankan districts and government sectors
districts = [
    "Colombo", "Kandy", "Galle", "Jaffna", "Anuradhapura", 
    "Polonnaruwa", "Kurunegala", "Puttalam", "Kegalle", "Ratnapura"
]

sectors = [
    "Health", "Education", "Defense", "Transport", "Agriculture",
    "Infrastructure", "Social_Services", "Environment", "Tourism", "Technology"
]

def generate_base_expenses(district):
    """Generate realistic base expenses for each sector"""
    # Base multipliers for different districts (considering population and economic activity)
    district_multipliers = {
        "Colombo": 2.0,      # Highest expenses due to capital status
        "Kandy": 1.3,        # Major city
        "Galle": 1.1,        # Coastal tourism hub
        "Jaffna": 0.9,       # Northern province
        "Anuradhapura": 0.8, # Historical city
        "Polonnaruwa": 0.7,  # Smaller population
        "Kurunegala": 1.0,   # Average
        "Puttalam": 0.8,     # Coastal, smaller
        "Kegalle": 0.7,      # Rural
        "Ratnapura": 0.8     # Gem mining area
    }
    
    # Base expense ranges for each sector (in LKR)
    sector_ranges = {
        "Health": (200000, 800000),
        "Education": (150000, 600000),
        "Defense": (100000, 400000),
        "Transport": (300000, 900000),
        "Agriculture": (100000, 500000),
        "Infrastructure": (400000, 1200000),
        "Social_Services": (80000, 300000),
        "Environment": (50000, 200000),
        "Tourism": (60000, 250000),
        "Technology": (70000, 300000)
    }
    
    multiplier = district_multipliers.get(district, 1.0)
    expenses = {}
    
    for sector in sectors:
        min_val, max_val = sector_ranges[sector]
        base_amount = random.randint(int(min_val * multiplier), int(max_val * multiplier))
        expenses[sector] = base_amount
    
    return expenses

def simulate_daily_data():
    """Generate and store daily expense data for all districts"""
    today = str(date.today())
    print(f"\n🗓️ Generating expense data for {today}")
    print("=" * 50)
    
    # Test connections first
    if not test_connection():
        print("❌ Cannot proceed without MongoDB connection")
        return False
        
    if not test_gemini_connection():
        print("⚠️ Proceeding without Gemini AI (using base data only)")
    
    total_inserted = 0
    
    for district in districts:
        try:
            # Generate base expense data
            base_data = generate_base_expenses(district)
            
            # Refine with Gemini AI
            refined_data = refine_with_gemini(district, base_data)
            
            # Create document for MongoDB
            document = {
                "date": today,
                "timestamp": datetime.now(),
                "district": district,
                "sectors": refined_data,
                "total_expense": sum(refined_data.values()),
                "currency": "LKR"
            }
            
            # Insert into MongoDB
            result = collection.insert_one(document)
            total_inserted += 1
            
            print(f"✅ {district}: {sum(refined_data.values()):,} LKR")
            
        except Exception as e:
            print(f"❌ Error processing {district}: {e}")
    
    print("=" * 50)
    print(f"📊 Successfully inserted data for {total_inserted}/{len(districts)} districts")
    return True

def get_latest_data():
    """Retrieve latest expense data from MongoDB"""
    try:
        latest_data = list(collection.find().sort("timestamp", -1).limit(len(districts)))
        return latest_data
    except Exception as e:
        print(f"Error retrieving data: {e}")
        return []

def get_summary_statistics():
    """Generate summary statistics for the latest data"""
    latest_data = get_latest_data()
    if not latest_data:
        return None
        
    total_expenses = sum(doc['total_expense'] for doc in latest_data)
    districts_count = len(latest_data)
    avg_expense = total_expenses / districts_count if districts_count > 0 else 0
    
    # Sector-wise totals
    sector_totals = {}
    for doc in latest_data:
        for sector, amount in doc['sectors'].items():
            sector_totals[sector] = sector_totals.get(sector, 0) + amount
    
    return {
        "total_expenses": total_expenses,
        "districts_count": districts_count,
        "average_expense_per_district": avg_expense,
        "sector_totals": sector_totals,
        "date": latest_data[0]['date'] if latest_data else None
    }

if __name__ == "__main__":
    print("🏛️ Daily Government Expense Simulator")
    print("🇱🇰 Sri Lanka - Ministry of Finance")
    print("=" * 50)
    
    if len(sys.argv) > 1 and sys.argv[1] == "--summary":
        # Display summary statistics
        summary = get_summary_statistics()
        if summary:
            print(f"\n📈 Summary for {summary['date']}")
            print(f"💰 Total Expenses: {summary['total_expenses']:,} LKR")
            print(f"🏘️ Districts Processed: {summary['districts_count']}")
            print(f"📊 Average per District: {summary['average_expense_per_district']:,.0f} LKR")
            print("\n🏢 Sector-wise Breakdown:")
            for sector, total in sorted(summary['sector_totals'].items(), key=lambda x: x[1], reverse=True):
                print(f"  • {sector}: {total:,} LKR")
        else:
            print("❌ No data available")
    else:
        # Generate new daily data
        simulate_daily_data()
        
        # Show summary after generation
        print("\n" + "=" * 50)
        summary = get_summary_statistics()
        if summary:
            print(f"\n📈 Today's Summary:")
            print(f"💰 Total Daily Expenses: {summary['total_expenses']:,} LKR")
            print(f"📊 Average per District: {summary['average_expense_per_district']:,.0f} LKR")
