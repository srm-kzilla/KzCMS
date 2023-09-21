import Layout from '@/components/Layout';
import React from 'react';
import ProjectCard from '@/components/Project-card';
interface ProjectCard {
  title: string;
  imagecount: number;
  description: any;
}
const Card = () => {
  const cardData: ProjectCard[] = [
    {
      title: 'Mozofest',
      imagecount: 24,
      description: 'Images',
    },
    {
      title: 'Mozofest',
      imagecount: 24,
      description: 'Images',
    },
    {
      title: 'Mozofest',
      imagecount: 24,
      description: 'Images',
    },
    {
      title: 'Mozofest',
      imagecount: 24,
      description: 'Images',
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
              <div key={index}>
                <ProjectCard title={Card.title} imagecount={Card.imagecount} description={Card.description} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Card;
