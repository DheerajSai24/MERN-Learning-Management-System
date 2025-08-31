import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DiscussionDetail.css';

const DiscussionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [replyContent, setReplyContent] = useState('');
  
  // Mock data for discussion detail - in a real app this would be fetched from API
  const discussion = {
    id: parseInt(id),
    title: id === "1" ? "How to approach React state management?" : 
           id === "2" ? "Best resources for DSA practice" : 
           "UX design tools recommendation",
    author: id === "1" ? "Harsh" : id === "2" ? "Anjali" : "Rahul",
    avatar: "https://placehold.co/40",
    course: id === "1" ? "React" : id === "2" ? "DSA" : "UI/UX",
    content: id === "1" 
      ? "I'm struggling with state management in my React application. Should I use Redux, Context API, or something else? What are the pros and cons of each approach?" 
      : id === "2" 
      ? "I'm preparing for coding interviews and need good resources for Data Structures and Algorithms. Which platforms do you recommend for practice?" 
      : "I'm exploring UX design tools. What do you all recommend between Figma, Adobe XD, and Sketch?",
    createdAt: "2023-07-15T10:30:00Z",
    replies: [
      {
        id: 1,
        author: "Priya",
        avatar: "https://placehold.co/40",
        content: id === "1" 
          ? "It depends on your application size. For smaller apps, React's Context API is sufficient. For larger apps with complex state, Redux might be better. Also check out Zustand and Jotai for simpler alternatives."
          : id === "2" 
          ? "LeetCode is my favorite. HackerRank and CodeForces are also great. Don't forget GeeksforGeeks for theory."
          : "I've used all three and personally prefer Figma for its collaboration features and web-based platform.",
        createdAt: "2023-07-15T11:45:00Z",
      },
      {
        id: 2,
        author: "Vivek",
        avatar: "https://placehold.co/40",
        content: id === "1" 
          ? "I recommend starting with useReducer + Context API, and only moving to Redux if you find you need more features. Also consider server state libraries like React Query."
          : id === "2" 
          ? "I recommend 'Cracking the Coding Interview' book along with LeetCode. AlgoExpert is also good but paid."
          : "Adobe XD is great if you're already in the Adobe ecosystem. But Figma has better team collaboration features.",
        createdAt: "2023-07-16T09:20:00Z",
      }
    ]
  };

  const handleSubmitReply = (e) => {
    e.preventDefault();
    // In a real app, this would send the reply to the server
    console.log('Submitting reply:', replyContent);
    
    // Clear the form
    setReplyContent('');
    
    // Show success message (in a real app)
    alert('Reply submitted successfully!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="discussion-detail-container">
      <div className="discussion-detail-header">
        <button className="back-btn" onClick={() => navigate('/discussions')}>
          &larr; Back to Discussions
        </button>
        <h1>{discussion.title}</h1>
        <div className="discussion-meta-detail">
          <span className="course-tag-detail">{discussion.course}</span>
          <span className="replies-detail">
            <i className="fas fa-comment"></i> {discussion.replies.length} replies
          </span>
        </div>
      </div>

      <div className="discussion-detail-content">
        <div className="author-info-detail">
          <img src={discussion.avatar} alt={discussion.author} className="author-avatar-detail" />
          <div className="author-meta">
            <span className="author-name-detail">{discussion.author}</span>
            <span className="post-date">{formatDate(discussion.createdAt)}</span>
          </div>
        </div>
        <div className="content-text">
          {discussion.content}
        </div>
      </div>

      <div className="replies-section">
        <h2>Replies</h2>
        {discussion.replies.map(reply => (
          <div key={reply.id} className="reply-card">
            <div className="author-info-detail">
              <img src={reply.avatar} alt={reply.author} className="author-avatar-detail" />
              <div className="author-meta">
                <span className="author-name-detail">{reply.author}</span>
                <span className="post-date">{formatDate(reply.createdAt)}</span>
              </div>
            </div>
            <div className="content-text">
              {reply.content}
            </div>
          </div>
        ))}
      </div>

      <div className="reply-form-container">
        <h3>Add Your Reply</h3>
        <form onSubmit={handleSubmitReply}>
          <div className="form-group">
            <label htmlFor="reply-content">Your Reply</label>
            <textarea
              id="reply-content"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your thoughts here..."
              required
              rows={5}
            />
          </div>
          <div className="form-actions-right">
            <button type="submit" className="submit-btn">
              Post Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiscussionDetail;
