import { Skeleton } from "../ui/skeleton";

type ProductSkeletonProps = {
    count?: number;
};

function ProductSkeleton({ count = 8 }: ProductSkeletonProps) {
    return (
        <div className="flex flex-wrap gap-4 text-center justify-center items-center">
            {[...Array(count)].map((_, index) => (
                <div
                    key={index}
                    className="w-[250px] p-4 rounded-2xl border-2 flex flex-col gap-2"
                >
                    <Skeleton className="w-full h-40 rounded-xl" />
                    <Skeleton className="w-3/4 h-6 rounded-md" />
                    <Skeleton className="w-full h-4 rounded-md" />
                    <div className="flex justify-between items-center">
                        <Skeleton className="w-16 h-6 rounded-md" />
                        <Skeleton className="w-12 h-6 rounded-md" />
                    </div>
                    <Skeleton className="w-full h-10 rounded-md mt-2" />
                </div>
            ))}
        </div>
    );
}

export default ProductSkeleton;