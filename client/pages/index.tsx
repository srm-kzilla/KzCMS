import Layout from '@/components/Layout';
import React from 'react';
import ProjectCard from '@/components/Project-card';
interface ProjectCard {
  title: string;
  ImageCount: string;
}
const Card: React.FC = () => {
  const cardData: ProjectCard[] = [
    {
      title: 'Mozofest',
      ImageCount: '24 Images',
    },
    {
      title: 'Mozofest',
      ImageCount: '24 Images',
    },
    {
      title: 'Mozofest',
      ImageCount: '24 Images',
    },
    {
      title: 'Mozofest',
      ImageCount: '24 Images',
    },
  ];

  return (
    <div className="w-full flex min-h-screen h-fit">
      <Layout
        user={{
          name: 'Paddy',
        }}
      >
        <div className="gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">MY PROJECTS</h1>
          </div>
          <div className="flex flex-wrap py-5 sm:gap-2">
            {cardData.map((Card, index) => (
              <ProjectCard key={index} title={Card.title} ImageCount={Card.ImageCount} />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Card;
