// Utility functions for file operations

/**
 * Save base64 image data to assets/images folder
 * @param {string} base64Data - Base64 encoded image data
 * @param {string} fileName - Name of the file to save
 * @returns {Promise<string>} - Returns the file path
 */
export const saveImageToAssets = async (base64Data, fileName) => {
  try {
    // Convert base64 to blob
    const response = await fetch(base64Data)
    const blob = await response.blob()
    
    // Create a download link to save the file
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    
    // Trigger download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up
    URL.revokeObjectURL(url)
    
    return `/src/assets/images/${fileName}`
  } catch (error) {
    console.error('Error saving image:', error)
    throw error
  }
}

/**
 * Convert file to base64
 * @param {File} file - File object to convert
 * @returns {Promise<string>} - Base64 encoded string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Generate unique filename
 * @param {string} originalName - Original file name
 * @param {string} category - Image category
 * @returns {string} - Unique filename
 */
export const generateUniqueFileName = (originalName, category) => {
  const timestamp = Date.now()
  const fileExtension = originalName.split('.').pop()
  return `${category}_${timestamp}.${fileExtension}`
}