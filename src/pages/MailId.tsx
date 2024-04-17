import { lazy, Suspense } from "react";
import MainMailParams from "@/components/ui/Main/MainMailParams";
const LazyMailId = lazy(() => import("../components/ui/Main/MainMailParams"));
export default function MailId() {
  return (
    <>
      <Suspense fallback={<h1>Loading Bang</h1>}>
        <LazyMailId />
      </Suspense>
    </>
  );
}
