import { useState } from 'react'
import './Resources.css'

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newResource, setNewResource] = useState({
    title: '',
    type: '',
    description: '',
    link: ''
  })

  // Resource data including uploaded PDFs
  const resources = [
    // Assignments
    {
      id: 1,
      title: "JavaScript Chapter Notes",
      type: "pdf",
      description: "Comprehensive JavaScript chapter-wise notes for assignments",
      icon: "fas fa-file-pdf",
      action: "Download",
      path: "/resources/assignments/JS_Chapterwise_Notes (1).pdf",
      category: "assignments"
    },
    {
      id: 2,
      title: "React.js Guide",
      type: "pdf",
      description: "Complete React.js guide for assignments",
      icon: "fas fa-file-pdf",
      action: "Download",
      path: "/resources/assignments/React Js.pdf",
      category: "assignments"
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
      category: "course-materials"
    },
    {
      id: 4,
      title: "React.js Course Guide",
      type: "pdf",
      description: "Complete React.js course material",
      icon: "fas fa-file-pdf",
      action: "Download",
      path: "/resources/course-materials/React Js.pdf",
      category: "course-materials"
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
      category: "reading-materials"
    },
    {
      id: 6,
      title: "React.js Reading Guide",
      type: "pdf",
      description: "React.js supplementary reading material",
      icon: "fas fa-file-pdf",
      action: "Download",
      path: "/resources/reading-materials/React Js.pdf",
      category: "reading-materials"
    }
  ]

  const resourceTypes = [
    { value: 'assignments', label: 'Assignments' },
    { value: 'course-materials', label: 'Course Materials' },
    { value: 'reading-materials', label: 'Reading Materials' }
  ]

  const handleAddResource = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('New resource:', newResource)
    setShowAddForm(false)
    setNewResource({ title: '', type: '', description: '', link: '' })
  }

  const filterResources = (resources) => {
    if (activeFilter === 'all') return resources
    return resources.filter(resource => resource.category === activeFilter)
  }

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
      default:
        return ''
    }
  }

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
          + Add Resource
        </button>
      </div>

      {/* Filters */}
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

      {/* Resource Cards Grid */}
      <div className="resources-grid">
        {filterResources(resources).map(resource => (
          <div key={resource.id} className="resource-card">
            <div className="resource-icon">
              <i className={resource.icon}></i>
            </div>
            <div className="resource-content">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <button 
                className={`action-btn ${getActionButtonStyle(resource.type)}`}
                onClick={() => handleDownload(resource.path, resource.title)}
              >
                <i className="fas fa-download"></i>
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Resource Modal */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                  id="type"
                  value={newResource.type}
                  onChange={(e) => setNewResource({
                    ...newResource,
                    type: e.target.value
                  })}
                  required
                >
                  <option value="">Select resource type</option>
                  {resourceTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="link">
                  {newResource.type === 'link' ? 'URL' : 'File Upload'}
                </label>
                {newResource.type === 'link' ? (
                  <input
                    type="url"
                    id="link"
                    value={newResource.link}
                    onChange={(e) => setNewResource({
                      ...newResource,
                      link: e.target.value
                    })}
                    placeholder="Enter resource URL"
                    required
                  />
                ) : (
                  <input
                    type="file"
                    id="link"
                    onChange={(e) => setNewResource({
                      ...newResource,
                      link: e.target.files[0]
                    })}
                    required
                  />
                )}
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Add Resource
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
    </div>
  )
}

export default Resources
