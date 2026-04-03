import React from "react";
import Layout from "@/components/layout";
import styled from "styled-components";
import { DESKTOP_BREAKPOINT } from "@/components/constants";
import { theme } from "@/theme";
import { featuredWork } from "@/data/featuredWork";
import { FeaturedWorkLinks } from "@/components/featuredWorkLinks";
import {
  summaryParagraphs,
  experience,
  education,
  skillGroups,
} from "@/data/resume";

const ContentContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
`;

const Paragraph = styled.p`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${theme.textMuted};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${theme.text};
`;

const ExperienceList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 3rem;
`;

const ExperienceItem = styled.li`
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid ${theme.border};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;

  @media (min-width: ${DESKTOP_BREAKPOINT}px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 0.25rem;

  @media (min-width: ${DESKTOP_BREAKPOINT}px) {
    margin-bottom: 0;
  }
`;

const CompanyName = styled.span`
  color: ${theme.accent};
  font-weight: 500;
`;

const LocationMeta = styled.div`
  font-size: 0.9rem;
  color: ${theme.textMuted};
  margin-top: 0.15rem;
`;

const DateRange = styled.span`
  font-size: 0.9rem;
  color: ${theme.textMuted};
  margin-top: 0.25rem;

  @media (min-width: ${DESKTOP_BREAKPOINT}px) {
    margin-top: 0;
  }
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${theme.textMuted};
`;

const BulletItem = styled.li`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const EducationBlock = styled.div`
  margin-bottom: 3rem;
`;

const EducationSchool = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 0.35rem;
`;

const EducationLine = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${theme.textMuted};
  margin: 0 0 0.35rem 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillSection = styled.div`
  margin-bottom: 3rem;
`;

const SkillGroupBlock = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SkillLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${theme.text};
  margin-bottom: 0.35rem;
  text-transform: capitalize;
`;

const SkillItems = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${theme.textMuted};
  margin: 0;
`;

export default function IndexPage() {
  return (
    <Layout>
      <ContentContainer>
        {summaryParagraphs.map((text, i) => (
          <Paragraph key={`summary-${i}`}>{text}</Paragraph>
        ))}

        <SectionTitle>Experience</SectionTitle>
        <ExperienceList>
          {experience.map((entry) => (
            <ExperienceItem key={`${entry.company}-${entry.title}-${entry.dateRange}`}>
              <ExperienceHeader>
                <div>
                  <JobTitle>
                    {entry.title} at <CompanyName>{entry.company}</CompanyName>
                  </JobTitle>
                  <LocationMeta>{entry.location}</LocationMeta>
                </div>
                <DateRange>{entry.dateRange}</DateRange>
              </ExperienceHeader>
              <BulletList>
                {entry.bullets.map((bullet, i) => (
                  <BulletItem key={`${entry.company}-${entry.dateRange}-${i}`}>{bullet}</BulletItem>
                ))}
              </BulletList>
            </ExperienceItem>
          ))}
        </ExperienceList>

        <SectionTitle>Education</SectionTitle>
        <EducationBlock>
          <EducationSchool>{education.school}</EducationSchool>
          <EducationLine>{education.degree}</EducationLine>
          {education.details.map((line) => (
            <EducationLine key={line}>{line}</EducationLine>
          ))}
          <EducationLine>
            {education.dateRange} · {education.location}
          </EducationLine>
        </EducationBlock>

        <SectionTitle>Skills</SectionTitle>
        <SkillSection>
          {skillGroups.map((group) => (
            <SkillGroupBlock key={group.label}>
              <SkillLabel>{group.label}</SkillLabel>
              <SkillItems>{group.items.join(" · ")}</SkillItems>
            </SkillGroupBlock>
          ))}
        </SkillSection>

        <SectionTitle>Projects</SectionTitle>
        <FeaturedWorkLinks items={featuredWork} />
      </ContentContainer>
    </Layout>
  );
}
