type ClientTestimonial = {
  key: "marise" | "vitorSabrina" | "mirian";
  image?: string;
  badge?: boolean;
};

export const clientTestimonials: ClientTestimonial[] = [
  {
    key: "marise",
    image: "/images/testimonials/marise-cicci.png",
    badge: true,
  },
  {
    key: "vitorSabrina",
    image: "/images/testimonials/vitor-sabrina.png",
  },
  {
    key: "mirian",
    image: "/images/testimonials/mirian.png",
  },
];
