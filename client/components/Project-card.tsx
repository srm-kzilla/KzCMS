import { useState, useEffect } from 'react';

interface ProjectCardProps {
  title: string;
  imageCount: number;
  description: string;
}

const ProjectCard = (data: ProjectCardProps) => {
  const { title, imageCount, description } = data;
  const [project, setProject] = useState<{ title: string; imageCount: number; description: string }>();

  return (
    <div className="flex flex-wrap rounded-xl p-4 bg-secondary h-[170px] lg:w-[270px] w-full">
      <div className="flex-col justify-between items-center w-full h-full">
        <div className="text-2xl font-bold">
          <h1>{title}</h1>
        </div>
        <div>
          <div className="text-highlight font-semibold justify-end">{imageCount}</div>
          <div className="text-highlight font-semibold justify-end">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
