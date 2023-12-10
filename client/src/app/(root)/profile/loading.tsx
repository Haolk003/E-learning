import Loader from "@/components/loader/Loader";
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="fixed top-0 left-0 bg-blackA5 w-screen h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
}
