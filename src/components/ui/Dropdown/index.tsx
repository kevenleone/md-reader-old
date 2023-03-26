import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { Fragment } from "react";

type DropdownMenuProps = {
  items: {
    active?: boolean;
    divider?: boolean;
    heading?: string;
    label?: string;
    onClick?: () => void;
  }[];
};

const DropdownMenuDemo: React.FC<DropdownMenuProps> = ({
  children: trigger,
  items = [],
}) => {
  if (!trigger) {
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {items.map((item, key) => (
            <Fragment key={key}>
              {item.heading && (
                <DropdownMenu.Label className="pl-[25px] text-sm font-bold leading-[25px] ">
                  {item.heading}
                </DropdownMenu.Label>
              )}

              {item.label && (
                <DropdownMenu.Item
                  className="group cursor-pointer text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                  key={key}
                  onClick={item.onClick}
                >
                  {item.label}
                </DropdownMenu.Item>
              )}

              {item.divider && (
                <DropdownMenu.Separator className="-mx-1 my-1 h-px bg-gray-600" />
              )}
            </Fragment>
          ))}

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuDemo;
