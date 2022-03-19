/**
 * Implement Gatsby's Node APIs in this file
 */
exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const blogPostTemplate = require.resolve(`./src/components/blogTemplate.js`)
    const result = await graphql(`
    {
      allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date]}
        limit: 1000
        filter: {frontmatter: {title: {ne: "Upcoming Projects and Blogs"}}}
      ) {
        edges {
          node {
            frontmatter {
              title
              slug
            }
            id
          }
        }
      }
    }
  `)
    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query for blog posts.`)
        return
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.slug,
            component: blogPostTemplate,
            context: {
                // additional data can passed via context
                slug: node.frontmatter.slug,
            }
        })
    })
}