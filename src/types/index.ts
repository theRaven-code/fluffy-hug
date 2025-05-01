export type PlanetProps = {
  src: string;
  startLeft: number;
  duration: number;
  delay: number;
  size: number;
};

export type ImagePosition = {
  top: number;
  left: number;
};

export type ImageData = {
  src: string;
  pos: ImagePosition;
};

export type AnimationConfig = {
  rotateZ: number;
  scale: number;
  y: string;
  xPercent: number;
};
