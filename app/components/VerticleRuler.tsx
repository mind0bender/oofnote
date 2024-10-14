import { HTMLAttributes } from "react";

interface VerticleRulerProps extends HTMLAttributes<HTMLDivElement> {
  top?: boolean;
  bottom?: boolean;
}

// settings the height of the ruler is necessary because h-full doesn't work
function VerticleRuler({
  top = true,
  bottom = true,
  ...rest
}: VerticleRulerProps): JSX.Element {
  return (
    <div
      {...rest}
      className={`flex relative h-full grow flex-col justify-center items-center border-stone-700 ${rest.className}`}>
      {top && <span className={`w-4 border-b border-inherit`} />}
      <hr className={`h-full grow border-l border-inherit`} />
      {bottom && <span className={`w-4 border-t border-inherit`} />}
    </div>
  );
}

export default VerticleRuler;
