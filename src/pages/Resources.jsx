import { useState, useEffect } from 'react'
import './Resources.css'
import './ResourcesExtras.css'

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [filePreview, setFilePreview] = useState(null)
  const [filteredResources, setFilteredResources] = useState([])
  const [newResource, setNewResource] = useState({
    title: '',
    type: '',
    description: '',
    link: '',
    file: null
  })

  // Resource data including uploaded PDFs - using useState to prevent recreation on every render
  const [resources] = useState([
    // Assignments
    {
      id: 1,
      title: "JavaScript Chapter Notes",
      type: "pdf",
      description: "Comprehensive JavaScript chapter-wise notes for assignments",
      icon: "fas fa-file-pdf",
      action: "Download",
      path: "/resources/assignments/JS_Chapterwise_Notes (1).pdf",
      category: "assignments",
      dateAdded: "2023-07-15T10:30:00Z",
      fileSize: "2.4 MB",
      tags: ["javascript", "notes", "assignments"]
    },
    {
      id: 2,
      title: "React.js Guide",
      type: "pdf",
      description: "Complete React.js guide for assignments",
      icon: "fas fa-file-pdf",
      action: "Download",
      path: "/resources/assignments/React Js.pdf",
      category: "assignments",
      dateAdded: "2023-07-16T14:20:00Z",
      fileSize: "3.8 MB",
      tags: ["react", "guide", "assignments"]
    },
    // Course Materials
    {
      id: 3,
      title: "JavaScript Course Notes",
      type: "pdf",
      description: "Detailed JavaScript notes for course reference",
      icon: "fas fa-file-pdf",
      action: "Download",
      path: "/resources/course-materials/JS_Chapterwise_Notes (1).pdf",
      category: "course-materials",
      dateAdded: "2023-07-10T09:15:00Z",
      fileSize: "2.4 MB",
      tags: ["javascript", "course", "notes"]
    },
    {
      id: 4,
      title: "React.js Course Guide",
      type: "pdf",
      description: "Complete React.js course material",
      icon: "fas fa-file-pdf",
      action: "Download",
      path: "/resources/course-materials/React Js.pdf",
      category: "course-materials",
      dateAdded: "2023-07-12T11:30:00Z",
      fileSize: "3.8 MB",
      tags: ["react", "course", "guide"]
    },
    // Reading Materials
    {
      id: 5,
      title: "JavaScript Reading Material",
      type: "pdf",
      description: "JavaScript supplementary reading material",
      icon: "fas fa-file-pdf",
      action: "Download",
      path: "/resources/reading-materials/JS_Chapterwise_Notes (1).pdf",
      category: "reading-materials",
      dateAdded: "2023-07-05T16:45:00Z",
      fileSize: "2.4 MB",
      tags: ["javascript", "reading"]
    },
    {
      id: 6,
      title: "React.js Reading Guide",
      type: "pdf",
      description: "React.js supplementary reading material",
      icon: "fas fa-file-pdf",
      action: "Download",
      path: "/resources/reading-materials/React Js.pdf",
      category: "reading-materials",
      dateAdded: "2023-07-08T13:20:00Z",
      fileSize: "3.8 MB",
      tags: ["react", "reading", "guide"]
    },
    // Additional resource types
    {
      id: 7,
      title: "Web Development Roadmap",
      type: "link",
      description: "A comprehensive roadmap for web development learning",
      icon: "fas fa-link",
      action: "Open",
      url: "https://roadmap.sh/frontend",
      category: "course-materials",
      dateAdded: "2023-07-20T10:15:00Z",
      tags: ["roadmap", "web development", "learning path"]
    },
    {
      id: 8,
      title: "Introduction to APIs",
      type: "video",
      description: "Video tutorial on REST APIs and how to use them",
      icon: "fas fa-video",
      action: "Watch",
      url: "https://example.com/api-tutorial",
      thumbnail: "https://placehold.co/600x400",
      category: "course-materials",
      dateAdded: "2023-07-22T09:30:00Z",
      duration: "32:15",
      tags: ["api", "tutorial", "video"]
    }
  ]);

  const resourceTypes = [
    { value: 'assignments', label: 'Assignments' },
    { value: 'course-materials', label: 'Course Materials' },
    { value: 'reading-materials', label: 'Reading Materials' }
  ]

  const resourceFileTypes = [
    { value: 'pdf', label: 'PDF Document', icon: 'fas fa-file-pdf' },
    { value: 'video', label: 'Video', icon: 'fas fa-video' },
    { value: 'link', label: 'External Link', icon: 'fas fa-link' },
    { value: 'document', label: 'Document', icon: 'fas fa-file-alt' },
    { value: 'image', label: 'Image', icon: 'fas fa-image' }
  ]

  // Simulate API loading
  useEffect(() => {
    setIsLoading(true);
    // Simulate API delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter resources based on active filter and search term
  useEffect(() => {
    let result = [...resources];
    
    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(resource => resource.category === activeFilter);
    }
    
    // Apply search filter if there's a search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(resource => 
        resource.title.toLowerCase().includes(term) || 
        resource.description.toLowerCase().includes(term) ||
        (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    setFilteredResources(result);
  }, [resources, activeFilter, searchTerm]);

  const handleAddResource = (e) => {
    e.preventDefault();
    
    // Create a new resource object
    const newResourceObj = {
      id: resources.length + 1,
      title: newResource.title,
      type: newResource.fileType || 'pdf',
      description: newResource.description,
      icon: resourceFileTypes.find(type => type.value === (newResource.fileType || 'pdf')).icon,
      action: newResource.fileType === 'link' ? 'Open' : 
              newResource.fileType === 'video' ? 'Watch' : 'Download',
      path: newResource.file ? URL.createObjectURL(newResource.file) : '',
      url: newResource.link || '',
      category: newResource.type,
      dateAdded: new Date().toISOString(),
      fileSize: newResource.file ? `${(newResource.file.size / (1024 * 1024)).toFixed(2)} MB` : '',
      tags: newResource.tags ? newResource.tags.split(',').map(tag => tag.trim()) : []
    };
    
    console.log('New resource:', newResourceObj);
    
    // Reset form and close modal
    setShowAddForm(false);
    setNewResource({ 
      title: '', 
      type: '', 
      description: '', 
      link: '', 
      file: null,
      fileType: 'pdf',
      tags: ''
    });
    
    // In a real app, you would send this to an API and update state on success
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewResource({
        ...newResource,
        file: file,
        // Auto-detect file type
        fileType: file.type.includes('pdf') ? 'pdf' : 
                  file.type.includes('video') ? 'video' :
                  file.type.includes('image') ? 'image' : 'document'
      });
    }
  };

  const handlePreview = (resource) => {
    setFilePreview(resource);
  };

  const handleDownload = (path, title) => {
    const link = document.createElement('a')
    link.href = path
    link.download = title
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getActionButtonStyle = (type) => {
    switch (type) {
      case 'pdf':
        return 'download-btn'
      case 'video':
        return 'watch-btn'
      case 'link':
        return 'open-btn'
      case 'book':
        return 'read-btn'
      case 'notes':
        return 'view-btn'
      case 'document':
        return 'download-btn'
      case 'image':
        return 'view-btn'
      default:
        return ''
    }
  }

  const handleResourceAction = (resource) => {
    if (resource.type === 'pdf' || resource.type === 'document') {
      handleDownload(resource.path, resource.title);
    } else if (resource.type === 'video' || resource.type === 'image') {
      handlePreview(resource);
    } else if (resource.type === 'link') {
      window.open(resource.url, '_blank');
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const closePreview = () => {
    setFilePreview(null);
  };

  return (
    <div className="resources-container">
      {/* Header */}
      <div className="resources-header">
        <div className="header-content">
          <h1>Resources</h1>
          <p>Find study materials, guides, and reference content</p>
        </div>
        <button 
          className="add-resource-btn"
          onClick={() => setShowAddForm(true)}
        >
          <i className="fas fa-plus"></i> Add Resource
        </button>
      </div>

      {/* Search and Filters */}
      <div className="resources-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search resources by title, description or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="resources-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          {resourceTypes.map(type => (
            <button
              key={type.value}
              className={`filter-btn ${activeFilter === type.value ? 'active' : ''}`}
              onClick={() => setActiveFilter(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Cards Grid */}
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading resources...</p>
        </div>
      ) : filteredResources.length > 0 ? (
        <div className="resources-grid">
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-icon">
                <i className={resource.icon}></i>
              </div>
              <div className="resource-content">
                <div className="resource-header">
                  <h3>{resource.title}</h3>
                  <div className="resource-meta">
                    <span className="resource-type">
                      {resource.type.toUpperCase()}
                    </span>
                    <span className="resource-date">
                      Added: {formatDate(resource.dateAdded)}
                    </span>
                  </div>
                </div>
                <p>{resource.description}</p>
                <div className="resource-footer">
                  {resource.fileSize && (
                    <span className="file-size">
                      <i className="fas fa-hdd"></i> {resource.fileSize}
                    </span>
                  )}
                  {resource.duration && (
                    <span className="duration">
                      <i className="fas fa-clock"></i> {resource.duration}
                    </span>
                  )}
                  <button 
                    className={`action-btn ${getActionButtonStyle(resource.type)}`}
                    onClick={() => handleResourceAction(resource)}
                  >
                    <i className={resource.type === 'pdf' ? "fas fa-download" : 
                              resource.type === 'video' ? "fas fa-play" :
                              resource.type === 'link' ? "fas fa-external-link-alt" :
                              resource.type === 'image' ? "fas fa-eye" : "fas fa-file"}></i>
                    {resource.action}
                  </button>
                </div>
                {resource.tags && (
                  <div className="resource-tags">
                    {resource.tags.map(tag => (
                      <span key={tag} className="resource-tag" onClick={() => setSearchTerm(tag)}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3>No resources found</h3>
          <p>
            {searchTerm 
              ? "No resources match your search criteria." 
              : activeFilter !== 'all' 
                ? `No resources found in ${resourceTypes.find(t => t.value === activeFilter)?.label || activeFilter}.` 
                : "There are no resources available yet."}
          </p>
          <button 
            className="add-resource-btn-empty"
            onClick={() => setShowAddForm(true)}
          >
            <i className="fas fa-plus"></i> Add New Resource
          </button>
        </div>
      )}

      {/* Add Resource Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Resource</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddResource}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={newResource.title}
                  onChange={(e) => setNewResource({
                    ...newResource,
                    title: e.target.value
                  })}
                  placeholder="Enter resource title"
                  required
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">Category</label>
                  <select
                    id="type"
                    value={newResource.type}
                    onChange={(e) => setNewResource({
                      ...newResource,
                      type: e.target.value
                    })}
                    required
                    className="form-select"
                  >
                    <option value="">Select category</option>
                    {resourceTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="fileType">File Type</label>
                  <select
                    id="fileType"
                    value={newResource.fileType || 'pdf'}
                    onChange={(e) => setNewResource({
                      ...newResource,
                      fileType: e.target.value
                    })}
                    required
                    className="form-select"
                  >
                    {resourceFileTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={newResource.description}
                  onChange={(e) => setNewResource({
                    ...newResource,
                    description: e.target.value
                  })}
                  placeholder="Enter resource description"
                  required
                  rows={3}
                  className="form-textarea"
                />
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tags (comma separated)</label>
                <input
                  type="text"
                  id="tags"
                  value={newResource.tags || ''}
                  onChange={(e) => setNewResource({
                    ...newResource,
                    tags: e.target.value
                  })}
                  placeholder="e.g. javascript, tutorial, beginner"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="resourceFile">
                  {newResource.fileType === 'link' ? 'URL' : 'File Upload'}
                </label>
                {newResource.fileType === 'link' ? (
                  <input
                    type="url"
                    id="resourceFile"
                    value={newResource.link || ''}
                    onChange={(e) => setNewResource({
                      ...newResource,
                      link: e.target.value
                    })}
                    placeholder="Enter resource URL"
                    required
                    className="form-input"
                  />
                ) : (
                  <div className="file-upload-container">
                    <input
                      type="file"
                      id="resourceFile"
                      onChange={handleFileChange}
                      className="file-input"
                      accept={
                        newResource.fileType === 'pdf' ? '.pdf' :
                        newResource.fileType === 'video' ? 'video/*' :
                        newResource.fileType === 'image' ? 'image/*' :
                        newResource.fileType === 'document' ? '.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx' :
                        '*/*'
                      }
                    />
                    <div className="file-upload-button">
                      <i className="fas fa-cloud-upload-alt"></i> 
                      {newResource.file ? newResource.file.name : `Upload ${newResource.fileType}`}
                    </div>
                  </div>
                )}
                {newResource.file && (
                  <div className="file-preview">
                    <span>{newResource.file.name}</span>
                    <button 
                      type="button" 
                      className="remove-file" 
                      onClick={() => setNewResource({...newResource, file: null})}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  <i className="fas fa-plus"></i> Add Resource
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* File Preview Modal */}
      {filePreview && (
        <div className="modal-overlay" onClick={closePreview}>
          <div className="preview-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{filePreview.title}</h2>
              <button className="close-btn" onClick={closePreview}>×</button>
            </div>
            <div className="preview-content">
              {filePreview.type === 'video' ? (
                <video controls className="preview-media">
                  <source src={filePreview.path || filePreview.url} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              ) : filePreview.type === 'image' ? (
                <img src={filePreview.path || filePreview.url} alt={filePreview.title} className="preview-media" />
              ) : filePreview.type === 'pdf' ? (
                <div className="pdf-preview">
                  <iframe 
                    src={filePreview.path || filePreview.url} 
                    title={filePreview.title}
                    className="pdf-frame"
                  ></iframe>
                </div>
              ) : (
                <div className="unsupported-preview">
                  <i className={filePreview.icon || "fas fa-file"} style={{fontSize: '48px', marginBottom: '1rem'}}></i>
                  <p>Preview not available for this file type.</p>
                  <button 
                    className={`action-btn ${getActionButtonStyle(filePreview.type)}`} 
                    onClick={() => handleDownload(filePreview.path, filePreview.title)}
                  >
                    <i className="fas fa-download"></i>
                    Download File
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Resources
