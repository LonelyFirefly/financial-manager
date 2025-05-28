export interface IRouterConfig {
    path?: string;
    element?: React.ReactNode;
    index?: boolean;
    menu?: {
      title: string;
    //   icon?: IconComponent;
    };
    handle?: {
      crumb: () => React.ReactNode;
    };
    children?: IRouterConfig[];
  }
  