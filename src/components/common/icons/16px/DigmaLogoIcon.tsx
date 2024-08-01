import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const DigmaLogoIconComponent = (props: IconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        fill="#6271B6"
        d="M15.393 7.864c-.096-1.667-3.81-5.29-4.413-5.86C10.377 1.434 9.37-.02 9.075 0c-.311.029.18 2.958.217 5.054.038 2.095-.426 2.82-.587 2.78-.16-.04-.706-.119-.706-.119s-.546.079-.706.12c-.16.04-.627-.684-.586-2.781.042-2.097.53-5.025.216-5.054C6.63-.022 5.62 1.43 5.018 2.004c-.604.575-4.315 4.19-4.41 5.86-.076 1.322.435 1.703 1.557 2.234 1.121.53 1.473.69 1.393.98-.08.291-.803.412-.843 1.124-.04.712.13 1.844 2.1 2.7C6.781 15.758 7.433 16 7.998 16c.566 0 1.217-.238 3.185-1.098 1.969-.86 2.06-2.24 2.025-2.951-.035-.711-.681-.582-.761-.872-.08-.29.27-.45 1.392-.981 1.121-.531 1.628-.912 1.553-2.234Z"
      />
      <path
        fill="#353F6E"
        d="M13.117 11.972c-.04-.681-.675-.556-.755-.833v-.02l-1.353-.357-2.533-.325s-.616.395-.432.407c.316.022.337.375.547.584.21.21 1.122 1.401 2.337 1.36 1.214-.04 1.583-.924 1.982-.41.221.286-.357 1.609-1.44 1.942-1.082.333-1.945.681-2.507.834a4.694 4.694 0 0 1-1.93.07c-.632-.12-2.932-.78-2.977-.794.238.146.488.272.747.376 1.952.82 2.594 1.051 3.16 1.051.565 0 1.203-.23 3.153-1.055 1.949-.825 2.04-2.151 2.001-2.83Z"
      />
      <path
        fill="#353F6E"
        d="M3.841 11.665s.454 1.1 2.647.912c.274-.024.317-.31.39-.51.12-.321.332-.424.537-.638.2-.208.34-.543.626-.59.392-.065.421-.581.41-.942-.031-1.102-1.457-2.045-1.457-2.045l-3.153 3.813Z"
      />
      <path
        fill="#353F6E"
        d="M7.927 11.155c0-.044-.05-.06-.07-.024-.073.128-.141.418-.278.54-.179.156-.397.35-.32.553.078.204.299.063.477-.078l.15-.12a.12.12 0 0 0 .046-.097l-.005-.774Zm.15-.027c0-.044.047-.061.069-.024.074.127.141.42.278.54.178.155.396.35.32.553-.077.203-.298.063-.477-.077a3.489 3.489 0 0 0-.15-.12.118.118 0 0 1-.046-.097l.006-.775Z"
      />
      <path
        fill="#4F5DA3"
        d="M10.496 13.165s0 .775-.049.903c.212-.048.674-.43.78-.715-.224-.13-.73-.188-.73-.188Z"
      />
      <path
        fill="#F3F3F3"
        d="M10.41 13.127c-.007.24-.031.478-.072.714.212-.047.587-.274.692-.553a1.731 1.731 0 0 0-.62-.161Z"
      />
      <path
        fill="#353F6E"
        d="M12.449 13.317c-.328.27-.864.168-1.437.016a.557.557 0 0 0-.27-.14 1.04 1.04 0 0 0-.338-.027 1.286 1.286 0 0 1-.285-.068c-.698-.383-1.887-.38-1.887-.38s-1.033 0-1.852.384c-.786.371-1.858.62-2.36.215a1.357 1.357 0 0 1-.357-.53c-.031-.077.066-.135.11-.066.173.28.424.398.765.458.931.166 2.068-.602 3.691-.602 1.623 0 2.85.496 3.691.602.345.044.596-.178.766-.458.043-.07.14-.01.11.066-.072.202-.19.384-.347.53Z"
      />
      <path
        fill="#353F6E"
        d="M7.5 13.52c-.12-.085.118-.274.665-.274.506 0 .704.164.676.238-.05.13-.436-.028-.692-.028-.256 0-.53.147-.65.064ZM6.595.378S4.88 2.63 4.077 3.435c-.803.803-2.454 2.905-2.792 3.485-.339.58-.768 1.938.476 2.717-.621-1.513.57-1.956.953-1.886.382.07.347 1.438.347 1.438l.617.808 2.262-.158 1.258-1.832-.46-.429a3.238 3.238 0 0 0-1.62-.658c-.98-.105-1.343-.073-1.343-.073s.139-.912 1.164-.754C4.641 5.65 4.536 3.321 6.595.378ZM9.83 1.967s.252 1.73.265 2.762c.013 1.032.251 2.632-.198 3.055-.449.423.273.595.273.595l2.77 1.716s.694-.119 1.025-.34c.33-.22.867-.587.965-1.031-.449.457-.833.8-1.144.423-.31-.377-.095-2.176-1.243-3.056.192.404-.046 1.072-.496.993-.45-.079-1.158-1.145-1.333-2.054-.175-.909-.883-3.063-.883-3.063Z"
      />
      <path
        fill="#F3F3F3"
        d="m2.867 8.51-1.19-1.052a.525.525 0 1 1 .702-.78l1.173 1.036a2.12 2.12 0 0 0-.685.795Z"
      />
      <path
        fill="#CCC"
        d="M7.8 9.842v.01a2.547 2.547 0 0 1-2.538 2.546A2.556 2.556 0 0 0 7.8 9.842Zm-5.094-.029c0-.06 0-.119.009-.176-.004.058-.009.117-.009.176Zm2.547 2.585a2.548 2.548 0 0 1-2.548-2.547v-.013a2.556 2.556 0 0 0 2.548 2.56Z"
      />
      <path
        fill="#F3F3F3"
        d="M2.706 9.813c0-.06 0-.119.009-.176a2.569 2.569 0 0 1 2.538-2.368A2.558 2.558 0 0 1 7.8 9.833v.009a2.557 2.557 0 0 1-2.538 2.556h-.009a2.556 2.556 0 0 1-2.548-2.56l.001-.025Z"
      />
      <path
        fill="#353F6E"
        d="M5.263 11.957a2.081 2.081 0 1 0 0-4.162 2.081 2.081 0 0 0 0 4.162Z"
      />
      <path
        fill="#F3F3F3"
        d="m3.38 8.483 3.964.509-.402-.509s-.567-.53-.604-.543c-.037-.013-.58-.29-.826-.29-.247 0-.827-.21-1.072-.086-.245.124-1.058.85-1.058.85l-.002.07Z"
      />
      <path
        fill="#F3F3F3"
        d="M6.946 8.533 4.232 10.34l2.442-.902-.888.792 1.751-.654-.59-1.042Z"
      />
      <path
        fill="#353F6E"
        d="M2.987 8.383s-1.093-.986-1.126-1.021a.354.354 0 0 1-.018-.358c.07-.099.014.072.066.188.05.117 1.342.834 1.342.834l-.264.357Z"
      />
      <path
        fill="#F3F3F3"
        d="m13.136 8.483 1.162-1.025a.512.512 0 0 0-.682-.762l-1.146 1.01c.284.2.512.467.666.777Z"
      />
      <path
        fill="#CCC"
        d="M8.258 9.842v.01a2.546 2.546 0 0 0 2.538 2.546 2.556 2.556 0 0 1-2.538-2.556Zm5.093-.029c0-.06 0-.119-.008-.176.005.058.008.117.008.176Zm-2.545 2.585a2.548 2.548 0 0 0 2.547-2.547v-.013a2.556 2.556 0 0 1-2.547 2.56Z"
      />
      <path
        fill="#F3F3F3"
        d="M13.351 9.813c0-.06 0-.119-.008-.176a2.574 2.574 0 0 0-1.087-1.905 2.523 2.523 0 0 0-2.428-.26 2.56 2.56 0 0 0-1.57 2.366v.009a2.556 2.556 0 0 0 2.538 2.556h.01a2.555 2.555 0 0 0 2.547-2.56c0-.017-.002-.023-.002-.03Z"
      />
      <path
        fill="#353F6E"
        d="M10.784 11.957a2.081 2.081 0 1 0 0-4.162 2.081 2.081 0 0 0 0 4.162Z"
      />
      <path
        fill="#F3F3F3"
        d="m12.529 8.483-3.906.58.238-.525s.673-.585.715-.595c.041-.011.575-.293.821-.293.247 0 .827-.21 1.072-.086.245.124 1.059.85 1.059.85v.07Z"
      />
      <path
        fill="#F3F3F3"
        d="M12.463 8.383 9.75 10.191l2.44-.904-.888.793 1.752-.654-.59-1.043Z"
      />
      <path
        fill="#353F6E"
        d="M13.096 8.438s1.093-.986 1.126-1.022a.36.36 0 0 0 .018-.357c-.07-.099-.015.072-.067.19-.052.117-1.34.833-1.34.833l.263.356Z"
      />
    </svg>
  );
};

export const DigmaLogoIcon = React.memo(DigmaLogoIconComponent);