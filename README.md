# Sri Lanka Government Dashboard

A comprehensive real-time government expense monitoring dashboard built with Next.js and FastAPI.

## 🚀 Features

### Backend (Python/FastAPI)
- **Real-time Data Generation**: Simulates daily government expenses across 10 districts and 10 sectors
- **AI Integration**: Uses Google Gemini AI to refine and adjust expense data for realistic variations
- **MongoDB Atlas**: Cloud database for data persistence
- **RESTful API**: 8 endpoints for data access and management
- **Automated Data Generation**: Can be scheduled for daily updates

### Frontend (Next.js/React)
- **Modern Dashboard**: Clean, responsive interface with real-time data visualization
- **Interactive Charts**: Bar charts, pie charts, line charts, and area charts using Recharts
- **Mobile Responsive**: Fully responsive design that works on all devices
- **Real-time Updates**: Live data fetching from the backend API
- **Multiple Views**: Overview, Analytics, Districts, and Sectors pages
- **Advanced UI**: Smooth animations with Framer Motion

## 🚀 Getting Started

### Prerequisites
- Python 3.9 or higher
- Node.js 18 or higher
- MongoDB Atlas account
- Google Gemini AI API key

### Backend Setup

1. **Set up Python virtual environment**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. **Install backend dependencies**
   ```bash
   cd Gov-data-simulator/backend
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   Create `.env` file in the backend directory with:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Test the setup**
   ```bash
   python manage.py test
   ```

5. **Start the backend API**
   ```bash
   python manage.py api
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd dashboard
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:3000`

## 📊 API Endpoints

- `GET /health` - Health check
- `GET /latest` - Get latest expense data
- `GET /summary` - Get summary statistics
- `GET /districts` - Get districts data
- `GET /sectors` - Get sectors data
- `GET /historical?days=30` - Get historical data
- `POST /generate` - Generate new expense data

## 🛠️ Technologies Used

### Backend
- Python 3.9+, FastAPI, MongoDB Atlas, Google Gemini AI, Uvicorn

### Frontend
- Next.js 14, TypeScript, Tailwind CSS, Recharts, Framer Motion, Lucide React

## 📱 Dashboard Features

- **Overview Page**: Real-time statistics and interactive charts
- **Analytics Page**: Advanced performance metrics and insights
- **Districts Page**: Searchable district data with detailed breakdowns
- **Sectors Page**: Sector ranking and budget share analysis

Built with ❤️ for Sri Lankan Government transparency and efficiency.