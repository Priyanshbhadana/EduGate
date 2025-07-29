# EduGate - Student Entry-Exit Management System

A user-friendly web application for real-time monitoring of student entry and exit across various gates in the IIITA campus.

## About

EduGate is designed to streamline the process of tracking student movements in and out of campus facilities. It enhances security and provides valuable insights into student attendance patterns. The application is built with modern web technologies, ensuring a responsive and intuitive user experience.

## Features

- **Scan ID Card**: Quickly scan student ID cards using QR/barcode for entry/exit.
- **Manual Entry**: Input roll number manually if scanning is not possible.
- **Live Student List**: View all entries and filter by date, exit status, or search by name/roll number.
- **CSV Export**: Download all entry/exit data as a CSV file.
- **Dark Mode**: Toggle between light and dark themes.
- **Toast Notifications**: Get instant feedback on actions.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Priyanshbhadana/EduGate.git
   cd EduGate
   ```

2. **Setup environment variables:**

   - Copy `.env.example` to `.env` in both `frontend/` and `backend/` folders and fill in your MongoDB URI and other settings.

3. **Install dependencies:**

   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

4. **Run the backend:**

   ```bash
   cd ../backend
   npm run dev
   ```

5. **Run the frontend:**

   ```bash
   cd ../frontend
   npm start
   ```

6. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
EduGate/
├── backend/
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md
```

## Technologies Used

- **Frontend:** React.js, Redux Toolkit, Tailwind CSS, html5-qrcode
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Other:** React Router, React Toastify

## Usage

- **Scan ID-Card:** Click "Scan ID-Card" and allow camera access. Hold your ID steady for scanning.
- **Manual Entry:** Click "Input Roll No." and type the roll number.
- **Create Entry/Exit:** Use the respective buttons after scanning or entering roll number.
- **Export Data:** Use the "Export CSV" button on the home page.

## Troubleshooting

- If the camera does not close after scanning, ensure browser permissions are granted and only one scanner is open at a time.
- For duplicate scanner/camera issues, make sure you are running the latest code from this repository.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
