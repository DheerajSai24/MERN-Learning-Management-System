import { useState } from 'react';
import './Downloads.css';

const Downloads = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [fileType, setFileType] = useState('all');
  const [files, setFiles] = useState([
    // Assignments
    {
      id: 1,
      name: 'JavaScript Chapter Notes',
      type: 'PDF',
      size: '2.5 MB',
      date: '2025-08-28',
      category: 'Assignments',
      downloadUrl: '/resources/assignments/JS_Chapterwise_Notes (1).pdf'
    },
    {
      id: 2,
      name: 'React.js Guide',
      type: 'PDF',
      size: '3.1 MB',
      date: '2025-08-28',
      category: 'Assignments',
      downloadUrl: '/resources/assignments/React Js.pdf'
    },
    // Course Materials
    {
      id: 3,
      name: 'JavaScript Course Notes',
      type: 'PDF',
      size: '2.5 MB',
      date: '2025-08-28',
      category: 'Course Materials',
      downloadUrl: '/resources/course-materials/JS_Chapterwise_Notes (1).pdf'
    },
    {
      id: 4,
      name: 'React.js Course Guide',
      type: 'PDF',
      size: '3.1 MB',
      date: '2025-08-28',
      category: 'Course Materials',
      downloadUrl: '/resources/course-materials/React Js.pdf'
    },
    // Reading Materials
    {
      id: 5,
      name: 'JavaScript Reading Material',
      type: 'PDF',
      size: '2.5 MB',
      date: '2025-08-28',
      category: 'Reading Materials',
      downloadUrl: '/resources/reading-materials/JS_Chapterwise_Notes (1).pdf'
    },
    {
      id: 6,
      name: 'React.js Reading Guide',
      type: 'PDF',
      size: '3.1 MB',
      date: '2025-08-28',
      category: 'Reading Materials',
      downloadUrl: '/resources/reading-materials/React Js.pdf'
    }
  ]);

  const handleUpload = (e) => {
    e.preventDefault();
    // Mock file upload - in real app, this would handle file upload to backend
    const newFile = {
      id: files.length + 1,
      name: e.target.fileName.value,
      type: e.target.fileName.value.split('.').pop().toUpperCase(),
      size: '1.0 MB',
      date: new Date().toISOString().split('T')[0],
      category: e.target.category.value,
      downloadUrl: '#'
    };
    setFiles([...files, newFile]);
    setShowUploadForm(false);
  };

  const handleDownload = (file) => {
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = fileType === 'all' || file.category === fileType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="downloads-container">
      <header className="downloads-header">
        <div className="header-content">
          <h1>Downloads</h1>
          <p>Access all downloadable study materials in one place</p>
        </div>
        <button className="upload-btn" onClick={() => setShowUploadForm(true)}>
          + Upload File
        </button>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="pdf">PDF</option>
          <option value="doc">DOC</option>
          <option value="ppt">PPT</option>
          <option value="zip">ZIP</option>
        </select>
      </div>

      {/* Desktop View */}
      <div className="table-container desktop-view">
        <table className="downloads-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map(file => (
              <tr key={file.id}>
                <td>{file.name}</td>
                <td>{file.type}</td>
                <td>{file.size}</td>
                <td>{file.date}</td>
                <td>
                  <button 
                    onClick={() => handleDownload(file)} 
                    className="download-btn"
                  >
                    <i className="fas fa-download"></i> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="mobile-view">
        {filteredFiles.map(file => (
          <div key={file.id} className="file-card">
            <div className="file-info">
              <h3>{file.name}</h3>
              <p><span>Type:</span> {file.type}</p>
              <p><span>Size:</span> {file.size}</p>
              <p><span>Date:</span> {file.date}</p>
            </div>
            <button 
              onClick={() => handleDownload(file)} 
              className="download-btn"
            >
              <i className="fas fa-download"></i> Download
            </button>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Upload File</h2>
            <form onSubmit={handleUpload}>
              <div className="form-group">
                <label htmlFor="file">Choose File</label>
                <input type="file" id="file" required />
              </div>
              <div className="form-group">
                <label htmlFor="fileName">File Name</label>
                <input type="text" id="fileName" required />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select id="category" required>
                  <option value="Notes">Notes</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Resources">Resources</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowUploadForm(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Downloads;
