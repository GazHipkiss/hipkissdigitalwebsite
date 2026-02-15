export type Enquiry = {
  id: number;
  name: string;
  email: string;
  service: string | null;
  budget: string | null;
  message: string;
  created_at: string;
};

export type WorkItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  cover_image: string | null;
  gallery_images: string[];
  published: number;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  avatar: string | null;
  created_at: string;
};

export type SiteSettings = {
  contactEmail: string;
  heroText: string;
  socialLinks: Record<string, string>;
};

export type EnquiryInput = {
  name: string;
  email: string;
  service?: string;
  budget?: string;
  message: string;
};

export type WorkItemInput = {
  title: string;
  slug: string;
  description: string;
  tags?: string[];
  cover_image?: string | null;
  gallery_images?: string[];
  published?: boolean;
};

export type TestimonialInput = {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatar?: string | null;
};
