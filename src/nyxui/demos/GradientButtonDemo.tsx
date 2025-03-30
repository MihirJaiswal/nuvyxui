import React from "react";
import { GradientButton } from "@/nyxui/components/GradientButton";

export const GradientButtonDemo = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <GradientButton variant="pulse" theme="sunset">
        Pulse Effect
      </GradientButton>
      
      <GradientButton variant="glow" theme="ocean">
        Glow Effect
      </GradientButton>
      
      <GradientButton variant="sweep" theme="neon">
        Sweep Effect
      </GradientButton>
      
      <GradientButton variant="shine" theme="forest">
        Shine Effect
      </GradientButton>
      
      <GradientButton variant="outline" theme="berry">
        Outline Effect
      </GradientButton>
    </div>
  );
};