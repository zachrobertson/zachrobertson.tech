import React from "react";
import Layout from "@/components/layout";
import styled from "styled-components";
import { theme } from "@/theme";

const ContentContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${theme.text};
`;

const Intro = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${theme.textMuted};
  margin-bottom: 2rem;
`;

export default function BlogPage() {
  return (
    <Layout>
      <ContentContainer>
        <PageTitle>Blog</PageTitle>
        <Intro>No articles published yet.</Intro>
      </ContentContainer>
    </Layout>
  );
}
