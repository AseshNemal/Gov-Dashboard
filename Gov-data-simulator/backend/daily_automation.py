#!/usr/bin/env python3
"""
Daily Automation Script for Government Expense Simulator

This script is designed to be run daily (via cron or Task Scheduler)
to automatically generate new expense data.
"""

import sys
import os
from datetime import datetime
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('daily_automation.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

def main():
    """Main automation function"""
    logger.info("🤖 Starting daily automation...")
    logger.info(f"📅 Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    try:
        # Test database connection
        from db import test_connection
        if not test_connection():
            logger.error("❌ Database connection failed! Automation stopped.")
            sys.exit(1)
        
        logger.info("✅ Database connection successful")
        
        # Test Gemini connection
        from gemini_utils import test_gemini_connection
        if not test_gemini_connection():
            logger.error("❌ Gemini AI connection failed! Automation stopped.")
            sys.exit(1)
        
        logger.info("✅ Gemini AI connection successful")
        
        # Run the simulator
        from simulator import simulate_daily_data
        
        logger.info("🎯 Generating daily expense data...")
        simulate_daily_data()
        logger.info("✅ Daily expense data generated successfully!")
        
        # Optional: Get summary
        from simulator import get_summary_statistics
        summary = get_summary_statistics()
        if summary:
            logger.info(f"📊 Summary: {summary['total_districts']} districts, Total: LKR {summary['grand_total']:,.2f}")
        
        logger.info("🎉 Daily automation completed successfully!")
        
    except ImportError as e:
        logger.error(f"❌ Import error: {e}")
        logger.error("Make sure all dependencies are installed: pip install -r requirements.txt")
        sys.exit(1)
    except Exception as e:
        logger.error(f"❌ Automation failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
