import { HTMLAttributes } from "react";

interface HorizontalRulerProps extends HTMLAttributes<HTMLHRElement> {
  left?: boolean;
  right?: boolean;
}

function HorizontalRuler({
  left = true,
  right = true,
  ...rest
}: HorizontalRulerProps): JSX.Element {
  return (
    <div className={`flex justify-center items-center border-stone-700`}>
      {left && <span className={`h-4 border-r-[0.1px] border-inherit`} />}
      <hr
        {...rest}
        className={`w-full border-t border-inherit ${rest.className}`}
      />
      {right && <span className={`h-4 border-l-[0.1px] border-inherit`} />}
    </div>
  );
}

export default HorizontalRuler;
