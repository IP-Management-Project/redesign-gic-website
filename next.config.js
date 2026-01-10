/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/who-we-are",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/missions",
        destination: "/about/mission",
        permanent: true,
      },
      {
        source: "/visions",
        destination: "/about/vision",
        permanent: true,
      },
      {
        source: "/gic-service",
        destination: "/about/services",
        permanent: true,
      },
      {
        source: "/study",
        destination: "/program",
        permanent: true,
      },
      {
        source: "/study/degrees/:degreeSlug",
        destination: "/program/degrees/:degreeSlug",
        permanent: true,
      },
      {
        source: "/study/degrees/:degreeSlug/curriculum",
        destination: "/program/degrees/:degreeSlug/curriculum",
        permanent: true,
      },
      {
        source: "/study/degrees/:degreeSlug/admissions",
        destination: "/program/degrees/:degreeSlug/admissions",
        permanent: true,
      },
      {
        source: "/people",
        destination: "/faculty-staff",
        permanent: true,
      },
      {
        source: "/people/faculty-staff",
        destination: "/faculty-staff",
        permanent: true,
      },
      {
        source: "/people/:personSlug",
        destination: "/faculty-staff/:personSlug",
        permanent: true,
      },
      {
        source: "/news",
        destination: "/news-events/news",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/news-events/events",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
