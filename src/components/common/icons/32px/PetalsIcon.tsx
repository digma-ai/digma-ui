import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const PetalsIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        fill={color}
        d="M14.5 4v4c0 .39782.158.77936.4393 1.06066.2813.2813.6629.43934 1.0607.43934.3978 0 .7794-.15804 1.0607-.43934S17.5 8.39782 17.5 8V4c0-.39782-.158-.77936-.4393-1.06066C16.7794 2.65804 16.3978 2.5 16 2.5c-.3978 0-.7794.15804-1.0607.43934S14.5 3.60218 14.5 4Zm-4.1562 7.8438c-.1972-.0001-.39237-.0389-.57447-.1144-.1821-.0755-.34753-.1862-.48683-.3256L6.45375 8.575c-.28179-.28179-.4401-.66399-.4401-1.0625 0-.39851.15831-.78071.4401-1.0625s.66398-.4401 1.0625-.4401.78071.15831 1.0625.4401l2.82495 2.8325c.21.20971.353.47697.411.768.058.291.0284.5927-.085.8669-.1135.2741-.3057.5085-.5524.6734-.2467.1649-.5368.2529-.8335.253ZM4 14.5h4c.39783 0 .77935.158 1.06066.4393.2813.2813.43934.6629.43934 1.0607 0 .3978-.15804.7794-.43934 1.0607C8.77935 17.342 8.39783 17.5 8 17.5H4c-.39783 0-.77935-.158-1.06066-.4393C2.65804 16.7794 2.5 16.3978 2.5 16c0-.3978.15804-.7794.43934-1.0607C3.22065 14.658 3.60217 14.5 4 14.5Zm5.2825 6.0963c.13953-.1396.30518-.2503.48748-.3258.1823-.0755.37772-.1144.57502-.1144.1973 0 .3927.0389.575.1144.1823.0755.348.1862.4875.3258.1395.1395.2502.3051.3257.4874.0755.1823.1144.3777.1144.5751 0 .1973-.0389.3927-.1144.575-.0755.1823-.1862.3479-.3257.4875L8.57875 25.55c-.28179.2818-.66398.4401-1.0625.4401s-.78071-.1583-1.0625-.4401-.4401-.664-.4401-1.0625c0-.3985.15831-.7807.4401-1.0625l2.82875-2.8287ZM16 22.5c.3978 0 .7794.158 1.0607.4393S17.5 23.6022 17.5 24v4c0 .3978-.158.7794-.4393 1.0607S16.3978 29.5 16 29.5c-.3978 0-.7794-.158-1.0607-.4393S14.5 28.3978 14.5 28v-4c0-.3978.158-.7794.4393-1.0607S15.6022 22.5 16 22.5Zm6.7175-1.9037 2.8287 2.8287c.2818.2818.4402.664.4402 1.0625 0 .3985-.1584.7807-.4402 1.0625-.2817.2818-.6639.4401-1.0625.4401-.3985 0-.7807-.1583-1.0624-.4401l-2.8288-2.8287c-.2818-.2818-.4401-.664-.4401-1.0625 0-.3986.1583-.7808.4401-1.0625.2818-.2818.664-.4402 1.0625-.4402.3985 0 .7807.1584 1.0625.4402ZM22.5 16c0-.3978.158-.7794.4393-1.0607S23.6022 14.5 24 14.5h4c.3978 0 .7794.158 1.0607.4393S29.5 15.6022 29.5 16c0 .3978-.158.7794-.4393 1.0607S28.3978 17.5 28 17.5h-4c-.3978 0-.7794-.158-1.0607-.4393S22.5 16.3978 22.5 16Zm.925-9.54625c.1395-.13953.3052-.25021.4875-.32572a1.50244 1.50244 0 0 1 .575-.11438c.1973 0 .3927.03886.575.11438.1823.07551.348.18619.4875.32572.1395.13953.2502.30518.3257.48748.0755.1823.1144.3777.1144.57502s-.0389.39272-.1144.57502c-.0755.1823-.1862.34795-.3257.48748l-2.8325 2.82505c-.2818.2817-.664.4401-1.0625.4401-.3985 0-.7807-.1584-1.0625-.4401-.2818-.2818-.4401-.664-.4401-1.0625 0-.39856.1583-.78076.4401-1.06255l2.8325-2.825Z"
      />
    </svg>
  );
};

export const PetalsIcon = React.memo(PetalsIconComponent);
