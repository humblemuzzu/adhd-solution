import { TaskProvider } from "@/lib/task-context";
import { InboxProvider } from "@/lib/inbox-context";
import { RootLayout as AppLayout } from "@/components/layout/root-layout";
import { GamificationProvider } from "@/components/gamification/provider";
import { FocusSessionProvider } from "@/lib/focus-session-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FocusSessionProvider>
      <TaskProvider>
        <InboxProvider>
          <GamificationProvider>
            <AppLayout>{children}</AppLayout>
          </GamificationProvider>
        </InboxProvider>
      </TaskProvider>
    </FocusSessionProvider>
  );
} 