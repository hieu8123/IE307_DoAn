import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(req.path === '/admin/product/upload-image'){
            cb(null, 'public/products/');
        }else if(req.path === '/admin/brand/upload-image'){
            cb(null, 'public/products/');
        }else{
            cb(null,null);
        }
    },
    filename: (req, file, cb) => {
        const uploadFile = file.originalname.split('.');
        const name = `${uploadFile[0]}.${uploadFile[uploadFile.length - 1]}`;
        cb(null, name);
    }
});

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

module.exports = upload;
