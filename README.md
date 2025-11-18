# Sync - AI Dance Comparison App

An AI-powered dance comparison application that uses MediaPipe for pose detection and OpenAI for intelligent feedback generation.

## Features

- **Video Upload & Processing**: Upload dance videos with automatic pose detection
- **Real-time Pose Analysis**: MediaPipe-powered skeletal tracking
- **Side-by-Side Comparison**: Compare reference videos with user performance
- **AI Feedback**: OpenAI GPT-4o generates personalized improvement suggestions
- **Modern UI**: Built with Next.js 15, React 19, and Tailwind CSS

## Tech Stack

### Backend
- **Python 3.x** - Core runtime
- **Flask** - Web framework
- **MediaPipe** - Pose detection and tracking
- **OpenCV** - Video processing
- **OpenAI API** - AI feedback generation

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **shadcn/ui** - UI components

## Installation

### Backend Setup

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Run the Flask server:**
   ```bash
   python app.py
   ```
   Server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd my-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local if needed (default: http://localhost:5000)
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Frontend will start on `http://localhost:3000`

## Project Structure

```
Sync/
├── app.py                 # Flask backend server
├── hello.py               # MediaPipe processing utilities
├── requirements.txt       # Python dependencies
├── .env.example          # Backend environment template
├── uploads/              # Uploaded videos and landmarks
├── static/processed/     # Processed videos with annotations
└── my-app/               # Next.js frontend
    ├── app/              # App router pages
    ├── components/       # React components
    ├── public/           # Static assets
    └── .env.local.example # Frontend environment template
```

## API Endpoints

### POST /upload
Upload and process a dance video
- **Input**: `video` (multipart/form-data)
- **Output**: `{video_url, raw_filename, landmarks_filename}`

### GET /processed/<filename>
Serve processed video files

### GET /video_feed
Real-time webcam feed with pose detection

### GET /compare_feed
Side-by-side comparison with similarity scoring
- **Params**: `video`, `landmarks`

### POST /generate_feedback
Generate AI feedback from landmarks
- **Input**: `{landmarks_filename}`
- **Output**: `{feedback}`

## Usage

1. **Upload Reference Video**: Start by uploading a professional dance video
2. **View Processed Video**: See the video with pose landmarks overlaid
3. **Record Performance**: (Optional) Record your own performance
4. **Compare**: Watch both videos side-by-side with synchronized playback
5. **Get AI Feedback**: Receive personalized improvement suggestions

## Development

### Running Tests
```bash
# Backend tests
pytest

# Frontend tests
cd my-app && npm test
```

### Code Style
- Backend: Follow PEP 8 guidelines
- Frontend: ESLint + Prettier configuration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- MediaPipe by Google
- OpenAI GPT-4o
- shadcn/ui component library
