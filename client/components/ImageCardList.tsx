import ImageCard from "@/components/ImageCard";
import type { ProjectItem } from "@/types";

interface DataCardListProps {
  dataList: ProjectItem[];
  setProjectDataState: React.Dispatch<React.SetStateAction<ProjectItem[]>>;
}

const ImageCardList = ({ dataList, setProjectDataState }: DataCardListProps) => {
  const handleDeleteAssetFromList = (id: string) => {
    setProjectDataState(prevState => {
      return prevState.filter(project => project._id !== id);
    });
  };
  return (
    <div className="mb-28 mt-12 flex w-full">
      <div className="flex h-fit flex-wrap justify-center gap-5 md:justify-start">
        {dataList &&
          dataList.map((card, index) => {
            return (
              <div key={index}>
                <ImageCard data={card} handleDeleteAssetFromList={handleDeleteAssetFromList} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageCardList;
