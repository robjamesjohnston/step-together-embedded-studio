module.exports = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["cdn.sanity.io"],
  },
  async redirects() {
    return [
      {
        source: "/pages/17-supporting-rehabilitation-of-ex-offenders",
        destination: "/ex-offenders",
        permanent: true,
      },
      {
        source: "/pages/18-recovery-through-volunteering-wis-and-veterans",
        destination: "/wis-and-veterans",
        permanent: true,
      },
      {
        source: "/pages/16-supporting-young-people",
        destination: "/young-people",
        permanent: true,
      },
      {
        source: "/pages/29-safeguarding",
        destination: "/safeguarding",
        permanent: true,
      },
      {
        source: "/pages/8-vacancies",
        destination: "/vacancies",
        permanent: true,
      },
      {
        source: "/pages/39-how-to-make-a-referral",
        destination: "/referral",
        permanent: true,
      },
    ];
  },
};
