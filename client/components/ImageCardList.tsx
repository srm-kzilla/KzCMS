import ImageCard from "@/components/ImageCard";
import ProjectDataType from "@/interfaces/ProjectDataType";

interface DataCardListProps {
  dataList: ProjectDataType[];
}

const ImageCardList = ({ dataList }: DataCardListProps) => {
  return (
    <div className="mb-28 mt-12 flex w-full">
      <div className="flex h-fit flex-wrap justify-center gap-5 md:justify-start">
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
