import ProjectDataType from '@/interfaces/ProjectDataType';

const imageCardMockData: ProjectDataType = {
  imageURL: 'https://picsum.photos/900/900.jpg',
  title: 'Title',
  link: 'https://eatwholy.com/',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
  author: 'Author Name',
};

export const imageCardListData: ProjectDataType[] = [
  imageCardMockData,
  imageCardMockData,
  imageCardMockData,
  imageCardMockData,
  imageCardMockData,
];