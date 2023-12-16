import ImageCard from '@/components/ImageCard';
import ProjectDataType from '@/interfaces/ProjectDataType';

interface DataCardListProps {
  dataList: ProjectDataType[];
}

const ImageCardList = ({ dataList }: DataCardListProps) => {

  return (
    <div className="mt-12 flex w-full mb-28">
      <div className="flex flex-wrap justify-center gap-5 md:justify-start h-fit">
        {dataList.map((card, index) => {
          return (
            <div key={index}>
              <ImageCard {...card} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageCardList;
