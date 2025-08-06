import { useState, useRef } from 'react'
import { X, Upload, CheckCircle, BarChart3 } from 'lucide-react'
import React from 'react';

export default function FileUploadModal({ isOpen, onClose, uploadedFiles, onFileUploaded, onDetectClick }) {
  const [dragActive, setDragActive] = useState('')
  const fileInputRefs = {
    unlabelled: useRef(null),
    fraudSeed: useRef(null),
    testData: useRef(null)
  }

  const fileTypes = [
    {
      key: 'unlabelled',
      title: 'Unlabelled Training Data',
      description: 'Upload CSV file containing unlabelled data for unsupervised learning',
      icon: '📊'
    },
    {
      key: 'fraudSeed',
      title: 'Known Fraud Cases',
      description: 'Upload CSV file with known fraud cases to train the model',
      icon: '🚨'
    },
    {
      key: 'testData',
      title: 'Test Data',
      description: 'Upload test dataset to validate model performance',
      icon: '⬆️'
    }
  ]

  const handleDrag = (e, type) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(type)
    } else if (e.type === 'dragleave') {
      setDragActive('')
    }
  }

  const handleDrop = (e, type) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive('')

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileUpload(files[0], type)
    }
  }

  const handleFileSelect = (e, type) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFileUpload(files[0], type)
    }
  }

  const handleFileUpload = (file, type) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Please upload a CSV file only.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.')
      return
    }

    onFileUploaded(type, file)
  }

  const removeFile = (type) => {
    onFileUploaded(type, null)
    if (fileInputRefs[type].current) {
      fileInputRefs[type].current.value = ''
    }
  }

  const allFilesUploaded = uploadedFiles.unlabelled && uploadedFiles.fraudSeed && uploadedFiles.testData

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-2xl p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-100">Upload Required Files</h2>
            <p className="text-gray-400 mt-2">Please upload all three CSV files to begin fraud detection analysis</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-100 transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {fileTypes.map((fileType) => (
            <div key={fileType.key} className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-2">{fileType.icon}</div>
                <h3 className="text-lg font-semibold text-gray-100">{fileType.title}</h3>
                <p className="text-sm text-gray-400">{fileType.description}</p>
              </div>

              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                  dragActive === fileType.key
                    ? 'border-gray-400 bg-gray-800/50'
                    : uploadedFiles[fileType.key]
                    ? 'border-green-500 bg-green-900/20'
                    : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/30'
                }`}
                onDragEnter={(e) => handleDrag(e, fileType.key)}
                onDragLeave={(e) => handleDrag(e, fileType.key)}
                onDragOver={(e) => handleDrag(e, fileType.key)}
                onDrop={(e) => handleDrop(e, fileType.key)}
              >
                {uploadedFiles[fileType.key] ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-100 font-medium text-sm">{uploadedFiles[fileType.key].name}</p>
                      <p className="text-gray-400 text-xs">
                        {(uploadedFiles[fileType.key].size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(fileType.key)}
                      className="text-gray-400 hover:text-gray-100 text-xs transition-colors duration-300"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <Upload className="w-12 h-12 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-100 font-medium text-sm">
                        Drop CSV file here
                      </p>
                      <p className="text-gray-400 text-xs">or click to browse</p>
                    </div>
                    <button
                      onClick={() => fileInputRefs[fileType.key].current?.click()}
                      className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-100 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-sm"
                    >
                      Browse Files
                    </button>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRefs[fileType.key]}
                type="file"
                accept=".csv"
                onChange={(e) => handleFileSelect(e, fileType.key)}
                className="hidden"
              />
            </div>
          ))}
        </div>

        <div className="mb-8 p-4 bg-gray-800/50 rounded-lg">
          <h3 className="text-gray-100 font-medium mb-2">File Requirements:</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• File format: CSV only</li>
            <li>• Maximum file size: 10MB per file</li>
            <li>• First row should contain column headers</li>
            <li>• Ensure data is properly formatted and clean</li>
          </ul>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 font-medium">Upload Progress</span>
            <span className="text-gray-400 text-sm">
              {Object.values(uploadedFiles).filter(Boolean).length} / 3 files uploaded
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-gray-500 to-gray-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(Object.values(uploadedFiles).filter(Boolean).length / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 py-4 rounded-lg transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onDetectClick}
            disabled={!allFilesUploaded}
            className={`flex-1 py-4 rounded-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2 text-lg font-semibold ${
              allFilesUploaded
                ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            {allFilesUploaded ? (
              <>
                <BarChart3 className="w-5 h-5" />
                Start Detection Analysis
              </>
            ) : (
              'Upload All Files First'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
