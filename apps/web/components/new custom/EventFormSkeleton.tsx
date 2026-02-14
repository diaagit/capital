import { Card, CardContent, CardHeader } from "@/components/ui/card";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-neutral-200 ${className}`}
    />
  );
}

export default function EventFormSkeleton() {
  return (
    <div className="max-w-8xl space-y-8 p-4 bg-white">

      <div className="w-full rounded-2xl border border-zinc-200 shadow-sm bg-white p-6 space-y-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-72" />
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-64" />
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-11 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-56" />
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-56 w-full rounded-xl" />
            <Skeleton className="h-11 w-full" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-56 w-full rounded-xl" />
            <Skeleton className="h-11 w-full" />
          </div>

        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-72" />
        </CardHeader>

        <CardContent className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-11 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <Skeleton className="h-4 w-24" />
        </CardHeader>

        <CardContent className="flex items-center justify-between flex-wrap gap-6">
          <div className="space-y-2 w-48">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-11 w-full" />
          </div>

          <Skeleton className="h-6 w-32" />
        </CardContent>
      </Card>

      <div className="sticky bottom-0 bg-muted/30 backdrop-blur supports-[backdrop-filter]:bg-muted/20 p-4 rounded-xl">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>

    </div>
  );
}