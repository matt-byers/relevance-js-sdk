import * as Avatar from "@radix-ui/react-avatar";
import {
  subjectAvatar,
  subjectDescription,
  subjectInitials,
  subjectName,
} from "@/signals";

export function EmptyState() {
  return (
    <div class="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <Avatar.Root>
        <Avatar.Image
          src={subjectAvatar}
          class="size-24 rounded-full border-2 border-zinc-200 dark:border-zinc-700 mb-4 transition-colors"
          alt={subjectName}
        />
        <Avatar.Fallback class="size-24 rounded-full border-2 border-zinc-200 dark:border-zinc-700 mb-4 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
          {subjectInitials}
        </Avatar.Fallback>
      </Avatar.Root>
      <h2 class="text-xl font-semibold text-zinc-900 dark:text-white mb-2 transition-colors">
        {subjectName}
      </h2>
      <p class="text-center text-zinc-600 dark:text-zinc-400 max-w-md transition-colors">
        {subjectDescription.value ||
          "Start a conversation by typing a message below"}
      </p>
    </div>
  );
}
