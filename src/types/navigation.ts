export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavigationData {
  items: NavItem[];
}

