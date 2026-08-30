


export async function uploadCoverImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) {
    const err = new Error('Image upload failed');
    err.code = 'UPLOAD_ERROR';
    throw err;
  }

  const data = await res.json();
  if (!data?.data?.url) {
    const err = new Error('Image upload failed');
    err.code = 'UPLOAD_ERROR';
    throw err;
  }
  return data.data.url;
}