export interface Testimonial {
  id: string;
  name: string;
  affiliation: string;
  image: string;
  message: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  deviceType: 'laptop' | 'mobile';
  slug?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  descriptionKm?: string;
  image: string;
  date: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

export interface InternshipPartner {
  id: string;
  name: string;
  logo: string;
  tagline?: string;
}

