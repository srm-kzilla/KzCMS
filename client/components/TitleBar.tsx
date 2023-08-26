
interface TitleBarPropsType {
  title: string;
}

export const TitleBar = ({ title }: TitleBarPropsType) => {
  return (
    <div className="absolute pl-20 md:pl-28 z-20 h-24 flex items-center justify-start w-full bg-cms-dark shadow-md shadow-black">
      <span className="text-3xl font-bold">{title}</span>
    </div>
  );
};

export default TitleBar;
