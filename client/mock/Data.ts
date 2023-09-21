// import { CardsListPropsType } from '@/components/CardsList';
import CalendarEventLineIcon from 'remixicon-react/CalendarEventLineIcon';
import Home4LineIcon from 'remixicon-react/Home4LineIcon';
import ShoppingBag3LineIcon from 'remixicon-react/ShoppingBag3LineIcon';

// export const cardListMock: CardsListPropsType = {
//   cards: [
//     {
//       title: 'Mozofest',
//       websiteUrl: 'https://mozofest.srmkzilla.net/',
//       manageUrl: '/mozofest',
//       cardType: 'products',
//     },
//     {
//       title: 'Product',
//       websiteUrl: 'https://mozofest.srmkzilla.net/',
//       manageUrl: '/mozofest',
//       cardType: 'products',
//     },
//     {
//       title: 'Event',
//       websiteUrl: 'https://mozofest.srmkzilla.net/',
//       manageUrl: '/mozofest',
//       cardType: 'events',
//     },
//     {
//       title: 'Mozofest',
//       websiteUrl: 'https://mozofest.srmkzilla.net/',
//       manageUrl: '/mozofest',
//       cardType: 'others',
//     },
//   ],
// };

export const NavbarOptions = {
  options: [
    {
      toolTip: 'Home',
      icon: Home4LineIcon,
      url: '/',
    },
    {
      toolTip: 'Events',
      icon: CalendarEventLineIcon,
      url: '/events',
    },
    {
      toolTip: 'Products',
      icon: ShoppingBag3LineIcon,
      url: '/products',
    },
  ],
};