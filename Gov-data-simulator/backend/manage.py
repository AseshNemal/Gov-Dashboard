#!/usr/bin/env python3
"""
Government Expense Simulator - Setup and Management Script

This script helps you set up, run, and manage the Government Expense Simulator.
"""

import sys
import os
import subprocess
from datetime import datetime

def install_dependencies():
    """Install Python dependencies"""
    print("📦 Installing Python dependencies...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], check=True)
        print("✅ Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def check_env_file():
    """Check if .env file exists and has required variables"""
    env_file = ".env"
    if not os.path.exists(env_file):
        print("❌ .env file not found!")
        print("Creating sample .env file...")
        create_sample_env()
        return False
    
    with open(env_file, 'r') as f:
        content = f.read()
    
    required_vars = ["MONGODB_URI", "GEMINI_API_KEY"]
    missing_vars = []
    
    for var in required_vars:
        if var not in content or f"{var}=" not in content:
            missing_vars.append(var)
    
    if missing_vars:
        print(f"❌ Missing environment variables: {', '.join(missing_vars)}")
        return False
    
    # Check for placeholder values
    if "your_google_generative_ai_key_here" in content:
        print("⚠️  Please update your GEMINI_API_KEY in the .env file")
        return False
    
    print("✅ Environment variables configured!")
    return True

def create_sample_env():
    """Create a sample .env file"""
    sample_content = """# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017

# Google Gemini AI API Key
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_google_generative_ai_key_here

# Optional: Database name (default: reviveNation)
DB_NAME=reviveNation

# Optional: Collection name (default: expenses)
COLLECTION_NAME=expenses
"""
    with open(".env", "w") as f:
        f.write(sample_content)
    print("✅ Sample .env file created! Please update it with your actual values.")

def test_connections():
    """Test database and AI connections"""
    print("🔍 Testing connections...")
    
    try:
        from db import test_connection
        from gemini_utils import test_gemini_connection
        
        db_ok = test_connection()
        gemini_ok = test_gemini_connection()
        
        if db_ok and gemini_ok:
            print("✅ All connections working!")
            return True
        else:
            print("❌ Some connections failed. Please check your configuration.")
            return False
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False

def run_simulator():
    """Run the expense simulator once"""
    print("🎯 Running expense simulator...")
    try:
        from simulator import simulate_daily_data
        simulate_daily_data()
        print("✅ Expense data generated successfully!")
        return True
    except Exception as e:
        print(f"❌ Failed to run simulator: {e}")
        return False

def start_api():
    """Start the FastAPI server"""
    print("🚀 Starting API server...")
    try:
        subprocess.run([sys.executable, "api.py"], check=True)
    except KeyboardInterrupt:
        print("\n⏹️  API server stopped.")
    except Exception as e:
        print(f"❌ Failed to start API server: {e}")

def show_status():
    """Show current status of the system"""
    print("📊 Government Expense Simulator Status")
    print("=" * 50)
    
    # Check dependencies
    try:
        import pymongo, google.generativeai, fastapi
        print("✅ Dependencies: Installed")
    except ImportError:
        print("❌ Dependencies: Missing")
    
    # Check .env
    env_ok = check_env_file()
    
    # Check connections if env is OK
    if env_ok:
        test_connections()
    
    # Check data
    try:
        from db import collection
        count = collection.count_documents({})
        print(f"📊 Database records: {count}")
        
        if count > 0:
            latest = collection.find().sort("date", -1).limit(1)
            latest_doc = list(latest)[0]
            print(f"📅 Latest data: {latest_doc.get('date', 'Unknown')}")
    except Exception as e:
        print(f"❌ Database status: {e}")

def setup_cron_job():
    """Helper to set up cron job (Linux/macOS)"""
    if sys.platform.startswith('win'):
        print("⚠️  Windows detected. Please use Task Scheduler to automate the simulator.")
        print("Set up a daily task to run: python simulator.py")
        return
    
    current_dir = os.path.abspath(os.getcwd())
    python_path = sys.executable
    simulator_path = os.path.join(current_dir, "simulator.py")
    
    cron_command = f"0 7 * * * {python_path} {simulator_path}"
    
    print("🕒 To set up daily automation, add this to your crontab:")
    print(f"   {cron_command}")
    print("\nRun 'crontab -e' and add the line above to run daily at 7 AM")

def main():
    """Main menu"""
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == "install":
            install_dependencies()
        elif command == "setup":
            install_dependencies()
            check_env_file()
        elif command == "test":
            test_connections()
        elif command == "run":
            run_simulator()
        elif command == "api":
            start_api()
        elif command == "status":
            show_status()
        elif command == "cron":
            setup_cron_job()
        else:
            print(f"Unknown command: {command}")
            show_help()
    else:
        show_interactive_menu()

def show_help():
    """Show help message"""
    print("""
Government Expense Simulator - Management Script

Usage: python manage.py <command>

Commands:
  install   - Install Python dependencies
  setup     - Install dependencies and create .env file
  test      - Test database and AI connections
  run       - Run the expense simulator once
  api       - Start the API server
  status    - Show system status
  cron      - Show cron job setup instructions

Or run without arguments for interactive menu.
    """)

def show_interactive_menu():
    """Show interactive menu"""
    while True:
        print("\n" + "="*50)
        print("🏛️  Government Expense Simulator")
        print("="*50)
        print("1. 📦 Install dependencies")
        print("2. ⚙️  Setup (install + create .env)")
        print("3. 🔍 Test connections")
        print("4. 🎯 Run simulator once")
        print("5. 🚀 Start API server")
        print("6. 📊 Show status")
        print("7. 🕒 Setup automation (cron)")
        print("8. 📖 Show help")
        print("9. ❌ Exit")
        
        choice = input("\nSelect an option (1-9): ").strip()
        
        if choice == "1":
            install_dependencies()
        elif choice == "2":
            install_dependencies()
            check_env_file()
        elif choice == "3":
            test_connections()
        elif choice == "4":
            run_simulator()
        elif choice == "5":
            start_api()
        elif choice == "6":
            show_status()
        elif choice == "7":
            setup_cron_job()
        elif choice == "8":
            show_help()
        elif choice == "9":
            print("👋 Goodbye!")
            break
        else:
            print("❌ Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
