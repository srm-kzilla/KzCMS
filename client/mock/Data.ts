import { ImageCardPropsType } from '@/components/ImageCard';
import { ImageCardsListPropsType } from '@/components/ImageCardList';

const imageCardMockData: ImageCardPropsType = {
  imageLink: 'https://picsum.photos/320/300.jpg',
  title: 'Title',
  sponsorLink: 'https://eatwholy.com/',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
  autorName: 'Author Name',
};

export const imageCardListData: ImageCardsListPropsType = {
  imageCards: [imageCardMockData, imageCardMockData, imageCardMockData, imageCardMockData, imageCardMockData],
};