import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

// Get the project root directory (one level up from backend)
const __dirname = path.resolve()
const uploadsPath = path.join(__dirname, 'uploads')

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, uploadsPath)
	},
	filename(req, file, cb) {
		cb(
			null,
			// Set file name to
			// filename-Date.now().extension
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		)
	},
})

function checkFileType(file, cb) {
	// Accepted file types
	const filetypes = /jpg|jpeg|png/

	// Check if upload file type matches with accepted file types
	const extName = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	)

	const mimetype = filetypes.test(file.mimetype)
	if (extName && mimetype) {
		return cb(null, true)
	} else {
		cb('Images only! Please upload jpg, jpeg, or png files.')
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB limit
	},
})

router.post('/', (req, res) => {
	console.log('Upload route hit')
	console.log('Request headers:', req.headers)
	
	upload.single('image')(req, res, (err) => {
		console.log('Upload callback triggered')
		console.log('Error:', err)
		console.log('File:', req.file)
		
		if (err instanceof multer.MulterError) {
			console.log('Multer error:', err)
			if (err.code === 'LIMIT_FILE_SIZE') {
				return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' })
			}
			return res.status(400).json({ message: err.message })
		} else if (err) {
			console.log('Other error:', err)
			return res.status(400).json({ message: err })
		}
		
		try {
			if (!req.file) {
				console.log('No file in request')
				return res.status(400).json({ message: 'No file uploaded' })
			}
			
			console.log('File uploaded successfully:', req.file.path)
			// Send back the file path with forward slashes for web compatibility
			const filePath = `/${req.file.path.replace(/\\/g, '/')}`
			console.log('Sending response:', filePath)
			res.send(filePath)
		} catch (error) {
			console.log('Try-catch error:', error)
			res.status(500).json({ message: 'File upload failed', error: error.message })
		}
	})
})

export default router
