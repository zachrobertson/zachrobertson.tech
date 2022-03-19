const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://zachrobertson.tech',
  DEPLOU_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteURL = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.zachrobertson.tech",
    title: "zachrobertson.tech",
    author: 'Zach Robertson'
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-transformer-remark",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{userAgent: '*'}],
            sitemap: 'https://zachrobertsonl.tech/sitemap/sitemap-index.xml'
          },
          'branch-deploy': {
            policy : [{userAgent: '*', disallow: ['/']}],
            sitemap: 'https://zachrobertsonl.tech/sitemap/sitemap-index.xml',
            host: null
          },
          'deploy-review': {
            policy: [{userAgent: '*', disallow: ['/']}],
            sitemap: 'https://zachrobertsonl.tech/sitemap/sitemap-index.xml',
            host: null,
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + node.frontmatter.slug,
                  custom_elements: [{ "content:encoded": node.html}]
                })
              })
            },
            query: `{
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date]},
                filter: { frontmatter : { title : { ne : "Upcoming Projects and Blogs" } } }
              ) {
                nodes {
                  excerpt
                  html
                  frontmatter {
                    title
                    date
                    slug
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: "ZACHROBERTSON.tech RSS Feed",
          }
        ]
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
          },
          {
            resolve: 'gatsby-remark-images',
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: `src/images/favicon.svg`,
        icon_options: {
          purpose: `maskable`,
        }
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/src/markdown`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
  ],
};
