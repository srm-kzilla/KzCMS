interface NavbarPropsType {
    title: string;
    options: NavbarPropsOptionsType[];
}

interface NavbarPropsOptionsType {
    title: string;
    icon: any;
    url: string;
}

export default NavbarPropsType;