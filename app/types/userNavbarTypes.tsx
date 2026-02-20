export interface NavItem {
    name: string;
    href?: string;
    children?: { name: string; href: string }[];
}