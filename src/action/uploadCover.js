


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

// export async function createEbook(payload) {
//   const res = await fetch('/api/dashboard/writer/ebooks', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include', // writerId is derived server-side from the session
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) {
//     const err = new Error('Failed to create ebook');
//     err.code = res.status === 422 ? 'VALIDATION_ERROR' : 'API_ERROR';
//     throw err;
//   }
//   return res.json();
// }