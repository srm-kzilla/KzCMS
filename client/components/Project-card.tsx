import React from 'react';
import { useState, useEffect } from 'react';

interface ProjectCardProps {
  title: string;
  ImageCount: string;
}

const ProjectCard = (data: ProjectCardProps) => {
  const { title, ImageCount } = data;
  const [project, setProject] = useState<any>(null);

  return (
    <div className={`px-2 flex flex-wrap gap-9`}>
      <div
        className={`md:flex-row bg-[#2d2d2d] rounded-xl overflow-hidden items-center pr-5 lg:h-fit lg:w-60 md:border-spacing-4 py-3`}
      >
        <div className={`gap-5 pl-4`}>
          <div className={`text-2xl font-bold`}>{title}</div>
          <div className={`text-[#999999] font-semibold justify-end md:mt-16`}>{ImageCount}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
