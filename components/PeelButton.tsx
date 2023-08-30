import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export default function PeelButton({
  children,
  className = "",
  ...props
}: Partial<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>) {
  return (
    <button
      className={clsx(
        "grid h-9 place-content-center rounded-full backdrop-blur-md px-4 text-white shadow-[0_0_0_1px_white]",
        "hover:shadow-[0_0_0_1px_#9ca3af] transition-all",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
