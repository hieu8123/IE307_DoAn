const imageUploadSingleController = (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const isValidFormat = ['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype);

        if (isValidFormat) {
            return res.json({ data: file.filename });
        } else {
            return res.status(400).json({
                message: 'Invalid file format. Please upload only images (png, jpg, jpeg)'
            });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

module.exports = {
    imageUploadSingleController,
};
