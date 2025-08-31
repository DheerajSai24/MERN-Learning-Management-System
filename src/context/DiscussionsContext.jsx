import { useState, useEffect } from 'react';
import axios from 'axios'; 

// Define the API URL
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api/discussions' 
  : 'http://localhost:5000/api/discussions';

export const useDiscussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all discussions
  const fetchDiscussions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_URL);
      setDiscussions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch discussions. Please try again.');
      console.error('Error fetching discussions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new discussion
  const createDiscussion = async (discussionData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, discussionData);
      setDiscussions(prev => [response.data, ...prev]);
      return { success: true, discussion: response.data };
    } catch (err) {
      setError('Failed to create discussion. Please try again.');
      console.error('Error creating discussion:', err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single discussion by ID
  const getDiscussionById = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return { success: true, discussion: response.data };
    } catch (err) {
      setError('Failed to fetch discussion details. Please try again.');
      console.error('Error fetching discussion:', err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Add a comment to a discussion
  const addComment = async (discussionId, commentData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/${discussionId}/comments`, commentData);
      
      // Update the discussions state if the commented discussion is in the list
      setDiscussions(prev => prev.map(discussion => 
        discussion._id === discussionId 
          ? {...discussion, comments: [...discussion.comments, response.data]} 
          : discussion
      ));
      
      return { success: true, comment: response.data };
    } catch (err) {
      setError('Failed to add comment. Please try again.');
      console.error('Error adding comment:', err);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize by fetching discussions
  useEffect(() => {
    fetchDiscussions();
  }, []);

  return { 
    discussions, 
    isLoading, 
    error, 
    fetchDiscussions, 
    createDiscussion, 
    getDiscussionById,
    addComment
  };
};
