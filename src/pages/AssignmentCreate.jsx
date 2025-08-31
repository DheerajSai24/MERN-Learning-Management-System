import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AssignmentDetail.css'; // Reuse the existing styles
import './AssignmentCreate.css'; // Additional styles for the create form

const AssignmentCreate = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    dueDate: '',
    description: '',
    requirements: ['']
  });
  
  const courses = [
    'User Research and Personas',
    'Competitive Analysis in UX',
    'Wireframing and Prototyping',
    'UI Design Fundamentals',
    'Design Systems'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleRequirementChange = (index, value) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: newRequirements
    });
  };
  
  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };
  
  const removeRequirement = (index) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      requirements: newRequirements
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Simulate successful creation
    alert('Assignment created successfully!');
    navigate('/assignments');
  };
  
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
      navigate('/assignments');
    }
  };

  return (
    <div className="assignment-detail-page">
      <div className="detail-header">
        <div className="header-content">
          <button onClick={() => navigate('/assignments')} className="back-button">
            <i className="fas fa-arrow-left"></i> Back to Assignments
          </button>
          <h1>Create New Assignment</h1>
        </div>
      </div>
      
      <div className="assignment-create-content">
        <form onSubmit={handleSubmit} className="assignment-form">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="title">Assignment Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter assignment title"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="course">Course*</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="dueDate">Due Date*</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Provide detailed instructions for the assignment"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label>Requirements*</label>
              {formData.requirements.map((req, index) => (
                <div key={index} className="requirement-row">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder="Enter a requirement"
                    required
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      className="remove-requirement-btn"
                      onClick={() => removeRequirement(index)}
                    >
                      <i className="fas fa-minus-circle"></i>
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-requirement-btn"
                onClick={addRequirement}
              >
                <i className="fas fa-plus"></i> Add Requirement
              </button>
            </div>
            
            <div className="form-group">
              <label>Resources (Optional)</label>
              <div className="file-upload-area">
                <p>Drag and drop resource files here or</p>
                <label className="file-upload-button">
                  <span>Choose Files</span>
                  <input type="file" multiple className="file-upload-input" />
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              <i className="fas fa-save"></i> Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentCreate;
