import { getAuthUser, network } from '../until';

const uploadImageBrand = async (file) => {
    const user = await getAuthUser();
    const filename = getFileNameFromPath(file);
    const extension = getFileExtension(filename);

    var bodyFormData = new FormData();
    bodyFormData.append('image', {
        name: `${filename}.${extension}`,
        uri: file,
        type: mimeTypes[extension],
    });

    return fetch(`${network.serverip}/admin/brand/upload-image`, {
        method: 'POST',
        body: bodyFormData,
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    })
        .then((response) => response.json())
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return { message: error.response? error.response.data.message : error };
        });
};

const uploadImageProduct = async (file) => {
    const user = await getAuthUser();
    const filename = getFileNameFromPath(file);
    const extension = getFileExtension(filename);

    var bodyFormData = new FormData();
    bodyFormData.append('image', {
        name: `${filename}.${extension}`,
        uri: file,
        type: mimeTypes[extension],
    });

    return fetch(`${network.serverip}/admin/product/upload-image`, {
        method: 'POST',
        body: bodyFormData,
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    })
        .then((response) => response.json())
        .then((result) => {
            return result;
        })
        .catch((error) => {
            return { message: error.response? error.response.data.message : error };
        });
};

const mimeTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
};

const getFileNameFromPath = (path) => {
    return path.split('/').pop().split('\\').pop();
};

const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
};

export default UploadService = {
    uploadImageBrand,
    uploadImageProduct,
};
