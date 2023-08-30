"use client";

import { cn } from "@/lib/utils";
import ActionToolTip from "../ActionToolTip";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}
const NavigationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();
  const serverPush = () => {
    router.push(`/servers/${id}`);
  };
  return (
    <ActionToolTip align="center" side="right" label={name}>
      <button
        onClick={() => {
          serverPush();
        }}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params.serverId !== id && "group-hover:h-[20px]",
            params.serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        ></div>
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params.serverId !== id && "group-hover:h-[20px]",
            params.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image src={imageUrl} alt="channel" fill className="object-cover" />
        </div>
      </button>
    </ActionToolTip>
  );
};

export default NavigationItem;
