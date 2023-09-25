"use client";
import { Member, Message, Profile } from "@prisma/client";
import ChatWelcome from "./ChatWelcome";
import useChatQuery from "@/Hooks/useChatQuery";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import ChatItem from "./ChatItem";
import { format } from "date-fns";

const DATE_FORMAT = " d MMM yyyy , HH:mm";

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

interface ChatMessagesprops {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}
const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketQuery,
  socketUrl,
  paramKey,
  paramValue,
  type,
}: ChatMessagesprops) => {
  
  const queryKey = `chat:${chatId}`;
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });


  if (status === "loading") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <Loader2 className="h7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <ServerCrash className="h7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">
          Something went wrong
        </p>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                currentMember={member}
                content={message.content}
                fileUrl={message.fileUrl}
                deleted={message.deleted}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                member={message.member}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
