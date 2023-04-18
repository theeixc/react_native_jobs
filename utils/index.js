// 检查公司log的url是否存在
export const checkImageUrl = (url) => {
  if (!url) return false;
  const patten = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');

  return patten.test(url);
}