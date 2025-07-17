from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db import collection, test_connection
from simulator import get_latest_data, get_summary_statistics
from datetime import datetime, timedelta
import json
from typing import List, Dict, Any

app = FastAPI(
    title="Government Expense Simulator API",
    description="API for Sri Lankan Government Daily Expense Data",
    version="1.0.0"
)

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Government Expense Simulator API",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    db_status = test_connection()
    return {
        "status": "healthy" if db_status else "unhealthy",
        "database": "connected" if db_status else "disconnected",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/latest")
async def get_latest_expenses():
    """Get latest expense data for all districts"""
    try:
        data = get_latest_data()
        return {
            "success": True,
            "data": data,
            "count": len(data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/summary")
async def get_summary():
    """Get summary statistics for latest data"""
    try:
        summary = get_summary_statistics()
        if not summary:
            raise HTTPException(status_code=404, detail="No data available")
        return {
            "success": True,
            "summary": summary
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/district/{district_name}")
async def get_district_data(district_name: str):
    """Get latest data for a specific district"""
    try:
        data = list(collection.find({"district": district_name}).sort("timestamp", -1).limit(1))
        if not data:
            raise HTTPException(status_code=404, detail=f"No data found for district: {district_name}")
        return {
            "success": True,
            "data": data[0]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/historical/{days}")
async def get_historical_data(days: int = 7):
    """Get historical data for the last N days"""
    try:
        if days > 30:
            raise HTTPException(status_code=400, detail="Maximum 30 days allowed")
            
        start_date = datetime.now() - timedelta(days=days)
        data = list(collection.find({
            "timestamp": {"$gte": start_date}
        }).sort("timestamp", -1))
        
        return {
            "success": True,
            "data": data,
            "count": len(data),
            "days": days
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/sectors")
async def get_sector_analysis():
    """Get sector-wise analysis across all districts"""
    try:
        latest_data = get_latest_data()
        if not latest_data:
            raise HTTPException(status_code=404, detail="No data available")
        
        # Aggregate sector data
        sector_analysis = {}
        for doc in latest_data:
            for sector, amount in doc['sectors'].items():
                if sector not in sector_analysis:
                    sector_analysis[sector] = {
                        "total": 0,
                        "districts": [],
                        "average": 0,
                        "min": float('inf'),
                        "max": 0
                    }
                
                sector_analysis[sector]["total"] += amount
                sector_analysis[sector]["districts"].append({
                    "district": doc["district"],
                    "amount": amount
                })
                sector_analysis[sector]["min"] = min(sector_analysis[sector]["min"], amount)
                sector_analysis[sector]["max"] = max(sector_analysis[sector]["max"], amount)
        
        # Calculate averages
        for sector in sector_analysis:
            count = len(sector_analysis[sector]["districts"])
            sector_analysis[sector]["average"] = sector_analysis[sector]["total"] / count if count > 0 else 0
        
        return {
            "success": True,
            "sector_analysis": sector_analysis
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/districts")
async def get_all_districts():
    """Get list of all districts with their latest totals"""
    try:
        latest_data = get_latest_data()
        districts_data = []
        
        for doc in latest_data:
            districts_data.append({
                "district": doc["district"],
                "total_expense": doc["total_expense"],
                "date": doc["date"],
                "sectors_count": len(doc["sectors"])
            })
        
        # Sort by total expense (descending)
        districts_data.sort(key=lambda x: x["total_expense"], reverse=True)
        
        return {
            "success": True,
            "districts": districts_data,
            "count": len(districts_data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Government Expense Simulator API...")
    print("📊 Dashboard will be available at: http://localhost:8000")
    print("📖 API docs available at: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
