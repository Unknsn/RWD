import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ImageUpload({ onImageUpload }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB')
      return
    }

    setPreview(URL.createObjectURL(file))
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'gofund_preset')

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/your-cloud-name/image/upload',
        {
          method: 'POST',
          body: formData
        }
      )
      const data = await response.json()
      onImageUpload(data.secure_url)
      toast.success('Image uploaded!')
    } catch (err) {
      toast.error('Upload failed')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">Campaign Image</label>
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-charity-primary transition">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          {preview ? (
            <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-4" />
          ) : (
            <div className="text-6xl mb-4">📸</div>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {uploading ? 'Uploading...' : 'Click to upload image (Max 5MB)'}
          </p>
        </label>
      </div>
    </div>
  )
}
