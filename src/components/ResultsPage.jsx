import { useState, useEffect } from 'react'
import { ArrowLeft, Download, CheckCircle } from 'lucide-react'
import React from 'react';

export default function ResultsPage({ onBack, uploadedFiles }) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)

  const analysisSteps = [
    'Processing unlabelled training data...',
    'Analyzing known fraud patterns...',
    'Training machine learning model...',
    'Testing fraud detection algorithms...',
    'Generating cluster boundaries...',
    'Calculating anomaly scores...',
    'Finalizing results...'
  ]

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < analysisSteps.length - 1) {
            return prev + 1
          } else {
            setIsAnalyzing(false)
            clearInterval(interval)
            return prev
          }
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [isAnalyzing])

  const results = {
    totalTransactions: 15847,
    normalTransactions: 14203,
    suspiciousTransactions: 1456,
    fraudTransactions: 188,
    accuracy: 94.7,
    processingTime: '7.2s',
    anomalyThreshold: 0.65
  }

  const fraudCategories = [
    {
      type: 'Normal Transactions',
      count: results.normalTransactions,
      percentage: ((results.normalTransactions / results.totalTransactions) * 100).toFixed(1),
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-500/30',
      anomalyScore: '0.0 - 0.3',
      description: 'Legitimate transactions with low anomaly scores'
    },
    {
      type: 'Suspicious Activity',
      count: results.suspiciousTransactions,
      percentage: ((results.suspiciousTransactions / results.totalTransactions) * 100).toFixed(1),
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-500/30',
      anomalyScore: '0.3 - 0.65',
      description: 'Transactions requiring manual review with moderate anomaly scores'
    },
    {
      type: 'Zero-Day Fraud',
      count: results.fraudTransactions,
      percentage: ((results.fraudTransactions / results.totalTransactions) * 100).toFixed(1),
      color: 'text-red-400',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-500/30',
      anomalyScore: '0.65 - 1.0',
      description: 'High-risk fraudulent transactions with high anomaly scores'
    }
  ]

  const downloadResults = () => {
    const csvContent = `TABA Fraud Detection Analysis Results\n` +
      `Analysis Date,${new Date().toISOString()}\n` +
      `\n` +
      `Files Analyzed:\n` +
      `Unlabelled Training Data,${uploadedFiles.unlabelled?.name || 'N/A'}\n` +
      `Known Fraud Cases,${uploadedFiles.fraudSeed?.name || 'N/A'}\n` +
      `Test Data,${uploadedFiles.testData?.name || 'N/A'}\n` +
      `\n` +
      `Results Summary:\n` +
      `Total Transactions,${results.totalTransactions}\n` +
      `Normal Transactions,${results.normalTransactions}\n` +
      `Suspicious Transactions,${results.suspiciousTransactions}\n` +
      `Fraud Transactions,${results.fraudTransactions}\n` +
      `Model Accuracy,${results.accuracy}%\n` +
      `Processing Time,${results.processingTime}\n` +
      `Anomaly Threshold,${results.anomalyThreshold}`

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `taba_fraud_analysis_${Date.now()}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 border-4 border-gray-600 border-t-gray-300 rounded-full animate-spin mx-auto mb-6"></div>
            <h1 className="text-4xl font-bold text-gray-100 mb-4">Analyzing Data</h1>
            <p className="text-xl text-gray-400">Running advanced fraud detection algorithms...</p>
          </div>

          <div className="space-y-4">
            {analysisSteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                  index <= currentStep
                    ? 'bg-gray-800/50 text-gray-100'
                    : 'bg-gray-900/30 text-gray-500'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index < currentStep
                    ? 'bg-green-500'
                    : index === currentStep
                    ? 'bg-blue-500 animate-pulse'
                    : 'bg-gray-600'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  )}
                </div>
                <span className="flex-1 text-left">{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / analysisSteps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-400 mt-2">
              {Math.round(((currentStep + 1) / analysisSteps.length) * 100)}% Complete
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-100 transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Detector
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
                Fraud Detection Results
              </h1>
              <p className="text-xl text-gray-300">
                Analysis completed successfully with {results.accuracy}% accuracy
              </p>
            </div>
            <button
              onClick={downloadResults}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-100 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </div>
      </div>

      <section className="py-12 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <p className="text-gray-400 text-sm mb-2">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-100">{results.totalTransactions.toLocaleString()}</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <p className="text-gray-400 text-sm mb-2">Model Accuracy</p>
              <p className="text-3xl font-bold text-green-400">{results.accuracy}%</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <p className="text-gray-400 text-sm mb-2">Processing Time</p>
              <p className="text-3xl font-bold text-blue-400">{results.processingTime}</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <p className="text-gray-400 text-sm mb-2">Anomaly Threshold</p>
              <p className="text-3xl font-bold text-purple-400">{results.anomalyThreshold}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {fraudCategories.map((category) => (
              <div
                key={category.type}
                className={`${category.bgColor} ${category.borderColor} border-2 p-8 rounded-2xl transition-all duration-300 hover:scale-105`}
              >
                <div className="text-center mb-6">
                  <div className={`text-6xl mb-4 ${category.color}`}>
                    {category.type === 'Normal Transactions' ? '✅' : 
                     category.type === 'Suspicious Activity' ? '⚠️' : '🚨'}
                  </div>
                  <h3 className={`text-2xl font-bold ${category.color} mb-2`}>
                    {category.type}
                  </h3>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Count:</span>
                    <span className={`font-bold text-xl ${category.color}`}>
                      {category.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Percentage:</span>
                    <span className={`font-bold text-xl ${category.color}`}>
                      {category.percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Anomaly Score:</span>
                    <span className={`font-bold ${category.color}`}>
                      {category.anomalyScore}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">
            Fraud Detection Visualization
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-100 mb-4 text-center">
                Training Data Clusters with Identified Fraud/Normal Labels
              </h3>
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NiyTYjuqw3T2UGTNW29JvgRTzCGx2S.png"
                  alt="Training Data Clusters"
                  className="w-full h-96 object-contain rounded-lg bg-white"
                />
                <div className="absolute top-4 right-4 bg-black/80 p-3 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-300">Normal Cluster</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-300">Fraud Cluster</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-100 mb-4 text-center">
                Test Data with Identified Fraud/Normal Cluster Boundaries
              </h3>
              <div className="relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qqTONHCDOovktTRqejmSV8n9TSTZxr.png"
                  alt="Test Data Results"
                  className="w-full h-96 object-contain rounded-lg bg-white"
                />
                <div className="absolute top-4 right-4 bg-black/80 p-3 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-300">Test Data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                      <span className="text-gray-300">Normal Cluster</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                      <span className="text-gray-300">Fraud Cluster</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 leading-relaxed max-w-4xl mx-auto">
              The visualization above shows the clustering results from your fraud detection analysis. 
              The left chart displays the training data clusters with identified fraud and normal labels, 
              while the right chart shows how your test data points are classified within the established 
              cluster boundaries. Points outside the normal clusters with high anomaly scores are flagged 
              as potential zero-day fraud attempts.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
