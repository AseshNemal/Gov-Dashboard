# Government Expense Simulator - Backend

A Python-based backend system that simulates daily government expenses for Sri Lankan districts using MongoDB for storage and Google Gemini AI for intelligent data variations.

## 🏗️ Architecture

```
backend/
├── simulator.py          # Main simulation logic
├── gemini_utils.py       # Google Gemini AI integration
├── db.py                # MongoDB connection and utilities
├── api.py               # FastAPI REST API server
├── manage.py            # Management and setup script
├── daily_automation.py  # Automated daily execution script
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (create this)
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Setup Environment

```bash
# Install dependencies
python3 -m pip install -r requirements.txt

# Or use the management script
python3 manage.py install
```

### 2. Configure Environment Variables

Create a `.env` file with:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017

# Google Gemini AI API Key
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Optional configurations
DB_NAME=reviveNation
COLLECTION_NAME=expenses
```

### 3. Test Connections

```bash
python3 manage.py test
```

### 4. Generate Initial Data

```bash
python3 manage.py run
```

### 5. Start API Server

```bash
python3 manage.py api
# Or directly: python3 api.py
```

The API will be available at:
- **API Server**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 📊 Features

### Data Simulation
- **10 Sri Lankan Districts**: Colombo, Kandy, Galle, Jaffna, Anuradhapura, Polonnaruwa, Kurunegala, Puttalam, Kegalle, Ratnapura
- **10 Government Sectors**: Health, Education, Defense, Transport, Agriculture, Infrastructure, Social Services, Environment, Tourism, Technology
- **Realistic Data**: Base amounts vary by district population and economic activity
- **AI Enhancement**: Gemini AI adds intelligent variations (±5% to ±15%)

### REST API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /` | API status and information |
| `GET /health` | Health check and database status |
| `GET /api/latest` | Latest expense data for all districts |
| `GET /api/summary` | Summary statistics |
| `GET /api/district/{name}` | Latest data for specific district |
| `GET /api/historical/{days}` | Historical data (max 30 days) |
| `GET /api/sectors` | Sector-wise analysis across districts |
| `GET /api/districts` | All districts with latest totals |

### Database Schema

```json
{
  "_id": "ObjectId",
  "date": "2025-07-17",
  "district": "Colombo",
  "timestamp": "2025-07-17T10:30:00",
  "sectors": {
    "Health": 450000,
    "Education": 380000,
    "Defense": 520000,
    "Transport": 320000,
    "Agriculture": 280000,
    "Infrastructure": 680000,
    "Social_Services": 240000,
    "Environment": 180000,
    "Tourism": 160000,
    "Technology": 200000
  },
  "total_expense": 3410000
}
```

## 🤖 Automation

### Daily Automation

Set up daily automation using cron (Linux/macOS) or Task Scheduler (Windows):

#### Linux/macOS (cron):
```bash
# Edit crontab
crontab -e

# Add this line to run daily at 7 AM
0 7 * * * /path/to/python3 /path/to/backend/daily_automation.py
```

#### Windows (Task Scheduler):
1. Open Task Scheduler
2. Create Basic Task
3. Set trigger: Daily at 7:00 AM
4. Set action: Start program `python3 daily_automation.py`

### Management Commands

Use the `manage.py` script for easy management:

```bash
# Interactive menu
python3 manage.py

# Direct commands
python3 manage.py install    # Install dependencies
python3 manage.py setup      # Install + create .env
python3 manage.py test       # Test connections
python3 manage.py run        # Run simulator once
python3 manage.py api        # Start API server
python3 manage.py status     # Show system status
python3 manage.py cron       # Show cron setup instructions
```

## 🔧 Configuration

### MongoDB Setup

#### Local MongoDB:
```bash
# Install MongoDB (macOS)
brew install mongodb/brew/mongodb-community

# Start MongoDB
brew services start mongodb-community

# Use default URI
MONGODB_URI=mongodb://localhost:27017
```

#### MongoDB Atlas (Cloud):
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster and database
3. Get connection string
4. Update `.env` with Atlas URI

### Gemini AI Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create API key
3. Add to `.env` file

## 📈 Sample Data Output

```json
{
  "success": true,
  "data": [
    {
      "date": "2025-07-17",
      "district": "Colombo",
      "sectors": {
        "Health": 475000,
        "Education": 390000,
        "Defense": 510000,
        "Transport": 330000,
        "Agriculture": 270000,
        "Infrastructure": 720000,
        "Social_Services": 250000,
        "Environment": 190000,
        "Tourism": 180000,
        "Technology": 220000
      },
      "total_expense": 3535000
    }
  ]
}
```

## 🛠️ Development

### Project Structure
- `simulator.py`: Core simulation logic with realistic expense generation
- `gemini_utils.py`: Google Gemini AI integration for data variation
- `db.py`: MongoDB connection and database utilities
- `api.py`: FastAPI server with comprehensive endpoints
- `manage.py`: All-in-one management script
- `daily_automation.py`: Automated daily execution with logging

### Adding New Features

1. **New Districts**: Update `districts` list in `simulator.py`
2. **New Sectors**: Update `sectors` list in `simulator.py`
3. **New API Endpoints**: Add to `api.py`
4. **Custom Logic**: Modify `generate_base_expenses()` in `simulator.py`

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify MONGODB_URI in .env
   - Check network connectivity for Atlas

2. **Gemini AI Error**
   - Verify API key in .env
   - Check API quota limits
   - Ensure internet connection

3. **Import Errors**
   - Run `pip install -r requirements.txt`
   - Check Python version (3.7+)
   - Verify virtual environment

### Logs

Daily automation creates logs in `daily_automation.log`:
```bash
tail -f daily_automation.log
```

## 📋 Dependencies

```txt
pymongo>=4.0.0          # MongoDB driver
python-dotenv>=0.19.0   # Environment variables
google-generativeai>=0.3.0  # Gemini AI
fastapi>=0.104.0        # REST API framework
uvicorn>=0.24.0         # ASGI server
```

## 🔒 Security Notes

- Keep `.env` file private (added to .gitignore)
- Use MongoDB authentication in production
- Restrict Gemini API key usage
- Use HTTPS in production
- Implement rate limiting for APIs

## 📞 Support

For issues or questions:
1. Check the logs
2. Run `python3 manage.py status`
3. Verify environment configuration
4. Test individual components

## 📄 License

This project is for educational and simulation purposes.
