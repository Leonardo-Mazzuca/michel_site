type ClientTestimonial = {
  key: "marise" | "vitorSabrina" | "mirian" | "gabriel" | "naila" | "valesca" | "gladys";
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
  {
    key: "gabriel",
    image: "/images/testimonials/gabriel.png",
  },
  {
    key: "naila",
    image: "/images/testimonials/naila.png",
  },
  {
    key: "valesca",
    image: "/images/testimonials/valesca.png",
  },
  {
    key: "gladys",
    image: "/images/testimonials/gladys.png",
  },
];
