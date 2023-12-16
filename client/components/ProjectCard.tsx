import ProjectDataType from '@/interfaces/projectDataType';
import { useRouter } from 'next/router';

interface ProjectCardProps {
  _id: string;
  projectSlug: string;
  projectName: string;
  data: ProjectDataType[];
}

const ProjectCard = ({ projectData, redirectUrl }: { projectData: ProjectCardProps, redirectUrl: string }) => {
  const router = useRouter();
  return (
    <div
      className="w-full lg:w-96 h-fit rounded-lg bg-secondary p-6 flex flex-col gap-10 hover:scale-105 duration-300 cursor-pointer"
      onClick={() => {
        router.push(`${redirectUrl}/${projectData.projectSlug}`);
      }}
    >
      <div className="w-full overflow-hidden">
        <h1 className="font-bold text-2xl">{projectData.projectName.toUpperCase()}</h1>
      </div>
      <div>
        {/* <h1 className="font-semibold text-xl">{projectData.data.length}</h1> */}
        <h1 className="text-highlight">IMAGE(S)</h1>
      </div>
    </div>
  );
};

export default ProjectCard;
