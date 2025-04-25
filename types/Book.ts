export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      imageLinks?: {
        thumbnail: string;
      };
      previewLink?: string;
    };
  }
  