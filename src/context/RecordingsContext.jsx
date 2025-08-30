import { createContext, useContext, useState, useEffect } from 'react';

const RecordingsContext = createContext();

export const useRecordings = () => {
  const context = useContext(RecordingsContext);
  if (!context) {
    throw new Error('useRecordings must be used within a RecordingsProvider');
  }
  return context;
};

export const RecordingsProvider = ({ children }) => {
  // Get recordings from localStorage if available
  const initialRecordings = JSON.parse(localStorage.getItem('recordings')) || [
    {
      id: 1,
      title: "React.js Tutorial for Beginners",
      subject: "React",
      duration: "3:48:04",
      instructor: "Great Learning",
      date: "2023-07-20",
      description: "Complete React.js tutorial covering fundamentals, components, state management, hooks, and more.",
      thumbnailUrl: "https://img.youtube.com/vi/SqcY0GlETPk/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
      videoId: "SqcY0GlETPk",
      isYouTube: true,
      downloads: 156,
      views: 892
    }
  ];

  const [recordings, setRecordings] = useState(initialRecordings);

  // Save recordings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recordings', JSON.stringify(recordings));
  }, [recordings]);

  const addRecording = (classData) => {
    // Convert class data to recording format
    const newRecording = {
      id: Date.now(),
      title: `${classData.subject} - ${classData.topic}`,
      subject: classData.subject,
      duration: classData.duration,
      instructor: classData.teacher,
      date: classData.date,
      description: classData.description,
      thumbnailUrl: classData.videoPreview?.thumbnailUrl,
      videoUrl: classData.videoPreview?.videoUrl,
      videoId: classData.videoPreview?.videoId,
      isYouTube: true,
      downloads: 0,
      views: 0,
      joinedDate: new Date().toISOString()
    };

    setRecordings(prev => [...prev, newRecording]);
  };

  const removeRecording = (recordingId) => {
    setRecordings(prev => prev.filter(recording => recording.id !== recordingId));
  };

  return (
    <RecordingsContext.Provider value={{ recordings, setRecordings, addRecording, removeRecording }}>
      {children}
    </RecordingsContext.Provider>
  );
};
