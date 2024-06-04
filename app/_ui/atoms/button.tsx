import clsx from "clsx";
import React from "react";
import { Color, Rounded, Size } from "../index";

export interface Props {
  // プロパティを属性はなるべくbuttonの属性に合わせる
  children?: React.ReactNode;
  className?: string;
  form?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit?: React.FormEventHandler<HTMLButtonElement>;
  type?: "button" | "reset" | "submit" | undefined;
  value?: number | readonly string[] | string;
}
const Base = ({
  children,
  className,
  form,
  onClick,
  onSubmit,
  type = "button",
  value,
}: Props) => {
  return (
    <button
      className={clsx(className)}
      form={form}
      onClick={onClick}
      onSubmit={onSubmit}
      type={type}
      value={value}
    >
      {children}
    </button>
  );
};

// ボタン
const Button = {
  // 戻るボタン
  Back: (props: Props) => {
    return (
      <Base
        {...props}
        className={clsx(
          "border-slate300 flex size-8 content-center items-center justify-center rounded-full border text-center text-base font-bold outline-2 outline-offset-4 outline-slate-400 transition-transform delay-0 duration-75 ease-out focus:outline active:scale-95 active:outline",
          props.className,
        )}
      />
    );
  },
  // ベースのボタン
  Base,
  // 基本的なボタン
  Basic: (
    props: {
      color?: Color;
      // 対応しているオプションのみ追加する
      rounded?: Rounded;
      size?: Size;
    } & Props,
  ) => {
    const { color = "secondary", rounded = "full", size = "md" } = props;
    return (
      <Base
        {...props}
        className={clsx(
          "text-center text-base font-bold outline-2 outline-offset-4 transition-transform delay-0 duration-75 ease-out focus:outline active:scale-95 active:outline",
          rounded === "full" && "rounded-full",
          color === "primary" &&
            "bg-primary-500 text-primary-50 outline-primary-400 hover:bg-primary-600",
          color === "secondary" &&
            "bg-secondary-500 text-secondary-50 outline-secondary-500 hover:bg-secondary-600",
          size === "md" && "h-16 w-full",
          props.className,
        )}
      />
    );
  },
};

// それぞれのボタンの見た目は、基底のButtonに対して、バリエーションを追加する
export { Button };
