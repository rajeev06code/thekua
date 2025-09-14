export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  images: {
    id: string;
    alt: string;
  }[];
  price: number;
  tags: string[];
  packSizes: string[];
  category: 'classic' | 'gift' | 'healthy' | 'sweet' | 'savory' ;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  text: string;
  rating: number;
};

export type CartItem = {
  id: string;
  name: string;
  image: {
    id: string;
    alt: string;
  };
  price: number;
  quantity: number;
  packSize: string;
};
