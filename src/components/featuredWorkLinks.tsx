import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { theme } from "@/theme";
import type { FeaturedWorkItem } from "@/data/featuredWork";

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const LinkAnchor = styled.a`
  color: ${theme.accent};
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.accentHover};
    text-decoration: underline;
  }
`;

const ProjectBullets = styled.ul`
  margin: 0.75rem 0 0 0;
  padding-left: 1.25rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${theme.textMuted};
`;

const ProjectBullet = styled.li`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export function FeaturedWorkLinks({ items }: { items: FeaturedWorkItem[] }) {
  return (
    <LinksList>
      {items.map((item) => (
        <LinkItem key={item.title}>
          {item.href.startsWith("/") ? (
            <Link href={item.href} passHref legacyBehavior>
              <LinkAnchor>{item.title}</LinkAnchor>
            </Link>
          ) : (
            <LinkAnchor
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title}
            </LinkAnchor>
          )}
          {item.bullets && item.bullets.length > 0 ? (
            <ProjectBullets>
              {item.bullets.map((bullet, i) => (
                <ProjectBullet key={i}>{bullet}</ProjectBullet>
              ))}
            </ProjectBullets>
          ) : null}
        </LinkItem>
      ))}
    </LinksList>
  );
}
