export type VisionPoint = {
  text: string;
  icon: "users" | "trending" | "globe" | "lightbulb";
};

const visionPointsData: VisionPoint[] = [
  {
    text: "Actively participate in human resource development in ICT",
    icon: "users",
  },
  {
    text: "Contribute in the development of related domains",
    icon: "trending",
  },
  {
    text: "Contribute in the development of higher education of the country",
    icon: "globe",
  },
  {
    text: "Conduct fruitful research that meet the needs of the country",
    icon: "lightbulb",
  },
];

export const getVisionPoints = async (): Promise<VisionPoint[]> => visionPointsData;
