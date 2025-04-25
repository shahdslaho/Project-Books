// خدمة للتعامل مع Google Books API

export async function searchArabicBooks(query = 'كتب عربية', maxResults = 10, startIndex = 0) {
  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&startIndex=${startIndex}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`فشل الاتصال بـ API: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب الكتب:', error);
    throw error;
  }
}

export async function getBookDetails(bookId) {
  try {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`فشل الاتصال بـ API: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('خطأ في جلب تفاصيل الكتاب:', error);
    throw error;
  }
}