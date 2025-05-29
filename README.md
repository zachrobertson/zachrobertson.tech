# ZACHROBERTSON.TECH

This is my website built using [Next.js](https://www.nextjs.com/) and deployed on [Vercel](https://www.vercel.com). It is a simple blog site that is styled like a linux terminal application.

## Blog Search Feature

The blog now includes an AI-powered search feature that allows visitors to search through blog content using natural language queries.

It is a very simple design that uses the fact that there is not an enormous amount of blog content on this site, so all of it and a user query can fit into the context window of
any modern LLM. This greatly simplifies the search feature, allowing us to make a single OpenAI API call per user query.

An alternative to this approach is to implement RAG, but this would require a vector database and use of an embedding model along side the LLM. This would mean more calls to the OpenAI API per user query and the additional complexity of integrating a serverless vector database because this site is deployed on Vercel.
