import Layout from '@/components/Layout';
import ProjectCard from '@/components/Project-card';
interface ProjectCard {
  title: string;
  imageCount: number;
  description: string;
}
const Card = () => {
  const cardData: ProjectCard[] = [
    {
      title: 'Mozofest',
      imageCount: 24,
      description: 'Images',
    },
    {
      title: 'Mozofest',
      imageCount: 24,
      description: 'Images',
    },
    {
      title: 'Mozofest',
      imageCount: 24,
      description: 'Images',
    },
    {
      title: 'Mozofest',
      imageCount: 24,
      description: 'Images',
    },
    {
      title: 'Mozofest',
      imageCount: 24,
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
        <div className="flex flex-col gap-10">
          <div className="w-full h-fit">
            <h1 className="font-bold text-2xl lg:text-4xl">MY PROJECTS</h1>
          </div>
          <div className="flex-wrap flex gap-5 w-full">
            {cardData.map((item, key) => (
              <div key={key}>
                <ProjectCard title={item.title} imageCount={item.imageCount} description={item.description} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Card;
