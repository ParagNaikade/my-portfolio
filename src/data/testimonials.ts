export interface ITestimonial {
  quote: string;
  author: string;
  role: string;
  linkedin: string;
}

export const testimonials: ITestimonial[] = [
  {
    quote:
      "Parag is an exceptionally capable and committed Dev Lead. As the primary SME for several key commercial applications, his technical expertise have consistently delivered excellent and consistent business outcomes over the years.",
    author: "Prem Bhawnani",
    role: "Senior Technology Executive | Head of IT",
    linkedin: "https://www.linkedin.com/in/prembhawnani/",
  },
  {
    quote:
      "Parag's technical depth and ability to mentor junior developers make him a standout leader in our team.",
    author: "Shivani Tiwari",
    role: "Senior Engineering Leader",
    linkedin: "https://www.linkedin.com/in/shivani-tiwari-b58b5b14/",
  },
  {
    quote:
      "Parag quickly grasped complex architecture and went above and beyond to understand our entire product suite.",
    author: "Amitoj Passi",
    role: "Director, Engineering at Dun & Bradstreet",
    linkedin: "https://www.linkedin.com/in/amitoj-passi-a81b5785/",
  },
];
