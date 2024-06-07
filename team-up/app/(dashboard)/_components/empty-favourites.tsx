import Image from "next/image";

export const EmptyFavourites = () => {
    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image
            src="/next.svg"
            height={140}
            width={140}
            alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                No Favourites!
            </h2>
            <p className="text-muted-foreground testg-sm mt-2">
                Try creating some favourites.
            </p>
        </div>
    )
}