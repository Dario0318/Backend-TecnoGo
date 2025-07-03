console.log('🌩️ CLOUDINARY CONFIG:', {
  name: process.env.CLOUDINARY_NAME,
  key: process.env.CLOUDINARY_KEY,
  secret: process.env.CLOUDINARY_SECRET ? '[OK]' : '[MISSING]',
});

export default () => ({
  'users-permissions': {
    enabled: true,
  },
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
       actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
