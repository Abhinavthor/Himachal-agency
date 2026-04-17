declare module 'lucide-react' {
  import React from 'react';

  interface IconProps {
    className?: string;
    size?: number | string;
    color?: string;
    strokeWidth?: number;
  }

  export const Cloud: React.FC<IconProps>;
  export const CloudFog: React.FC<IconProps>;
  export const CloudLightning: React.FC<IconProps>;
  export const CloudRain: React.FC<IconProps>;
  export const CloudSnow: React.FC<IconProps>;
  export const Sun: React.FC<IconProps>;
  export const Mail: React.FC<IconProps>;
  export const User: React.FC<IconProps>;
  export const MessageSquare: React.FC<IconProps>;
  export const CheckCircle: React.FC<IconProps>;
  export const Mountain: React.FC<IconProps>;
  export const MountainSnow: React.FC<IconProps>;
  export const Phone: React.FC<IconProps>;
  export const MapPin: React.FC<IconProps>;
  export const ExternalLink: React.FC<IconProps>;
  export const ChevronLeft: React.FC<IconProps>;
  export const ChevronRight: React.FC<IconProps>;
}
