import React from 'react';
import { useState, useEffect } from 'react';

interface ProjectCardProps {
  title: string;
  imagecount: number;
  description: string;
}

const ProjectCard = (data: ProjectCardProps) => {
  const { title, imagecount, description } = data;
  const [project, setProject] = useState({});

  return (
    <div className="px-2 flex flex-wrap gap-9">
      <div className="md:flex-row bg-secondary rounded-xl overflow-hidden items-center pr-5 lg:h-fit lg:w-60 md:border-spacing-4 py-3">
        <div className="gap-5 pl-4">
          <div className="text-2xl font-bold">{title}</div>
          <div className="text-highlight font-semibold justify-end md:mt-16">{imagecount}</div>
          <div className="text-highlight font-semibold justify-end">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
