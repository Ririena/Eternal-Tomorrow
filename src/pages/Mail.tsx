import SkeletonMailCard from "@/components/ui/Skeleton/SkeletonMailCard";
import { lazy, Suspense } from "react";
const LazyMailCard = lazy(() => import("@/components/ui/Main/MailCard"));
export default function Mail() {
  return (
    <>
      <Suspense fallback={<SkeletonMailCard />}>
        <LazyMailCard />
      </Suspense>
    </>
  );
}
