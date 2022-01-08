module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "zachrobertson.tech",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
